<?php

declare(strict_types=1);

if (!defined('HARLEKIDS_DECAP_OAUTH')) {
    http_response_code(404);
    exit;
}

/**
 * Lädt Geheimnisse bevorzugt aus der Server-Umgebung. Alternativ kann eine
 * PHP-Konfigurationsdatei außerhalb des öffentlichen Web-Verzeichnisses liegen.
 */
function decap_oauth_config(): array
{
    static $config = null;

    if (is_array($config)) {
        return $config;
    }

    $config = [];
    $configPath = getenv('DECAP_OAUTH_CONFIG');

    if (!is_string($configPath) || $configPath === '') {
        $documentRoot = realpath((string) ($_SERVER['DOCUMENT_ROOT'] ?? ''));
        if ($documentRoot !== false) {
            $configPath = dirname($documentRoot)
                . DIRECTORY_SEPARATOR
                . 'private'
                . DIRECTORY_SEPARATOR
                . 'harlekids-oauth.php';
        }
    }

    if (is_string($configPath) && is_file($configPath)) {
        $loaded = require $configPath;
        if (is_array($loaded)) {
            $config = $loaded;
        }
    }

    $environmentMap = [
        'client_id' => 'GITHUB_OAUTH_CLIENT_ID',
        'client_secret' => 'GITHUB_OAUTH_CLIENT_SECRET',
        'site_origin' => 'DECAP_SITE_ORIGIN',
        'repository' => 'DECAP_GITHUB_REPOSITORY',
        'scope' => 'DECAP_GITHUB_SCOPE',
    ];

    foreach ($environmentMap as $key => $environmentName) {
        $value = getenv($environmentName);
        if (is_string($value) && $value !== '') {
            $config[$key] = $value;
        }
    }

    $config += [
        'site_origin' => 'https://harlekids.de',
        'repository' => 'Fabian-Schnitter/harlekids-website',
        'scope' => 'repo',
    ];

    return $config;
}

function decap_oauth_value(string $key): string
{
    $config = decap_oauth_config();
    $value = $config[$key] ?? '';

    if (!is_string($value) || trim($value) === '') {
        throw new RuntimeException("Die OAuth-Konfiguration '$key' fehlt.");
    }

    return trim($value);
}

function decap_site_origin(): string
{
    $origin = rtrim(decap_oauth_value('site_origin'), '/');
    $parts = parse_url($origin);

    if (
        !is_array($parts)
        || ($parts['scheme'] ?? '') !== 'https'
        || empty($parts['host'])
        || isset($parts['user'])
        || isset($parts['pass'])
        || isset($parts['query'])
        || isset($parts['fragment'])
    ) {
        throw new RuntimeException('DECAP_SITE_ORIGIN muss eine vollständige HTTPS-Adresse sein.');
    }

    return $origin;
}

function decap_callback_url(): string
{
    return decap_site_origin() . '/api/decap-callback.php';
}

function decap_start_session(): void
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }

    session_name('harlekids_decap_oauth');
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/api/',
        'secure' => true,
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
    session_start();
}

function decap_no_cache_headers(): void
{
    header('Cache-Control: no-store, max-age=0');
    header('Pragma: no-cache');
    header('Referrer-Policy: no-referrer');
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: DENY');
}

/**
 * Führt einen HTTPS-Aufruf aus und liefert Statuscode sowie JSON-Antwort.
 */
function decap_github_request(string $url, array $options = []): array
{
    if (!function_exists('curl_init')) {
        throw new RuntimeException('Die PHP-cURL-Erweiterung ist nicht verfügbar.');
    }

    $curl = curl_init($url);
    if ($curl === false) {
        throw new RuntimeException('GitHub-Verbindung konnte nicht initialisiert werden.');
    }

    $headers = [
        'Accept: application/json',
        'User-Agent: Harlekids-Decap-OAuth',
        'X-GitHub-Api-Version: 2022-11-28',
    ];

    if (isset($options['token'])) {
        $headers[] = 'Authorization: Bearer ' . $options['token'];
    }

    curl_setopt_array($curl, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => false,
        CURLOPT_CONNECTTIMEOUT => 10,
        CURLOPT_TIMEOUT => 20,
        CURLOPT_HTTPHEADER => $headers,
    ]);

    if (isset($options['post'])) {
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($options['post']));
        $headers[] = 'Content-Type: application/x-www-form-urlencoded';
        curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
    }

    $body = curl_exec($curl);
    $status = (int) curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
    $error = curl_error($curl);
    curl_close($curl);

    if (!is_string($body)) {
        throw new RuntimeException('GitHub ist momentan nicht erreichbar: ' . $error);
    }

    $decoded = json_decode($body, true);
    if (!is_array($decoded)) {
        throw new RuntimeException('GitHub hat eine ungültige Antwort geliefert.');
    }

    return ['status' => $status, 'body' => $decoded];
}

function decap_verify_repository_access(string $token): void
{
    $repository = decap_oauth_value('repository');
    $parts = explode('/', $repository, 2);

    if (count($parts) !== 2) {
        throw new RuntimeException('Das konfigurierte GitHub-Repository ist ungültig.');
    }

    $url = 'https://api.github.com/repos/'
        . rawurlencode($parts[0])
        . '/'
        . rawurlencode($parts[1]);
    $response = decap_github_request($url, ['token' => $token]);
    $canPush = $response['body']['permissions']['push'] ?? false;

    if ($response['status'] !== 200 || $canPush !== true) {
        throw new RuntimeException('Dieses GitHub-Konto hat keinen Schreibzugriff auf die Harlekids-Website.');
    }
}

function decap_render_oauth_result(string $status, array $content): never
{
    decap_no_cache_headers();
    header('Content-Type: text/html; charset=utf-8');

    $nonce = base64_encode(random_bytes(18));
    header(
        "Content-Security-Policy: default-src 'none'; script-src 'nonce-{$nonce}'; "
        . "style-src 'unsafe-inline'; base-uri 'none'; frame-ancestors 'none'"
    );

    $origin = decap_site_origin();
    $message = 'authorization:github:' . $status . ':' . json_encode(
        $content,
        JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE
    );
    $originJson = json_encode($origin, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT);
    $messageJson = json_encode($message, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT);
    $title = $status === 'success' ? 'Anmeldung erfolgreich' : 'Anmeldung fehlgeschlagen';

    echo '<!doctype html><html lang="de"><head><meta charset="utf-8">'
        . '<meta name="viewport" content="width=device-width,initial-scale=1">'
        . '<title>' . htmlspecialchars($title, ENT_QUOTES, 'UTF-8') . '</title>'
        . '<style>body{font-family:system-ui,sans-serif;padding:2rem;text-align:center;color:#222}</style>'
        . '</head><body><p>' . htmlspecialchars($title, ENT_QUOTES, 'UTF-8') . '</p>'
        . '<script nonce="' . htmlspecialchars($nonce, ENT_QUOTES, 'UTF-8') . '">'
        . '(function(){'
        . 'const targetOrigin=' . $originJson . ';'
        . 'const result=' . $messageJson . ';'
        . 'if(!window.opener){document.body.innerHTML="<p>Das CMS-Fenster wurde geschlossen.</p>";return;}'
        . 'function receive(event){'
        . 'if(event.source!==window.opener||event.origin!==targetOrigin){return;}'
        . 'window.removeEventListener("message",receive);'
        . 'window.opener.postMessage(result,targetOrigin);'
        . 'window.setTimeout(function(){window.close();},150);'
        . '}'
        . 'window.addEventListener("message",receive,false);'
        . 'window.opener.postMessage("authorizing:github",targetOrigin);'
        . '})();'
        . '</script></body></html>';

    exit;
}


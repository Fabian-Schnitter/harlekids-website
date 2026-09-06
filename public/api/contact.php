<?php

declare(strict_types=1);

use PHPMailer\PHPMailer\PHPMailer;

require_once __DIR__ . '/vendor/autoload.php';

function contact_response(int $status, array $body): never
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store, max-age=0');
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: DENY');
    header('Referrer-Policy: no-referrer');
    echo json_encode($body, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function contact_config(): array
{
    $configPath = getenv('HARLEKIDS_CONTACT_CONFIG');

    if (!is_string($configPath) || $configPath === '') {
        $documentRoot = realpath((string) ($_SERVER['DOCUMENT_ROOT'] ?? ''));
        if ($documentRoot !== false) {
            $configPath = dirname($documentRoot)
                . DIRECTORY_SEPARATOR
                . 'private'
                . DIRECTORY_SEPARATOR
                . 'harlekids-contact.php';
        }
    }

    $config = [];
    if (is_string($configPath) && is_file($configPath)) {
        $loaded = require $configPath;
        if (is_array($loaded)) {
            $config = $loaded;
        }
    }

    return $config + [
        'host' => 'smtp.variomedia.de',
        'port' => 465,
        'encryption' => PHPMailer::ENCRYPTION_SMTPS,
        'username' => 'info@zpz-harlekids.de',
        'from_email' => 'info@zpz-harlekids.de',
        'from_name' => 'Harlekids Website',
        'to_email' => 'info@zpz-harlekids.de',
        'to_name' => 'Harlekids e.V.',
        'allowed_origins' => ['https://harlekids.de', 'https://www.harlekids.de'],
    ];
}

function contact_config_string(array $config, string $key): string
{
    $value = $config[$key] ?? '';
    if (!is_string($value) || trim($value) === '') {
        throw new RuntimeException("Die Kontaktformular-Konfiguration '$key' fehlt.");
    }

    return trim($value);
}

function contact_rate_limit(): bool
{
    $ip = (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
    $file = sys_get_temp_dir() . DIRECTORY_SEPARATOR
        . 'harlekids-contact-' . hash('sha256', $ip) . '.json';
    $handle = @fopen($file, 'c+');

    if ($handle === false || !flock($handle, LOCK_EX)) {
        if (is_resource($handle)) {
            fclose($handle);
        }
        return true;
    }

    $now = time();
    $windowStart = $now - 900;
    $contents = stream_get_contents($handle);
    $attempts = is_string($contents) ? json_decode($contents, true) : [];
    if (!is_array($attempts)) {
        $attempts = [];
    }

    $attempts = array_values(array_filter(
        $attempts,
        static fn ($timestamp): bool => is_int($timestamp) && $timestamp >= $windowStart
    ));

    if (count($attempts) >= 5) {
        flock($handle, LOCK_UN);
        fclose($handle);
        return false;
    }

    $attempts[] = $now;
    rewind($handle);
    ftruncate($handle, 0);
    fwrite($handle, (string) json_encode($attempts));
    fflush($handle);
    flock($handle, LOCK_UN);
    fclose($handle);

    return true;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    contact_response(405, ['success' => false, 'error' => 'Methode nicht erlaubt.']);
}

$contentType = strtolower((string) ($_SERVER['CONTENT_TYPE'] ?? ''));
if (!str_starts_with($contentType, 'application/json')) {
    contact_response(415, ['success' => false, 'error' => 'Ungültiges Anfrageformat.']);
}

$config = contact_config();
$origin = (string) ($_SERVER['HTTP_ORIGIN'] ?? '');
$allowedOrigins = $config['allowed_origins'] ?? [];
if ($origin !== '' && (!is_array($allowedOrigins) || !in_array($origin, $allowedOrigins, true))) {
    contact_response(403, ['success' => false, 'error' => 'Anfrage nicht erlaubt.']);
}

$rawBody = file_get_contents('php://input');
if (!is_string($rawBody) || $rawBody === '' || strlen($rawBody) > 20000) {
    contact_response(400, ['success' => false, 'error' => 'Die Anfrage ist leer oder zu groß.']);
}

$payload = json_decode($rawBody, true);
if (!is_array($payload)) {
    contact_response(400, ['success' => false, 'error' => 'Die Anfrage konnte nicht gelesen werden.']);
}

// Bots erhalten absichtlich eine unauffällige Erfolgsantwort, ohne dass eine E-Mail versendet wird.
if (trim((string) ($payload['website'] ?? '')) !== '') {
    contact_response(200, ['success' => true]);
}

$startedAt = $payload['startedAt'] ?? 0;
$elapsedMilliseconds = (int) floor(microtime(true) * 1000) - (int) $startedAt;
if (!is_numeric($startedAt) || (int) $startedAt <= 0 || $elapsedMilliseconds < 3000) {
    contact_response(422, ['success' => false, 'error' => 'Bitte nehmen Sie sich einen Moment Zeit.']);
}

$name = trim((string) ($payload['name'] ?? ''));
$email = trim((string) ($payload['email'] ?? ''));
$phone = trim((string) ($payload['phone'] ?? ''));
$subjectKey = trim((string) ($payload['subject'] ?? ''));
$message = trim((string) ($payload['message'] ?? ''));

$subjects = [
    'jugendzirkus' => 'Kurse und Jugendzirkus',
    'ferien' => 'Zirkusferien',
    'fortbildung' => 'Fortbildung',
    'herberge' => 'Jugendherberge',
    'schulprojekt' => 'Schulprojekt',
    'sonstiges' => 'Sonstiges',
];

if (
    $name === ''
    || strlen($name) > 120
    || preg_match('/[\r\n]/', $name)
    || !filter_var($email, FILTER_VALIDATE_EMAIL)
    || strlen($email) > 254
    || strlen($phone) > 80
    || !array_key_exists($subjectKey, $subjects)
    || $message === ''
    || strlen($message) > 10000
) {
    contact_response(422, ['success' => false, 'error' => 'Bitte überprüfen Sie Ihre Angaben.']);
}

if (!contact_rate_limit()) {
    contact_response(429, [
        'success' => false,
        'error' => 'Zu viele Nachrichten. Bitte versuchen Sie es in einigen Minuten erneut.',
    ]);
}

try {
    $mailer = new PHPMailer(true);
    $mailer->isSMTP();
    $mailer->Host = contact_config_string($config, 'host');
    $mailer->Port = (int) ($config['port'] ?? 465);
    $mailer->SMTPAuth = true;
    $mailer->Username = contact_config_string($config, 'username');
    $mailer->Password = contact_config_string($config, 'password');
    $mailer->SMTPSecure = contact_config_string($config, 'encryption');
    $mailer->CharSet = PHPMailer::CHARSET_UTF8;
    $mailer->setFrom(
        contact_config_string($config, 'from_email'),
        contact_config_string($config, 'from_name')
    );
    $mailer->addAddress(
        contact_config_string($config, 'to_email'),
        contact_config_string($config, 'to_name')
    );
    $mailer->addReplyTo($email, $name);
    $mailer->Subject = '[Website] ' . $subjects[$subjectKey];
    $mailer->Body = "Neue Nachricht über das Kontaktformular\n\n"
        . "Name: {$name}\n"
        . "E-Mail: {$email}\n"
        . "Telefon: " . ($phone !== '' ? $phone : 'nicht angegeben') . "\n"
        . "Thema: {$subjects[$subjectKey]}\n\n"
        . "Nachricht:\n{$message}\n";
    $mailer->send();

    contact_response(200, ['success' => true]);
} catch (Throwable $error) {
    error_log('Harlekids-Kontaktformular: E-Mail-Versand fehlgeschlagen.');
    contact_response(500, [
        'success' => false,
        'error' => 'Die Nachricht konnte momentan nicht gesendet werden. Bitte versuchen Sie es später erneut.',
    ]);
}

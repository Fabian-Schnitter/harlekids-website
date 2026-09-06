<?php

declare(strict_types=1);

define('HARLEKIDS_DECAP_OAUTH', true);
require __DIR__ . '/_decap-oauth.php';

try {
    decap_no_cache_headers();
    decap_start_session();
    session_regenerate_id(true);

    $state = bin2hex(random_bytes(32));
    $_SESSION['decap_oauth_state'] = $state;
    $_SESSION['decap_oauth_created_at'] = time();

    $parameters = [
        'client_id' => decap_oauth_value('client_id'),
        'redirect_uri' => decap_callback_url(),
        'scope' => decap_oauth_value('scope'),
        'state' => $state,
        'allow_signup' => 'false',
    ];

    header('Location: https://github.com/login/oauth/authorize?' . http_build_query($parameters), true, 302);
    exit;
} catch (Throwable $error) {
    decap_render_oauth_result('error', ['message' => $error->getMessage()]);
}


<?php

declare(strict_types=1);

define('HARLEKIDS_DECAP_OAUTH', true);
require __DIR__ . '/_decap-oauth.php';

try {
    decap_start_session();

    $code = (string) ($_GET['code'] ?? '');
    $state = (string) ($_GET['state'] ?? '');
    $expectedState = (string) ($_SESSION['decap_oauth_state'] ?? '');
    $createdAt = (int) ($_SESSION['decap_oauth_created_at'] ?? 0);

    unset($_SESSION['decap_oauth_state'], $_SESSION['decap_oauth_created_at']);

    if (isset($_GET['error'])) {
        throw new RuntimeException('GitHub-Anmeldung wurde abgebrochen oder abgelehnt.');
    }

    if (
        $code === ''
        || $state === ''
        || $expectedState === ''
        || !hash_equals($expectedState, $state)
        || $createdAt < time() - 600
    ) {
        throw new RuntimeException('Die Anmeldung ist ungültig oder abgelaufen. Bitte erneut versuchen.');
    }

    $response = decap_github_request('https://github.com/login/oauth/access_token', [
        'post' => [
            'client_id' => decap_oauth_value('client_id'),
            'client_secret' => decap_oauth_value('client_secret'),
            'code' => $code,
            'redirect_uri' => decap_callback_url(),
            'state' => $state,
        ],
    ]);

    $token = $response['body']['access_token'] ?? '';
    if ($response['status'] !== 200 || !is_string($token) || $token === '') {
        throw new RuntimeException('GitHub konnte die Anmeldung nicht bestätigen.');
    }

    decap_verify_repository_access($token);
    session_destroy();

    decap_render_oauth_result('success', [
        'token' => $token,
        'provider' => 'github',
    ]);
} catch (Throwable $error) {
    if (session_status() === PHP_SESSION_ACTIVE) {
        session_destroy();
    }

    decap_render_oauth_result('error', ['message' => $error->getMessage()]);
}


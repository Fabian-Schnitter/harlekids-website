<?php

/**
 * Diese Datei in harlekids-oauth.php umbenennen und AUSSERHALB des öffentlichen
 * Web-Verzeichnisses ablegen, standardmäßig im benachbarten Ordner "private".
 * Die echte Datei mit dem Client Secret niemals in Git einchecken.
 */
return [
    'client_id' => 'GITHUB_OAUTH_CLIENT_ID_EINTRAGEN',
    'client_secret' => 'GITHUB_OAUTH_CLIENT_SECRET_EINTRAGEN',
    'site_origin' => 'https://harlekids.de',
    'repository' => 'Fabian-Schnitter/harlekids-website',
    // Für ein privates Repository wird der Scope "repo" benötigt.
    'scope' => 'repo',
];


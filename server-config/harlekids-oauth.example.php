<?php

/**
 * Diese Datei in harlekids-oauth.php umbenennen und AUSSERHALB des öffentlichen
 * Web-Verzeichnisses ablegen, standardmäßig im benachbarten Ordner "private".
 * Die echte Datei mit dem Client Secret niemals in Git einchecken.
 */
return [
    'client_id' => 'GITHUB_OAUTH_CLIENT_ID_EINTRAGEN',
    'client_secret' => 'GITHUB_OAUTH_CLIENT_SECRET_EINTRAGEN',
    'site_origin' => 'https://zpz-harlekids.de',
    'repository' => 'Fabian-Schnitter/harlekids-website',
    // Das Website-Repository ist öffentlich; private Repositories bleiben unzugänglich.
    'scope' => 'public_repo',
];

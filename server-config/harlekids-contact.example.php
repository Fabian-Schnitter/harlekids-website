<?php

declare(strict_types=1);

return [
    'host' => 'smtp.variomedia.de',
    'port' => 465,
    'encryption' => 'ssl',
    'username' => 'info@zpz-harlekids.de',
    'password' => 'PASSWORT_DES_VARIOMEDIA_POSTFACHS_EINTRAGEN',
    'from_email' => 'info@zpz-harlekids.de',
    'from_name' => 'Harlekids Website',
    'to_email' => 'info@zpz-harlekids.de',
    'to_name' => 'Harlekids e.V.',
    'allowed_origins' => [
        'https://zpz-harlekids.de',
        'https://www.zpz-harlekids.de',
        'https://test.zpz-harlekids.de',
    ],
];

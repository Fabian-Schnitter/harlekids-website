<?php

declare(strict_types=1);

return [
    // Passwortloser Versand über den lokalen Maildienst des Webservers.
    'transport' => 'mail',
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

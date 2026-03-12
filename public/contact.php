<?php
/**
 * Kontaktformular API für Harlekids Website
 * 
 * INSTALLATION:
 * 1. Diese Datei auf euren Server hochladen nach: /public_html/api/contact.php
 * 2. E-Mail-Adresse unten anpassen (Zeile 20)
 * 3. Domain anpassen (Zeile 9) wenn Website live geht
 */

// CORS Headers - WICHTIG: Domain anpassen wenn live!
header('Access-Control-Allow-Origin: https://neu.harlekids.de');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=UTF-8');

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

// Nur POST erlaubt
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'error' => 'Nur POST-Anfragen erlaubt'
    ]);
    exit;
}

// E-Mail-Empfänger - HIER EURE E-MAIL EINTRAGEN!
$to = 'info@harlekids.de';

// Daten empfangen und dekodieren
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if ($data === null) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Ungültige Daten'
    ]);
    exit;
}

// SPAM-SCHUTZ 1: Honeypot - Wenn "website" ausgefüllt ist = Bot
if (!empty($data['website'])) {
    // Spam erkannt, aber wir geben "success" zurück um Bots zu täuschen
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Nachricht gesendet'
    ]);
    
    // Spam-Versuch loggen (optional)
    error_log('SPAM detected via honeypot from IP: ' . $_SERVER['REMOTE_ADDR']);
    exit;
}

// Validierung der Pflichtfelder
if (empty($data['name']) || empty($data['email']) || empty($data['subject']) || empty($data['message'])) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Alle Pflichtfelder müssen ausgefüllt werden'
    ]);
    exit;
}

// E-Mail-Validierung
if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Ungültige E-Mail-Adresse'
    ]);
    exit;
}

// SPAM-SCHUTZ 2: Zu lange Nachrichten filtern
if (strlen($data['message']) > 5000) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Nachricht ist zu lang (max. 5000 Zeichen)'
    ]);
    exit;
}

// SPAM-SCHUTZ 3: Verdächtige Inhalte filtern
$spam_words = ['viagra', 'cialis', 'casino', 'lottery', 'bitcoin', 'crypto'];
$message_lower = strtolower($data['message']);
foreach ($spam_words as $spam_word) {
    if (strpos($message_lower, $spam_word) !== false) {
        http_response_code(200); // Täusche Erfolg vor
        echo json_encode([
            'success' => true,
            'message' => 'Nachricht gesendet'
        ]);
        error_log('SPAM detected (keyword) from IP: ' . $_SERVER['REMOTE_ADDR']);
        exit;
    }
}

// Daten bereinigen
$name = htmlspecialchars(strip_tags($data['name']), ENT_QUOTES, 'UTF-8');
$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$phone = !empty($data['phone']) ? htmlspecialchars(strip_tags($data['phone']), ENT_QUOTES, 'UTF-8') : 'Nicht angegeben';
$subject = htmlspecialchars(strip_tags($data['subject']), ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars(strip_tags($data['message']), ENT_QUOTES, 'UTF-8');

// Betreff übersetzen
$subject_map = [
    'jugendzirkus' => 'Jugendzirkus',
    'ferien' => 'Zirkusferien',
    'fortbildung' => 'Fortbildung',
    'herberge' => 'Jugendherberge',
    'schulprojekt' => 'Schulprojekt',
    'sonstiges' => 'Sonstiges'
];
$subject_readable = isset($subject_map[$subject]) ? $subject_map[$subject] : $subject;

// E-Mail-Betreff
$email_subject = 'Kontaktanfrage: ' . $subject_readable . ' - ' . $name;

// E-Mail-Body
$email_body = "Neue Kontaktanfrage über die Website\n";
$email_body .= "=====================================\n\n";
$email_body .= "Name: " . $name . "\n";
$email_body .= "E-Mail: " . $email . "\n";
$email_body .= "Telefon: " . $phone . "\n";
$email_body .= "Betreff: " . $subject_readable . "\n\n";
$email_body .= "Nachricht:\n";
$email_body .= "----------\n";
$email_body .= $message . "\n\n";
$email_body .= "=====================================\n";
$email_body .= "IP-Adresse: " . $_SERVER['REMOTE_ADDR'] . "\n";
$email_body .= "Datum: " . date('d.m.Y H:i:s') . "\n";

// E-Mail-Header
$headers = [];
$headers[] = 'From: noreply@harlekids.de';
$headers[] = 'Reply-To: ' . $email;
$headers[] = 'X-Mailer: PHP/' . phpversion();
$headers[] = 'Content-Type: text/plain; charset=UTF-8';

// E-Mail senden
$mail_sent = mail($to, $email_subject, $email_body, implode("\r\n", $headers));

if ($mail_sent) {
    // Erfolg
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Nachricht wurde erfolgreich gesendet'
    ]);
    
    // Optional: Erfolg loggen
    error_log('Contact form submitted successfully from: ' . $email);
} else {
    // Fehler beim Senden
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Fehler beim Senden der E-Mail. Bitte versuchen Sie es später erneut.'
    ]);
    
    // Fehler loggen
    error_log('Failed to send contact form email from: ' . $email);
}
?>

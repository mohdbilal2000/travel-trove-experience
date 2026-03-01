<?php
// Email Configuration
define('ADMIN_EMAIL', 'info@guideindiatours.com');
define('SITE_NAME', 'Guide India Tours');
define('SITE_URL', 'https://' . $_SERVER['HTTP_HOST']);

// SMTP Configuration for PHPMailer
define('SMTP_HOST', 'smtp.gmail.com'); // Change this to your SMTP server
define('SMTP_PORT', 587); // Common SMTP ports: 587 (TLS), 465 (SSL), 25 (unencrypted)
define('SMTP_USERNAME', 'your-email@gmail.com'); // Your email address
define('SMTP_PASSWORD', 'your-app-password'); // Your email password or app password

// Email Settings (you can modify these based on your hosting provider)
define('EMAIL_FROM_NAME', 'Guide India Tours Contact Form');
define('EMAIL_FROM_ADDRESS', 'noreply@' . $_SERVER['HTTP_HOST']);

// Logging Settings
define('ENABLE_LOGGING', true);
define('LOG_DIR', __DIR__ . '/logs/');

// Security Settings
define('MAX_MESSAGE_LENGTH', 1000);
define('MAX_NAME_LENGTH', 50);
define('MAX_TRAVELERS', 50);

// Create logs directory if it doesn't exist
if (ENABLE_LOGGING && !is_dir(LOG_DIR)) {
    mkdir(LOG_DIR, 0755, true);
}

// Helper function to log messages
function logMessage($type, $message) {
    if (!ENABLE_LOGGING) return;
    
    $logFile = LOG_DIR . $type . '_' . date('Y-m-d') . '.log';
    $timestamp = date('Y-m-d H:i:s');
    $logEntry = "[$timestamp] $message\n";
    
    file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX);
}

// Helper function to validate email
function isValidEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

// Helper function to sanitize input
function sanitizeInput($input) {
    return htmlspecialchars(trim($input), ENT_QUOTES, 'UTF-8');
}

// Helper function to send JSON response
function sendJsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}
?> 
<?php
require_once 'config.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;


header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJsonResponse(['error' => 'Method not allowed'], 405);
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Validate required fields
$required_fields = ['name', 'email', 'subject', 'message'];
foreach ($required_fields as $field) {
    if (empty($input[$field])) {
        sendJsonResponse(['error' => 'Missing required fields'], 400);
    }
}

// Sanitize and validate inputs
$name = sanitizeInput($input['name']);
$email = filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL);
$phone = isset($input['phone']) ? sanitizeInput($input['phone']) : 'N/A';
$subject = sanitizeInput($input['subject']);
$message = sanitizeInput($input['message']);

// Validate email
if (!isValidEmail($email)) {
    sendJsonResponse(['error' => 'Invalid email address'], 400);
}

// Validate input lengths
if (strlen($name) > MAX_NAME_LENGTH) {
    sendJsonResponse(['error' => 'Name too long'], 400);
}

if (strlen($message) > MAX_MESSAGE_LENGTH) {
    sendJsonResponse(['error' => 'Message too long'], 400);
}

// Try PHPMailer first if available
if (file_exists('vendor/autoload.php')) {
    try {
        // Include PHPMailer classes
        // Load PHPMailer autoloader
        require 'vendor/autoload.php';
        
        // Create a new PHPMailer instance
        $mail = new PHPMailer(true);
        
        // Server settings
        $mail->isSMTP();
        $mail->Host = SMTP_HOST;
        $mail->SMTPAuth = true;
        $mail->Username = SMTP_USERNAME;
        $mail->Password = SMTP_PASSWORD;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = SMTP_PORT;
        
        // Recipients
        $mail->setFrom(SMTP_USERNAME, EMAIL_FROM_NAME);
        $mail->addAddress(ADMIN_EMAIL);
        $mail->addReplyTo($email, $name);
        
        // Content
        $mail->isHTML(true);
        $mail->Subject = "Contact Form: $subject";
        
        // Create HTML email body
        $email_body = createEmailBody($name, $email, $phone, $subject, $message);
        
        $mail->Body = $email_body;
        $mail->AltBody = "Name: $name\nEmail: $email\nPhone: $phone\nSubject: $subject\n\nMessage:\n$message";
        
        // Send email
        $mail->send();
        
        // Log the contact submission
        logMessage('contact', "Contact from: $name ($email) - Subject: $subject");
        
        sendJsonResponse(['success' => true, 'message' => 'Email sent successfully']);
        
    } catch (Exception $e) {
        logMessage('error', "PHPMailer failed: " . $e->getMessage());
        // Fall back to alternative method
    }
}

// Fallback: Use improved mail() function with better headers
$to = ADMIN_EMAIL;
$email_subject = "Contact Form: $subject";
$from_email = 'noreply@' . $_SERVER['HTTP_HOST'];
$from_name = EMAIL_FROM_NAME;

// Create email headers with better formatting
$headers = array();
$headers[] = "MIME-Version: 1.0";
$headers[] = "Content-type: text/html; charset=UTF-8";
$headers[] = "From: $from_name <$from_email>";
$headers[] = "Reply-To: $name <$email>";
$headers[] = "X-Mailer: PHP/" . phpversion();
$headers[] = "X-Priority: 1";
$headers[] = "X-MSMail-Priority: High";

// Create HTML email body
$email_body = createEmailBody($name, $email, $phone, $subject, $message);

// Send email
$mail_sent = mail($to, $email_subject, $email_body, implode("\r\n", $headers));

if ($mail_sent) {
    // Log the contact submission
    logMessage('contact', "Contact from: $name ($email) - Subject: $subject");
    
    sendJsonResponse(['success' => true, 'message' => 'Email sent successfully']);
} else {
    logMessage('error', "Failed to send contact email from: $name ($email)");
    
    // Try one more method - send to multiple addresses
    $additional_emails = ['info@guideindiatours.com'];
    $sent_to_any = false;
    
    foreach ($additional_emails as $alt_email) {
        if (mail($alt_email, $email_subject, $email_body, implode("\r\n", $headers))) {
            $sent_to_any = true;
            logMessage('contact', "Contact sent to alternative email: $alt_email");
        }
    }
    
    if ($sent_to_any) {
        sendJsonResponse(['success' => true, 'message' => 'Email sent successfully']);
    } else {
        sendJsonResponse(['error' => 'Failed to send email. Please try again or contact us directly.'], 500);
    }
}

// Helper function to create email body
function createEmailBody($name, $email, $phone, $subject, $message) {
    return "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <title>New Contact Form Submission</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #800000; color: white; padding: 20px; text-align: center; }
            .content { background: #f9f9f9; padding: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #800000; }
            .value { margin-top: 5px; }
            .message-box { background: white; padding: 15px; border-left: 4px solid #800000; margin-top: 10px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>New Contact Form Submission</h1>
                <p>" . SITE_NAME . "</p>
            </div>
            <div class='content'>
                <div class='field'>
                    <div class='label'>Name:</div>
                    <div class='value'>$name</div>
                </div>
                <div class='field'>
                    <div class='label'>Email:</div>
                    <div class='value'><a href='mailto:$email'>$email</a></div>
                </div>
                <div class='field'>
                    <div class='label'>Phone:</div>
                    <div class='value'>$phone</div>
                </div>
                <div class='field'>
                    <div class='label'>Subject:</div>
                    <div class='value'>$subject</div>
                </div>
                <div class='field'>
                    <div class='label'>Message:</div>
                    <div class='message-box'>" . nl2br($message) . "</div>
                </div>
                <div class='field'>
                    <div class='label'>Submitted:</div>
                    <div class='value'>" . date('F j, Y \a\t g:i A T') . "</div>
                </div>
            </div>
        </div>
    </body>
    </html>";
}
?> 
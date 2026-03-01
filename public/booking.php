<?php
require_once 'config.php';

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
$required_fields = ['name', 'email', 'travelers', 'date', 'message', 'planTitle', 'planDuration', 'planPrice'];
foreach ($required_fields as $field) {
    if (empty($input[$field])) {
        sendJsonResponse(['error' => 'Missing required fields'], 400);
    }
}

// Sanitize and validate inputs
$name = sanitizeInput($input['name']);
$email = filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL);
$phone = isset($input['phone']) ? sanitizeInput($input['phone']) : 'N/A';
$country = isset($input['country']) ? sanitizeInput($input['country']) : 'Not provided';
$city = isset($input['city']) ? sanitizeInput($input['city']) : 'Not provided';
$travelers = intval($input['travelers']);
$children = isset($input['children']) ? intval($input['children']) : 0;
$date = sanitizeInput($input['date']);
$message = sanitizeInput($input['message']);
$planTitle = sanitizeInput($input['planTitle']);
$planDuration = sanitizeInput($input['planDuration']);
$planPrice = sanitizeInput($input['planPrice']);

// Validate email
if (!isValidEmail($email)) {
    sendJsonResponse(['error' => 'Invalid email address'], 400);
}

// Validate travelers count
if ($travelers < 1 || $travelers > MAX_TRAVELERS) {
    sendJsonResponse(['error' => 'Invalid number of travelers'], 400);
}

// Validate input lengths
if (strlen($name) > MAX_NAME_LENGTH) {
    sendJsonResponse(['error' => 'Name too long'], 400);
}

if (strlen($message) > MAX_MESSAGE_LENGTH) {
    sendJsonResponse(['error' => 'Message too long'], 400);
}

// Email configuration
$to = ADMIN_EMAIL;
$email_subject = "New Booking Request: $planTitle";
$from_email = EMAIL_FROM_ADDRESS;
$from_name = EMAIL_FROM_NAME;

// Create email headers
$headers = array();
$headers[] = "MIME-Version: 1.0";
$headers[] = "Content-type: text/html; charset=UTF-8";
$headers[] = "From: $from_name <$from_email>";
$headers[] = "Reply-To: $name <$email>";
$headers[] = "X-Mailer: PHP/" . phpversion();

// Create HTML email body
$email_body = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <title>New Booking Request</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 700px; margin: 0 auto; padding: 20px; }
        .header { background: #800000; color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #800000; }
        .value { margin-top: 5px; }
        .message-box { background: white; padding: 15px; border-left: 4px solid #800000; margin-top: 10px; }
        .plan-details { background: #e8f4f8; padding: 15px; border-radius: 5px; margin: 15px 0; }
        .highlight { background: #fff3cd; padding: 10px; border-radius: 5px; margin: 10px 0; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>🎯 New Booking Request</h1>
            <p>" . SITE_NAME . "</p>
        </div>
        <div class='content'>
            <div class='highlight'>
                <strong>Tour Package:</strong> $planTitle<br>
                <strong>Duration:</strong> $planDuration<br>
                <strong>Price:</strong> $planPrice
            </div>
            
            <div class='field'>
                <div class='label'>Customer Name:</div>
                <div class='value'>$name</div>
            </div>
            <div class='field'>
                <div class='label'>Email Address:</div>
                <div class='value'><a href='mailto:$email'>$email</a></div>
            </div>
            <div class='field'>
                <div class='label'>Phone Number:</div>
                <div class='value'>$phone</div>
            </div>
            <div class='field'>
                <div class='label'>Country:</div>
                <div class='value'>$country</div>
            </div>
            <div class='field'>
                <div class='label'>City:</div>
                <div class='value'>$city</div>
            </div>
            <div class='field'>
                <div class='label'>Number of Adults/Travelers:</div>
                <div class='value'>$travelers person(s)</div>
            </div>
            <div class='field'>
                <div class='label'>Number of Children (below 15):</div>
                <div class='value'>" . ($children > 0 ? "$children child(ren)" : "None") . "</div>
            </div>
            <div class='field'>
                <div class='label'>Preferred Travel Date:</div>
                <div class='value'>$date</div>
            </div>
            <div class='field'>
                <div class='label'>Customer Message:</div>
                <div class='message-box'>" . nl2br($message) . "</div>
            </div>
            <div class='field'>
                <div class='label'>Request Submitted:</div>
                <div class='value'>" . date('F j, Y \a\t g:i A T') . "</div>
            </div>
            
            <div class='plan-details'>
                <h3>📋 Next Steps:</h3>
                <ul>
                    <li>Review the booking request</li>
                    <li>Check availability for the requested date</li>
                    <li>Send confirmation email to customer</li>
                    <li>Prepare detailed itinerary if needed</li>
                </ul>
            </div>
        </div>
    </div>
</body>
</html>";

// Send email
$mail_sent = mail($to, $email_subject, $email_body, implode("\r\n", $headers));

if ($mail_sent) {
    // Log the booking submission
    logMessage('booking', "Booking: $planTitle from: $name ($email) - Travelers: $travelers - Date: $date");
    
    sendJsonResponse(['success' => true, 'message' => 'Booking request sent successfully']);
} else {
    logMessage('error', "Failed to send booking email for: $planTitle from: $name ($email)");
    sendJsonResponse(['error' => 'Failed to send booking request'], 500);
}
?> 
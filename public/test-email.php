<?php
// Simple email test file
header('Content-Type: text/html');

echo "<h1>Email Test</h1>";

// Test 1: Check if mail function exists
echo "<h2>Test 1: Mail Function</h2>";
if (function_exists('mail')) {
    echo "✅ mail() function exists<br>";
} else {
    echo "❌ mail() function does not exist<br>";
}

// Test 2: Check PHP configuration
echo "<h2>Test 2: PHP Configuration</h2>";
echo "PHP Version: " . phpversion() . "<br>";
echo "sendmail_path: " . ini_get('sendmail_path') . "<br>";
echo "SMTP: " . ini_get('SMTP') . "<br>";
echo "smtp_port: " . ini_get('smtp_port') . "<br>";

// Test 3: Try to send a test email
echo "<h2>Test 3: Send Test Email</h2>";
$to = 'info@guideindiatours.com';
$subject = 'Test Email from Website';
$message = 'This is a test email to check if the mail function is working.';
$headers = 'From: noreply@' . $_SERVER['HTTP_HOST'] . "\r\n" .
           'Reply-To: noreply@' . $_SERVER['HTTP_HOST'] . "\r\n" .
           'X-Mailer: PHP/' . phpversion();

if (mail($to, $subject, $message, $headers)) {
    echo "✅ Test email sent successfully!<br>";
    echo "Check your inbox at: $to<br>";
} else {
    echo "❌ Failed to send test email<br>";
}

// Test 4: Check if logs directory exists
echo "<h2>Test 4: Logs Directory</h2>";
$logDir = __DIR__ . '/logs/';
if (is_dir($logDir)) {
    echo "✅ Logs directory exists: $logDir<br>";
    if (is_writable($logDir)) {
        echo "✅ Logs directory is writable<br>";
    } else {
        echo "❌ Logs directory is not writable<br>";
    }
} else {
    echo "❌ Logs directory does not exist<br>";
    if (mkdir($logDir, 0755, true)) {
        echo "✅ Created logs directory<br>";
    } else {
        echo "❌ Failed to create logs directory<br>";
    }
}

// Test 5: Check recent log files
echo "<h2>Test 5: Recent Log Files</h2>";
if (is_dir($logDir)) {
    $files = glob($logDir . '*.log');
    if (empty($files)) {
        echo "No log files found<br>";
    } else {
        echo "Found " . count($files) . " log files:<br>";
        foreach ($files as $file) {
            $filename = basename($file);
            $size = filesize($file);
            echo "- $filename ($size bytes)<br>";
        }
    }
}

echo "<hr>";
echo "<p><strong>Note:</strong> If emails are not working, you may need to:</p>";
echo "<ul>";
echo "<li>Configure your hosting provider's email settings</li>";
echo "<li>Use a third-party email service like SendGrid or Mailgun</li>";
echo "<li>Set up SMTP configuration</li>";
echo "<li>Check with your hosting provider about email restrictions</li>";
echo "</ul>";
?> 
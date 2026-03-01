<?php
// Simple test file to verify PHP is working
header('Content-Type: application/json');

$test_data = [
    'status' => 'success',
    'message' => 'PHP is working correctly',
    'timestamp' => date('Y-m-d H:i:s'),
    'php_version' => phpversion(),
    'server_info' => $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown',
    'mail_function' => function_exists('mail') ? 'Available' : 'Not available'
];

echo json_encode($test_data, JSON_PRETTY_PRINT);
?> 
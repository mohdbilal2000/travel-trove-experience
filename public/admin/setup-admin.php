<?php
/**
 * Admin Setup Script
 * Run this once to create the admin user with correct password hash
 * 
 * Usage: Access via browser: https://yourdomain.com/admin/setup-admin.php
 * Then DELETE this file for security!
 */

require_once __DIR__ . '/config.php';

// Security: Only allow if no admin users exist
$db = getDBConnection();
$checkStmt = $db->query("SELECT COUNT(*) as count FROM admin_users");
$count = $checkStmt->fetch()['count'];

if ($count > 0) {
    die("Admin user already exists. Delete this file for security.");
}

// Create admin user with password 'admin123'
$username = 'admin';
$email = 'info@guideindiatours.com';
$password = 'admin123';
$passwordHash = password_hash($password, PASSWORD_DEFAULT);
$fullName = 'Administrator';
$role = 'admin';

try {
    $stmt = $db->prepare("
        INSERT INTO admin_users (username, email, password_hash, full_name, role, is_active) 
        VALUES (?, ?, ?, ?, ?, 1)
    ");
    
    $stmt->execute([$username, $email, $passwordHash, $fullName, $role]);
    
    echo "<h1>✅ Admin User Created Successfully!</h1>";
    echo "<p><strong>Username:</strong> admin</p>";
    echo "<p><strong>Password:</strong> admin123</p>";
    echo "<p><strong>⚠️ IMPORTANT:</strong> Please change the password after first login!</p>";
    echo "<p><strong>⚠️ SECURITY:</strong> Delete this file (setup-admin.php) immediately!</p>";
    echo "<p><a href='/admin/login'>Go to Admin Login</a></p>";
    
} catch (Exception $e) {
    echo "<h1>❌ Error</h1>";
    echo "<p>" . htmlspecialchars($e->getMessage()) . "</p>";
    echo "<p>Make sure the database is set up correctly.</p>";
}





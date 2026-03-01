<?php
/**
 * Test Database Connection
 * Use this to verify your database configuration
 */

require_once __DIR__ . '/../config.php';

header('Content-Type: application/json');

try {
    $db = getDBConnection();
    
    // Test query
    $stmt = $db->query("SELECT 1 as test");
    $result = $stmt->fetch();
    
    // Check if tables exist
    $tables = ['admin_users', 'travel_plans', 'blog_posts', 'seo_settings'];
    $existingTables = [];
    
    foreach ($tables as $table) {
        $checkStmt = $db->query("SHOW TABLES LIKE '$table'");
        if ($checkStmt->rowCount() > 0) {
            $existingTables[] = $table;
        }
    }
    
    // Check admin users
    $userStmt = $db->query("SELECT COUNT(*) as count FROM admin_users");
    $userCount = $userStmt->fetch()['count'];
    
    echo json_encode([
        'success' => true,
        'message' => 'Database connection successful',
        'database' => DB_NAME,
        'host' => DB_HOST,
        'tables_exist' => $existingTables,
        'admin_users_count' => $userCount,
        'php_version' => PHP_VERSION
    ], JSON_PRETTY_PRINT);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage(),
        'database' => DB_NAME,
        'host' => DB_HOST,
        'php_version' => PHP_VERSION
    ], JSON_PRETTY_PRINT);
}





<?php
/**
 * Authentication API
 * Handles admin login, logout, and session management
 */

require_once __DIR__ . '/../config.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

try {
    $db = getDBConnection();
    
    switch ($action) {
        case 'login':
            if ($method !== 'POST') {
                throw new Exception('Method not allowed', 405);
            }
            
            $data = json_decode(file_get_contents('php://input'), true);
            $username = $data['username'] ?? '';
            $password = $data['password'] ?? '';
            
            if (empty($username) || empty($password)) {
                throw new Exception('Username and password are required', 400);
            }
            
            $stmt = $db->prepare("SELECT id, username, email, password_hash, full_name, role, is_active FROM admin_users WHERE username = ? OR email = ?");
            $stmt->execute([$username, $username]);
            $user = $stmt->fetch();
            
            if (!$user || !password_verify($password, $user['password_hash'])) {
                throw new Exception('Invalid credentials', 401);
            }
            
            if (!$user['is_active']) {
                throw new Exception('Account is disabled', 403);
            }
            
            // Update last login
            $updateStmt = $db->prepare("UPDATE admin_users SET last_login = NOW() WHERE id = ?");
            $updateStmt->execute([$user['id']]);
            
            // Set session
            $_SESSION['admin_id'] = $user['id'];
            $_SESSION['admin_username'] = $user['username'];
            $_SESSION['admin_role'] = $user['role'];
            $_SESSION['admin_logged_in'] = true;
            
            echo json_encode([
                'success' => true,
                'user' => [
                    'id' => $user['id'],
                    'username' => $user['username'],
                    'email' => $user['email'],
                    'full_name' => $user['full_name'],
                    'role' => $user['role']
                ],
                'message' => 'Login successful'
            ]);
            break;
            
        case 'logout':
            if ($method !== 'POST') {
                throw new Exception('Method not allowed', 405);
            }
            
            session_destroy();
            echo json_encode(['success' => true, 'message' => 'Logged out successfully']);
            break;
            
        case 'check':
            if ($method !== 'GET') {
                throw new Exception('Method not allowed', 405);
            }
            
            if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
                $stmt = $db->prepare("SELECT id, username, email, full_name, role FROM admin_users WHERE id = ?");
                $stmt->execute([$_SESSION['admin_id']]);
                $user = $stmt->fetch();
                
                if ($user) {
                    echo json_encode([
                        'authenticated' => true,
                        'user' => $user
                    ]);
                } else {
                    session_destroy();
                    echo json_encode(['authenticated' => false]);
                }
            } else {
                echo json_encode(['authenticated' => false]);
            }
            break;
            
        case 'change-password':
            if ($method !== 'POST') {
                throw new Exception('Method not allowed', 405);
            }
            
            if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
                throw new Exception('Unauthorized', 401);
            }
            
            $data = json_decode(file_get_contents('php://input'), true);
            $currentPassword = $data['currentPassword'] ?? '';
            $newPassword = $data['newPassword'] ?? '';
            
            if (empty($currentPassword) || empty($newPassword)) {
                throw new Exception('Current and new passwords are required', 400);
            }
            
            if (strlen($newPassword) < 8) {
                throw new Exception('New password must be at least 8 characters', 400);
            }
            
            $stmt = $db->prepare("SELECT password_hash FROM admin_users WHERE id = ?");
            $stmt->execute([$_SESSION['admin_id']]);
            $user = $stmt->fetch();
            
            if (!password_verify($currentPassword, $user['password_hash'])) {
                throw new Exception('Current password is incorrect', 400);
            }
            
            $newHash = password_hash($newPassword, PASSWORD_DEFAULT);
            $updateStmt = $db->prepare("UPDATE admin_users SET password_hash = ? WHERE id = ?");
            $updateStmt->execute([$newHash, $_SESSION['admin_id']]);
            
            echo json_encode(['success' => true, 'message' => 'Password changed successfully']);
            break;
            
        default:
            throw new Exception('Invalid action', 400);
    }
    
} catch (Exception $e) {
    http_response_code($e->getCode() ?: 500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}





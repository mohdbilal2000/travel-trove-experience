<?php
/**
 * SEO Settings API
 * Manage SEO metadata for pages
 */

require_once __DIR__ . '/../config.php';

header('Content-Type: application/json');

function requireAuth() {
    if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
        http_response_code(401);
        echo json_encode(['success' => false, 'error' => 'Unauthorized']);
        exit;
    }
}

$method = $_SERVER['REQUEST_METHOD'];
$path = $_GET['path'] ?? null;

try {
    $db = getDBConnection();
    
    switch ($method) {
        case 'GET':
            if ($path) {
                $stmt = $db->prepare("SELECT * FROM seo_settings WHERE page_path = ?");
                $stmt->execute([$path]);
                $seo = $stmt->fetch();
                
                if ($seo) {
                    $seo['structured_data'] = json_decode($seo['structured_data'] ?? '{}', true);
                }
                
                echo json_encode(['success' => true, 'data' => $seo]);
            } else {
                $page = intval($_GET['page'] ?? 1);
                $limit = intval($_GET['limit'] ?? ITEMS_PER_PAGE);
                $offset = ($page - 1) * $limit;
                $type = $_GET['type'] ?? '';
                
                $where = [];
                $params = [];
                
                if ($type) {
                    $where[] = "page_type = ?";
                    $params[] = $type;
                }
                
                $whereClause = !empty($where) ? "WHERE " . implode(" AND ", $where) : "";
                
                $countStmt = $db->prepare("SELECT COUNT(*) as total FROM seo_settings $whereClause");
                $countStmt->execute($params);
                $total = $countStmt->fetch()['total'];
                
                $stmt = $db->prepare("SELECT * FROM seo_settings $whereClause ORDER BY page_path ASC LIMIT ? OFFSET ?");
                $params[] = $limit;
                $params[] = $offset;
                $stmt->execute($params);
                $settings = $stmt->fetchAll();
                
                foreach ($settings as &$setting) {
                    $setting['structured_data'] = json_decode($setting['structured_data'] ?? '{}', true);
                }
                
                echo json_encode([
                    'success' => true,
                    'data' => $settings,
                    'pagination' => [
                        'page' => $page,
                        'limit' => $limit,
                        'total' => $total,
                        'pages' => ceil($total / $limit)
                    ]
                ]);
            }
            break;
            
        case 'POST':
        case 'PUT':
            requireAuth();
            
            $data = json_decode(file_get_contents('php://input'), true);
            
            if (empty($data['page_path']) || empty($data['page_type'])) {
                throw new Exception('Page path and type are required', 400);
            }
            
            // Check if exists
            $checkStmt = $db->prepare("SELECT id FROM seo_settings WHERE page_path = ?");
            $checkStmt->execute([$data['page_path']]);
            $exists = $checkStmt->fetch();
            
            if ($exists) {
                // Update
                $stmt = $db->prepare("
                    UPDATE seo_settings SET
                        page_type = ?, title = ?, description = ?,
                        keywords = ?, og_title = ?, og_description = ?,
                        og_image = ?, canonical_url = ?, structured_data = ?,
                        is_active = ?
                    WHERE page_path = ?
                ");
                
                $stmt->execute([
                    $data['page_type'],
                    $data['title'] ?? '',
                    $data['description'] ?? '',
                    $data['keywords'] ?? '',
                    $data['og_title'] ?? '',
                    $data['og_description'] ?? '',
                    $data['og_image'] ?? '',
                    $data['canonical_url'] ?? '',
                    json_encode($data['structured_data'] ?? []),
                    $data['is_active'] ?? true,
                    $data['page_path']
                ]);
            } else {
                // Insert
                $stmt = $db->prepare("
                    INSERT INTO seo_settings (
                        page_path, page_type, title, description,
                        keywords, og_title, og_description, og_image,
                        canonical_url, structured_data, is_active
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ");
                
                $stmt->execute([
                    $data['page_path'],
                    $data['page_type'],
                    $data['title'] ?? '',
                    $data['description'] ?? '',
                    $data['keywords'] ?? '',
                    $data['og_title'] ?? '',
                    $data['og_description'] ?? '',
                    $data['og_image'] ?? '',
                    $data['canonical_url'] ?? '',
                    json_encode($data['structured_data'] ?? []),
                    $data['is_active'] ?? true
                ]);
            }
            
            echo json_encode([
                'success' => true,
                'message' => 'SEO settings saved successfully'
            ]);
            break;
            
        case 'DELETE':
            requireAuth();
            
            if (!$path) {
                throw new Exception('Page path is required', 400);
            }
            
            $stmt = $db->prepare("DELETE FROM seo_settings WHERE page_path = ?");
            $stmt->execute([$path]);
            
            echo json_encode([
                'success' => true,
                'message' => 'SEO settings deleted successfully'
            ]);
            break;
            
        default:
            throw new Exception('Method not allowed', 405);
    }
    
} catch (Exception $e) {
    http_response_code($e->getCode() ?: 500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}





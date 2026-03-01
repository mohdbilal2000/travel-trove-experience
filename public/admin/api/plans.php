<?php
/**
 * Travel Plans API
 * CRUD operations for travel plans
 */

require_once __DIR__ . '/../config.php';

header('Content-Type: application/json');

// Check authentication for write operations
function requireAuth() {
    if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
        http_response_code(401);
        echo json_encode(['success' => false, 'error' => 'Unauthorized']);
        exit;
    }
}

$method = $_SERVER['REQUEST_METHOD'];
$id = $_GET['id'] ?? null;

try {
    $db = getDBConnection();
    
    switch ($method) {
        case 'GET':
            if ($id) {
                // Get single plan
                $stmt = $db->prepare("SELECT * FROM travel_plans WHERE id = ?");
                $stmt->execute([$id]);
                $plan = $stmt->fetch();
                
                if (!$plan) {
                    throw new Exception('Plan not found', 404);
                }
                
                // Decode JSON fields
                $plan['destinations'] = json_decode($plan['destinations'] ?? '[]', true);
                $plan['itinerary'] = json_decode($plan['itinerary'] ?? '[]', true);
                $plan['faqs'] = json_decode($plan['faqs'] ?? '[]', true);
                $plan['highlights'] = json_decode($plan['highlights'] ?? '[]', true);
                $plan['inclusions'] = json_decode($plan['inclusions'] ?? '[]', true);
                $plan['exclusions'] = json_decode($plan['exclusions'] ?? '[]', true);
                
                echo json_encode(['success' => true, 'data' => $plan]);
            } else {
                // Get all plans
                $page = intval($_GET['page'] ?? 1);
                $limit = intval($_GET['limit'] ?? ITEMS_PER_PAGE);
                $offset = ($page - 1) * $limit;
                $category = $_GET['category'] ?? '';
                $activeOnly = isset($_GET['active']) && $_GET['active'] === 'true';
                
                $where = [];
                $params = [];
                
                if ($category) {
                    $where[] = "category = ?";
                    $params[] = $category;
                }
                
                if ($activeOnly) {
                    $where[] = "is_active = 1";
                }
                
                $whereClause = !empty($where) ? "WHERE " . implode(" AND ", $where) : "";
                
                // Get total count
                $countStmt = $db->prepare("SELECT COUNT(*) as total FROM travel_plans $whereClause");
                $countStmt->execute($params);
                $total = $countStmt->fetch()['total'];
                
                // Get plans
                $stmt = $db->prepare("SELECT * FROM travel_plans $whereClause ORDER BY sort_order ASC, id DESC LIMIT ? OFFSET ?");
                $params[] = $limit;
                $params[] = $offset;
                $stmt->execute($params);
                $plans = $stmt->fetchAll();
                
                // Decode JSON fields
                foreach ($plans as &$plan) {
                    $plan['destinations'] = json_decode($plan['destinations'] ?? '[]', true);
                    $plan['itinerary'] = json_decode($plan['itinerary'] ?? '[]', true);
                    $plan['faqs'] = json_decode($plan['faqs'] ?? '[]', true);
                    $plan['highlights'] = json_decode($plan['highlights'] ?? '[]', true);
                    $plan['inclusions'] = json_decode($plan['inclusions'] ?? '[]', true);
                    $plan['exclusions'] = json_decode($plan['exclusions'] ?? '[]', true);
                }
                
                echo json_encode([
                    'success' => true,
                    'data' => $plans,
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
            requireAuth();
            
            $data = json_decode(file_get_contents('php://input'), true);
            
            // Validate required fields
            if (empty($data['title']) || empty($data['slug'])) {
                throw new Exception('Title and slug are required', 400);
            }
            
            // Check if slug exists
            $checkStmt = $db->prepare("SELECT id FROM travel_plans WHERE slug = ?");
            $checkStmt->execute([$data['slug']]);
            if ($checkStmt->fetch()) {
                throw new Exception('Slug already exists', 400);
            }
            
            $stmt = $db->prepare("
                INSERT INTO travel_plans (
                    title, slug, description, short_description, price, duration,
                    destinations, image, category, itinerary, faqs, highlights,
                    inclusions, exclusions, is_featured, is_active, sort_order,
                    meta_title, meta_description, meta_keywords
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ");
            
            $stmt->execute([
                $data['title'],
                $data['slug'],
                $data['description'] ?? '',
                $data['short_description'] ?? '',
                $data['price'] ?? '',
                $data['duration'] ?? '',
                json_encode($data['destinations'] ?? []),
                $data['image'] ?? '',
                $data['category'] ?? '',
                json_encode($data['itinerary'] ?? []),
                json_encode($data['faqs'] ?? []),
                json_encode($data['highlights'] ?? []),
                json_encode($data['inclusions'] ?? []),
                json_encode($data['exclusions'] ?? []),
                $data['is_featured'] ?? false,
                $data['is_active'] ?? true,
                $data['sort_order'] ?? 0,
                $data['meta_title'] ?? '',
                $data['meta_description'] ?? '',
                $data['meta_keywords'] ?? ''
            ]);
            
            $id = $db->lastInsertId();
            
            echo json_encode([
                'success' => true,
                'message' => 'Plan created successfully',
                'id' => $id
            ]);
            break;
            
        case 'PUT':
            requireAuth();
            
            if (!$id) {
                throw new Exception('Plan ID is required', 400);
            }
            
            $data = json_decode(file_get_contents('php://input'), true);
            
            // Check if plan exists
            $checkStmt = $db->prepare("SELECT id FROM travel_plans WHERE id = ?");
            $checkStmt->execute([$id]);
            if (!$checkStmt->fetch()) {
                throw new Exception('Plan not found', 404);
            }
            
            // Check slug uniqueness if changed
            if (isset($data['slug'])) {
                $slugStmt = $db->prepare("SELECT id FROM travel_plans WHERE slug = ? AND id != ?");
                $slugStmt->execute([$data['slug'], $id]);
                if ($slugStmt->fetch()) {
                    throw new Exception('Slug already exists', 400);
                }
            }
            
            $stmt = $db->prepare("
                UPDATE travel_plans SET
                    title = ?, slug = ?, description = ?, short_description = ?,
                    price = ?, duration = ?, destinations = ?, image = ?,
                    category = ?, itinerary = ?, faqs = ?, highlights = ?,
                    inclusions = ?, exclusions = ?, is_featured = ?,
                    is_active = ?, sort_order = ?, meta_title = ?,
                    meta_description = ?, meta_keywords = ?
                WHERE id = ?
            ");
            
            $stmt->execute([
                $data['title'] ?? '',
                $data['slug'] ?? '',
                $data['description'] ?? '',
                $data['short_description'] ?? '',
                $data['price'] ?? '',
                $data['duration'] ?? '',
                json_encode($data['destinations'] ?? []),
                $data['image'] ?? '',
                $data['category'] ?? '',
                json_encode($data['itinerary'] ?? []),
                json_encode($data['faqs'] ?? []),
                json_encode($data['highlights'] ?? []),
                json_encode($data['inclusions'] ?? []),
                json_encode($data['exclusions'] ?? []),
                $data['is_featured'] ?? false,
                $data['is_active'] ?? true,
                $data['sort_order'] ?? 0,
                $data['meta_title'] ?? '',
                $data['meta_description'] ?? '',
                $data['meta_keywords'] ?? '',
                $id
            ]);
            
            echo json_encode([
                'success' => true,
                'message' => 'Plan updated successfully'
            ]);
            break;
            
        case 'DELETE':
            requireAuth();
            
            if (!$id) {
                throw new Exception('Plan ID is required', 400);
            }
            
            $stmt = $db->prepare("DELETE FROM travel_plans WHERE id = ?");
            $stmt->execute([$id]);
            
            echo json_encode([
                'success' => true,
                'message' => 'Plan deleted successfully'
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





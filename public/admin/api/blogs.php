<?php
/**
 * Blog Posts API
 * CRUD operations for blog posts
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
$id = $_GET['id'] ?? null;

try {
    $db = getDBConnection();
    
    switch ($method) {
        case 'GET':
            if ($id) {
                $stmt = $db->prepare("SELECT * FROM blog_posts WHERE id = ?");
                $stmt->execute([$id]);
                $post = $stmt->fetch();
                
                if (!$post) {
                    throw new Exception('Post not found', 404);
                }
                
                $post['tags'] = json_decode($post['tags'] ?? '[]', true);
                $post['related_plans'] = json_decode($post['related_plans'] ?? '[]', true);
                $post['related_destinations'] = json_decode($post['related_destinations'] ?? '[]', true);
                
                echo json_encode(['success' => true, 'data' => $post]);
            } else {
                $page = intval($_GET['page'] ?? 1);
                $limit = intval($_GET['limit'] ?? ITEMS_PER_PAGE);
                $offset = ($page - 1) * $limit;
                $category = $_GET['category'] ?? '';
                $publishedOnly = isset($_GET['published']) && $_GET['published'] === 'true';
                
                $where = [];
                $params = [];
                
                if ($category) {
                    $where[] = "category = ?";
                    $params[] = $category;
                }
                
                if ($publishedOnly) {
                    $where[] = "is_published = 1";
                }
                
                $whereClause = !empty($where) ? "WHERE " . implode(" AND ", $where) : "";
                
                $countStmt = $db->prepare("SELECT COUNT(*) as total FROM blog_posts $whereClause");
                $countStmt->execute($params);
                $total = $countStmt->fetch()['total'];
                
                $stmt = $db->prepare("SELECT * FROM blog_posts $whereClause ORDER BY published_date DESC, id DESC LIMIT ? OFFSET ?");
                $params[] = $limit;
                $params[] = $offset;
                $stmt->execute($params);
                $posts = $stmt->fetchAll();
                
                foreach ($posts as &$post) {
                    $post['tags'] = json_decode($post['tags'] ?? '[]', true);
                    $post['related_plans'] = json_decode($post['related_plans'] ?? '[]', true);
                    $post['related_destinations'] = json_decode($post['related_destinations'] ?? '[]', true);
                }
                
                echo json_encode([
                    'success' => true,
                    'data' => $posts,
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
            
            if (empty($data['title']) || empty($data['slug'])) {
                throw new Exception('Title and slug are required', 400);
            }
            
            $checkStmt = $db->prepare("SELECT id FROM blog_posts WHERE slug = ?");
            $checkStmt->execute([$data['slug']]);
            if ($checkStmt->fetch()) {
                throw new Exception('Slug already exists', 400);
            }
            
            $stmt = $db->prepare("
                INSERT INTO blog_posts (
                    slug, title, excerpt, content, author, published_date,
                    image, category, tags, related_plans, related_destinations,
                    is_published, meta_title, meta_description, meta_keywords
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ");
            
            $stmt->execute([
                $data['slug'],
                $data['title'],
                $data['excerpt'] ?? '',
                $data['content'] ?? '',
                $data['author'] ?? 'Guide India Tours',
                $data['published_date'] ?? date('Y-m-d'),
                $data['image'] ?? '',
                $data['category'] ?? '',
                json_encode($data['tags'] ?? []),
                json_encode($data['related_plans'] ?? []),
                json_encode($data['related_destinations'] ?? []),
                $data['is_published'] ?? true,
                $data['meta_title'] ?? '',
                $data['meta_description'] ?? '',
                $data['meta_keywords'] ?? ''
            ]);
            
            $id = $db->lastInsertId();
            
            echo json_encode([
                'success' => true,
                'message' => 'Blog post created successfully',
                'id' => $id
            ]);
            break;
            
        case 'PUT':
            requireAuth();
            
            if (!$id) {
                throw new Exception('Post ID is required', 400);
            }
            
            $data = json_decode(file_get_contents('php://input'), true);
            
            $checkStmt = $db->prepare("SELECT id FROM blog_posts WHERE id = ?");
            $checkStmt->execute([$id]);
            if (!$checkStmt->fetch()) {
                throw new Exception('Post not found', 404);
            }
            
            if (isset($data['slug'])) {
                $slugStmt = $db->prepare("SELECT id FROM blog_posts WHERE slug = ? AND id != ?");
                $slugStmt->execute([$data['slug'], $id]);
                if ($slugStmt->fetch()) {
                    throw new Exception('Slug already exists', 400);
                }
            }
            
            $stmt = $db->prepare("
                UPDATE blog_posts SET
                    slug = ?, title = ?, excerpt = ?, content = ?,
                    author = ?, published_date = ?, image = ?,
                    category = ?, tags = ?, related_plans = ?,
                    related_destinations = ?, is_published = ?,
                    meta_title = ?, meta_description = ?, meta_keywords = ?
                WHERE id = ?
            ");
            
            $stmt->execute([
                $data['slug'] ?? '',
                $data['title'] ?? '',
                $data['excerpt'] ?? '',
                $data['content'] ?? '',
                $data['author'] ?? 'Guide India Tours',
                $data['published_date'] ?? date('Y-m-d'),
                $data['image'] ?? '',
                $data['category'] ?? '',
                json_encode($data['tags'] ?? []),
                json_encode($data['related_plans'] ?? []),
                json_encode($data['related_destinations'] ?? []),
                $data['is_published'] ?? true,
                $data['meta_title'] ?? '',
                $data['meta_description'] ?? '',
                $data['meta_keywords'] ?? '',
                $id
            ]);
            
            echo json_encode([
                'success' => true,
                'message' => 'Blog post updated successfully'
            ]);
            break;
            
        case 'DELETE':
            requireAuth();
            
            if (!$id) {
                throw new Exception('Post ID is required', 400);
            }
            
            $stmt = $db->prepare("DELETE FROM blog_posts WHERE id = ?");
            $stmt->execute([$id]);
            
            echo json_encode([
                'success' => true,
                'message' => 'Blog post deleted successfully'
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





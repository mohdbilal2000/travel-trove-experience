-- Database Schema for Dynamic Content Management
-- Compatible with Hostinger MySQL/MariaDB

CREATE DATABASE IF NOT EXISTS guide_india_tours CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE guide_india_tours;

-- Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    role ENUM('admin', 'editor') DEFAULT 'editor',
    is_active BOOLEAN DEFAULT TRUE,
    last_login DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Travel Plans Table
CREATE TABLE IF NOT EXISTS travel_plans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    short_description VARCHAR(500),
    price VARCHAR(50),
    duration VARCHAR(100),
    destinations JSON,
    image VARCHAR(255),
    category VARCHAR(100),
    itinerary JSON,
    faqs JSON,
    highlights JSON,
    inclusions JSON,
    exclusions JSON,
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    meta_title VARCHAR(255),
    meta_description TEXT,
    meta_keywords VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (slug),
    INDEX idx_category (category),
    INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    excerpt TEXT,
    content LONGTEXT,
    author VARCHAR(100) DEFAULT 'Guide India Tours',
    published_date DATE,
    image VARCHAR(255),
    category VARCHAR(100),
    tags JSON,
    related_plans JSON,
    related_destinations JSON,
    is_published BOOLEAN DEFAULT TRUE,
    views INT DEFAULT 0,
    meta_title VARCHAR(255),
    meta_description TEXT,
    meta_keywords VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (slug),
    INDEX idx_category (category),
    INDEX idx_published (is_published),
    INDEX idx_published_date (published_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- SEO Settings Table
CREATE TABLE IF NOT EXISTS seo_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    page_path VARCHAR(255) UNIQUE NOT NULL,
    page_type ENUM('home', 'page', 'plan', 'blog', 'destination') NOT NULL,
    title VARCHAR(255),
    description TEXT,
    keywords VARCHAR(500),
    og_title VARCHAR(255),
    og_description TEXT,
    og_image VARCHAR(255),
    canonical_url VARCHAR(255),
    structured_data JSON,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_path (page_path),
    INDEX idx_type (page_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Settings Table
CREATE TABLE IF NOT EXISTS site_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    setting_type VARCHAR(50) DEFAULT 'text',
    description VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default admin user (password: admin123 - CHANGE THIS!)
-- Note: Use setup-admin.php to create admin user with correct password hash
-- Or manually create user with: password_hash('admin123', PASSWORD_DEFAULT)

-- Insert default site settings
INSERT INTO site_settings (setting_key, setting_value, setting_type, description) VALUES
('site_name', 'Guide India Tours', 'text', 'Website Name'),
('site_email', 'info@guideindia.tours', 'email', 'Contact Email'),
('site_phone', '+91 8979810991', 'text', 'Contact Phone'),
('site_address', 'Flate No: 31/84A, Rajpur Jangjeet Nagar, Shamsabad Road, Agra 282001', 'text', 'Business Address'),
('google_analytics', '', 'text', 'Google Analytics ID'),
('facebook_pixel', '', 'text', 'Facebook Pixel ID'),
('maintenance_mode', '0', 'boolean', 'Maintenance Mode')
ON DUPLICATE KEY UPDATE setting_key=setting_key;


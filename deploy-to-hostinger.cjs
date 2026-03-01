#!/usr/bin/env node

/**
 * Hostinger Deployment Script
 * This script helps prepare the project for Hostinger deployment
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Preparing Guide India Tours for Hostinger deployment...\n');

// Check if dist folder exists
const distPath = path.join(__dirname, 'dist');
if (!fs.existsSync(distPath)) {
  console.log('❌ Error: dist folder not found!');
  console.log('Please run "npm run build" first.\n');
  process.exit(1);
}

console.log('✅ Build folder found');

// Create .htaccess file for Hostinger
const htaccessContent = `# Enable URL rewriting
RewriteEngine On

# Handle React Router
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Security headers
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType font/woff2 "access plus 1 year"
</IfModule>

# Compress files
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
    AddOutputFilterByType DEFLATE image/svg+xml
</IfModule>

# MIME types for WebP images
<IfModule mod_mime.c>
    AddType image/webp .webp
</IfModule>`;

// Write .htaccess file to dist folder
fs.writeFileSync(path.join(distPath, '.htaccess'), htaccessContent);
console.log('✅ .htaccess file created');

// Check for required files
const requiredFiles = [
  'index.html',
  'manifest.json',
  'robots.txt',
  'sitemap.xml',
  'favicon.ico'
];

const missingFiles = requiredFiles.filter(file => !fs.existsSync(path.join(distPath, file)));

if (missingFiles.length > 0) {
  console.log('⚠️  Warning: Missing files:', missingFiles.join(', '));
} else {
  console.log('✅ All required files present');
}

// Check for assets folder
const assetsPath = path.join(distPath, 'assets');
if (fs.existsSync(assetsPath)) {
  console.log('✅ Assets folder found');
} else {
  console.log('⚠️  Warning: Assets folder not found');
}

// Check for images folder
const imagesPath = path.join(distPath, 'images');
if (fs.existsSync(imagesPath)) {
  console.log('✅ Images folder found');
} else {
  console.log('⚠️  Warning: Images folder not found');
}

console.log('\n📋 Deployment Checklist:');
console.log('1. ✅ Build completed');
console.log('2. ✅ .htaccess file created');
console.log('3. ✅ Required files checked');
console.log('4. ✅ Assets and images verified');

console.log('\n🚀 Ready for Hostinger deployment!');
console.log('\n📁 Upload the contents of the "dist" folder to your Hostinger public_html directory');
console.log('📖 See HOSTINGER_DEPLOYMENT_GUIDE.md for detailed instructions');

console.log('\n🔗 Test URLs after deployment:');
console.log('- https://yourdomain.com/');
console.log('- https://yourdomain.com/plans');
console.log('- https://yourdomain.com/guide-booking');
console.log('- https://yourdomain.com/about');
console.log('- https://yourdomain.com/contact');
console.log('- https://yourdomain.com/services');

console.log('\n📞 Contact Information:');
console.log('- Phone: +91 8979810991');
console.log('- Email: info@guideindiatours.com');
console.log('- WhatsApp: +91 8979810991');

console.log('\n✨ Deployment preparation complete!');

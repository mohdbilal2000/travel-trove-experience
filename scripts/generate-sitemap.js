
const fs = require('fs');
const path = require('path');

// Import data
// Note: In real environment, these paths might vary. We'll use the ones that work with the script context.
const allPlans = require('../src/data/travelPlans').allPlans;
const blogPosts = require('../src/data/blogPosts').blogPosts;
const destinations = require('../src/data/destinations').destinations;

const baseUrl = 'https://guideindia.tours';
const currentDate = new Date().toISOString().split('T')[0];

// Static routes
const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/services', priority: '0.9', changefreq: 'weekly' },
  { path: '/plans', priority: '0.9', changefreq: 'daily' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
  { path: '/guide-booking', priority: '0.8', changefreq: 'weekly' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly' },
  { path: '/faq', priority: '0.7', changefreq: 'monthly' },
  { path: '/reviews', priority: '0.7', changefreq: 'weekly' },
];

// Dynamic routes - Plan detail pages
const planRoutes = allPlans.map(plan => ({
  path: `/plans/${plan.id}`,
  priority: '0.8',
  changefreq: 'weekly',
  lastmod: currentDate
}));

// Dynamic routes - Blog posts
const blogRoutes = blogPosts.map(post => ({
  path: `/blog/${post.slug}`,
  priority: '0.7',
  changefreq: 'monthly',
  lastmod: post.publishedDate
}));

// City filter routes (AEO Optimized)
const cityRoutes = ["Delhi", "Agra", "Jaipur", "Varanasi", "Udaipur"].map(city => ({
  path: `/plans?city=${city}`,
  priority: '0.8',
  changefreq: 'weekly',
  lastmod: currentDate
}));

// Combined all valid routes
const allRoutes = [
  ...staticRoutes,
  ...planRoutes,
  ...blogRoutes,
  ...cityRoutes
];

const generateSitemap = () => {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

  allRoutes.forEach(route => {
    xml += `  <url>
    <loc>${baseUrl}${route.path.replace('&', '&amp;')}</loc>
    <lastmod>${route.lastmod || currentDate}</lastmod>
    <changefreq>${route.changefreq || 'weekly'}</changefreq>
    <priority>${route.priority || '0.7'}</priority>`;

    // Add image info for plans
    if (route.path.startsWith('/plans/')) {
      const id = parseInt(route.path.split('/')[2]);
      const plan = allPlans.find(p => p.id === id);
      if (plan && plan.image) {
        xml += `
    <image:image>
      <image:loc>${baseUrl}${plan.image}</image:loc>
      <image:title>${plan.title}</image:title>
    </image:image>`;
      }
    }

    // Add image info for blogs
    if (route.path.startsWith('/blog/')) {
      const slug = route.path.split('/')[2];
      const post = blogPosts.find(p => p.slug === slug);
      if (post && post.image) {
        xml += `
    <image:image>
      <image:loc>${baseUrl}${post.image}</image:loc>
      <image:title>${post.title}</image:title>
    </image:image>`;
      }
    }

    xml += `\n  </url>\n`;
  });

  xml += `</urlset>`;
  return xml;
};

const sitemapContent = generateSitemap();
const sitemapPath = path.join(__dirname, '../public/sitemap.xml');

fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
console.log(`✅ Sitemap fixed and generated at ${sitemapPath}`);

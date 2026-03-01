const fs = require('fs');
const path = require('path');

// Check if optimized images directory exists
const optimizedDir = 'public/images/optimized';

if (!fs.existsSync(optimizedDir)) {
  console.log('⚠️  Optimized images directory not found.');
  console.log('📁 Creating optimized directory...');
  
  // Create the directory
  fs.mkdirSync(optimizedDir, { recursive: true });
  
  console.log('✅ Optimized directory created.');
  console.log('🚀 Run "npm run optimize-images" to generate optimized images.');
  console.log('📝 For now, images will use original versions.');
} else {
  console.log('✅ Optimized images directory exists.');
  
  // Check if there are any optimized images
  const files = fs.readdirSync(optimizedDir, { recursive: true });
  const imageFiles = files.filter(file => /\.(avif|webp|jpg)$/i.test(file));
  
  if (imageFiles.length === 0) {
    console.log('⚠️  No optimized images found.');
    console.log('🚀 Run "npm run optimize-images" to generate optimized images.');
  } else {
    console.log(`✅ Found ${imageFiles.length} optimized images.`);
  }
}

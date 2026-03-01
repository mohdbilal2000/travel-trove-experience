const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const inputDir = './public/images';
const outputDir = './public/images/optimized';
const sizes = [400, 600, 800, 1200];
const quality = 85;

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Supported image formats
const supportedFormats = ['.jpg', '.jpeg', '.png', '.webp'];

// Get all image files
function getImageFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...getImageFiles(fullPath));
    } else if (supportedFormats.includes(path.extname(item).toLowerCase())) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Optimize image
async function optimizeImage(inputPath, outputPath, width, height, format, quality) {
  try {
    let pipeline = sharp(inputPath)
      .resize(width, height, {
        fit: 'cover',
        position: 'center'
      })
      .quality(quality);

    if (format === 'avif') {
      pipeline = pipeline.avif();
    } else if (format === 'webp') {
      pipeline = pipeline.webp();
    } else if (format === 'jpg') {
      pipeline = pipeline.jpeg();
    }

    await pipeline.toFile(outputPath);
    console.log(`✓ Generated: ${outputPath}`);
  } catch (error) {
    console.error(`✗ Error processing ${inputPath}:`, error.message);
  }
}

// Main optimization function
async function optimizeImages() {
  console.log('🚀 Starting image optimization...');
  
  const imageFiles = getImageFiles(inputDir);
  console.log(`Found ${imageFiles.length} images to optimize`);
  
  for (const imagePath of imageFiles) {
    const relativePath = path.relative(inputDir, imagePath);
    const nameWithoutExt = path.parse(relativePath).name;
    const ext = path.parse(relativePath).ext;
    
    // Skip if already optimized
    if (relativePath.includes('optimized')) continue;
    
    console.log(`\n📸 Processing: ${relativePath}`);
    
    // Create subdirectory structure
    const outputSubDir = path.dirname(path.join(outputDir, relativePath));
    if (!fs.existsSync(outputSubDir)) {
      fs.mkdirSync(outputSubDir, { recursive: true });
    }
    
    // Generate optimized versions
    for (const size of sizes) {
      for (const format of ['avif', 'webp', 'jpg']) {
        const outputPath = path.join(
          outputSubDir,
          `${nameWithoutExt}-${size}.${format}`
        );
        
        await optimizeImage(imagePath, outputPath, size, null, format, quality);
      }
    }
  }
  
  console.log('\n✅ Image optimization completed!');
  console.log(`📁 Optimized images saved to: ${outputDir}`);
}

// Run optimization
optimizeImages().catch(console.error);
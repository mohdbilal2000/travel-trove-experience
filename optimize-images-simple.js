import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const config = {
  quality: 85,
  sizes: [
    { width: 300, suffix: '-300' },
    { width: 600, suffix: '-600' },
    { width: 900, suffix: '-900' },
    { width: 1200, suffix: '-1200' },
    { width: 1920, suffix: '-1920' }
  ],
  inputDir: path.join(__dirname, 'public/images'),
  outputDir: path.join(__dirname, 'public/images/optimized')
};

// Ensure output directory exists
if (!fs.existsSync(config.outputDir)) {
  fs.mkdirSync(config.outputDir, { recursive: true });
}

// Get all image files recursively
function getImageFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && item !== 'optimized') {
      files.push(...getImageFiles(fullPath));
    } else if (stat.isFile() && /\.(jpg|jpeg|png)$/i.test(item)) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Optimize a single image
async function optimizeImage(inputPath) {
  try {
    const relativePath = path.relative(config.inputDir, inputPath);
    const dir = path.dirname(relativePath);
    const filename = path.basename(inputPath, path.extname(inputPath));
    
    // Create output directory
    const outputDir = path.join(config.outputDir, dir);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    console.log(`Processing: ${relativePath}`);
    
    // Process each size
    for (const size of config.sizes) {
      const outputPath = path.join(outputDir, `${filename}${size.suffix}.webp`);
      
      await sharp(inputPath)
        .resize(size.width, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ quality: config.quality })
        .toFile(outputPath);
      
      console.log(`  → ${size.width}w: ${outputPath}`);
    }
    
    // Also create a high-quality original size version
    const originalOutputPath = path.join(outputDir, `${filename}-original.webp`);
    await sharp(inputPath)
      .webp({ quality: config.quality })
      .toFile(originalOutputPath);
    
    console.log(`  → original: ${originalOutputPath}`);
    
  } catch (error) {
    console.error(`Error processing ${inputPath}:`, error.message);
  }
}

// Main function
async function main() {
  console.log('🚀 Starting image optimization...\n');
  
  const imageFiles = getImageFiles(config.inputDir);
  console.log(`Found ${imageFiles.length} images to process\n`);
  
  for (const imageFile of imageFiles) {
    await optimizeImage(imageFile);
    console.log('');
  }
  
  console.log('✅ Image optimization complete!');
  console.log(`📁 Optimized images saved to: ${config.outputDir}`);
}

// Run the script
main().catch(console.error);

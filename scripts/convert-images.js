const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const IMAGES_DIR = path.join(PROJECT_ROOT, 'public', 'images');
const PORTFOLIO_DIR = path.join(IMAGES_DIR, 'portfolio');
const REVIEWS_DIR = path.join(IMAGES_DIR, 'reviews');

const SPECIFIC_IMAGES = [
  'booth-360.png',
  'branding-photowall.png',
  'high-angle-booth.png',
  'private-booth.png',
  'retro-booth.png'
];

// Ensure sharp is installed
try {
  require.resolve('sharp');
} catch (e) {
  console.log('sharp is not installed. Installing sharp...');
  execSync('npm install -D sharp', { stdio: 'inherit', cwd: PROJECT_ROOT });
}

const sharp = require('sharp');

async function convertToWebp(sourcePath, destPath) {
  const startSize = fs.statSync(sourcePath).size;
  await sharp(sourcePath)
    .webp({ quality: 80 })
    .toFile(destPath);
  
  const endSize = fs.statSync(destPath).size;
  const savings = ((startSize - endSize) / startSize * 100).toFixed(1);
  console.log(`Converted ${path.basename(sourcePath)} -> ${path.basename(destPath)}`);
  console.log(`  Size: ${(startSize/1024/1024).toFixed(2)} MB -> ${(endSize/1024/1024).toFixed(2)} MB (${savings}% savings)`);
}

async function processDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    console.warn(`Directory does not exist: ${dirPath}`);
    return;
  }
  
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
      const sourcePath = path.join(dirPath, file);
      const baseName = path.basename(file, ext);
      const destPath = path.join(dirPath, `${baseName}.webp`);
      
      try {
        await convertToWebp(sourcePath, destPath);
        // Delete original file after successful conversion
        fs.unlinkSync(sourcePath);
        console.log(`  Deleted original: ${file}`);
      } catch (err) {
        console.error(`Error converting ${file}:`, err.message);
      }
    }
  }
}

async function processSpecificImages() {
  for (const imgName of SPECIFIC_IMAGES) {
    const sourcePath = path.join(IMAGES_DIR, imgName);
    if (!fs.existsSync(sourcePath)) {
      console.warn(`Specific image not found: ${sourcePath}`);
      continue;
    }
    
    const ext = path.extname(imgName);
    const baseName = path.basename(imgName, ext);
    const destPath = path.join(IMAGES_DIR, `${baseName}.webp`);
    
    try {
      await convertToWebp(sourcePath, destPath);
      // Delete original file after successful conversion
      fs.unlinkSync(sourcePath);
      console.log(`  Deleted original: ${imgName}`);
    } catch (err) {
      console.error(`Error converting specific image ${imgName}:`, err.message);
    }
  }
}

async function run() {
  console.log('--- Starting Image Conversion & Optimization ---');
  
  console.log('\nProcessing portfolio folder...');
  await processDirectory(PORTFOLIO_DIR);
  
  console.log('\nProcessing reviews folder...');
  await processDirectory(REVIEWS_DIR);
  
  console.log('\nProcessing specific images in images root...');
  await processSpecificImages();
  
  console.log('\n--- Image Conversion & Optimization Completed ---');
}

run().catch(err => {
  console.error('Fatal error in script:', err);
  process.exit(1);
});

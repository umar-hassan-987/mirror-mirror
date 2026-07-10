/**
 * Image Compression Script for Mirror Mirror Website (v2 - fixes EBUSY)
 * 
 * Compresses and resizes all images in public/images/ to optimize for web performance.
 * Uses a temp directory to avoid file lock issues.
 * 
 * Usage: node scripts/compress-images.mjs
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');
const TEMP_DIR = path.join(__dirname, '..', '.img-tmp');

// Config
const MAX_WIDTH = 1920;
const MAX_WIDTH_PORTFOLIO = 1200;
const MAX_WIDTH_THUMBNAIL = 800;
const WEBP_QUALITY = 78;
const SIZE_THRESHOLD = 300 * 1024; // 300 KB

const THUMBNAIL_PATTERNS = ['ahmed', 'sarah', 'leo', 'nadia', 'review-'];
const PORTFOLIO_PATTERNS = ['portfolio-'];

function getMaxWidth(filename) {
  const lower = filename.toLowerCase();
  if (THUMBNAIL_PATTERNS.some(p => lower.includes(p))) return MAX_WIDTH_THUMBNAIL;
  if (PORTFOLIO_PATTERNS.some(p => lower.includes(p))) return MAX_WIDTH_PORTFOLIO;
  return MAX_WIDTH;
}

async function processImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const filename = path.basename(filePath);
  const stats = fs.statSync(filePath);
  const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
  
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) return;
  
  const maxWidth = getMaxWidth(filename);
  
  try {
    // Read file into buffer to avoid file locks
    const inputBuffer = fs.readFileSync(filePath);
    const metadata = await sharp(inputBuffer).metadata();
    const needsResize = metadata.width > maxWidth;
    const needsCompress = stats.size > SIZE_THRESHOLD;
    
    if (!needsResize && !needsCompress) {
      console.log(`  ✓ SKIP ${filename} (${sizeMB} MB, ${metadata.width}x${metadata.height}) - already optimized`);
      return;
    }
    
    let pipeline = sharp(inputBuffer);
    
    if (needsResize) {
      pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
    }
    
    // Write to temp directory
    const tempPath = path.join(TEMP_DIR, filename.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
    const outputBuffer = await pipeline.webp({ quality: WEBP_QUALITY }).toBuffer();
    
    // Only replace if actually smaller (or if converting from jpg/png)
    if (outputBuffer.length < stats.size || ext !== '.webp') {
      const outputPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      fs.writeFileSync(outputPath, outputBuffer);
      
      // Remove original if it was a different format
      if (ext !== '.webp' && outputPath !== filePath) {
        try { fs.unlinkSync(filePath); } catch(e) { /* ignore */ }
      }
      
      const newSizeMB = (outputBuffer.length / (1024 * 1024)).toFixed(2);
      const reduction = ((1 - outputBuffer.length / stats.size) * 100).toFixed(0);
      
      if (ext !== '.webp') {
        console.log(`  ★ CONVERTED ${filename} → ${path.basename(outputPath)} (${sizeMB} MB → ${newSizeMB} MB)`);
      } else {
        console.log(`  ★ COMPRESSED ${filename}: ${sizeMB} MB → ${newSizeMB} MB (${reduction}% reduction)`);
      }
    } else {
      console.log(`  ✓ SKIP ${filename} (${sizeMB} MB) - compression wouldn't help`);
    }
  } catch (err) {
    console.error(`  ✗ ERROR processing ${filename}: ${err.message}`);
  }
}

async function processDirectory(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      console.log(`\n📁 Processing directory: ${entry.name}/`);
      await processDirectory(fullPath);
    } else {
      await processImage(fullPath);
    }
  }
}

function calcTotalSize(dir) {
  let total = 0;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      total += calcTotalSize(fullPath);
    } else if (['.jpg', '.jpeg', '.png', '.webp'].includes(path.extname(entry.name).toLowerCase())) {
      total += fs.statSync(fullPath).size;
    }
  }
  return total;
}

async function main() {
  console.log('🖼️  Mirror Mirror Image Compression Script v2');
  console.log('==============================================\n');
  
  // Create temp directory
  if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR, { recursive: true });
  
  const totalBefore = calcTotalSize(IMAGES_DIR);
  console.log(`📊 Total image size before: ${(totalBefore / (1024 * 1024)).toFixed(2)} MB\n`);
  
  console.log('📁 Processing directory: images/');
  await processDirectory(IMAGES_DIR);
  
  const totalAfter = calcTotalSize(IMAGES_DIR);
  
  console.log(`\n==============================================`);
  console.log(`📊 Total image size after:  ${(totalAfter / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`📉 Total reduction: ${((1 - totalAfter / totalBefore) * 100).toFixed(1)}%`);
  console.log(`💾 Space saved: ${((totalBefore - totalAfter) / (1024 * 1024)).toFixed(2)} MB`);
  
  // Clean up temp directory
  try { fs.rmSync(TEMP_DIR, { recursive: true }); } catch(e) { /* ignore */ }
}

main().catch(console.error);

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(__dirname, '..', 'assets', 'img', 'locations');

async function fixOrientation(filePath) {
  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();

    // Only process if image has EXIF orientation that needs fixing
    if (metadata.orientation && metadata.orientation !== 1) {
      console.log(`Fixing orientation: ${path.basename(filePath)} (orientation: ${metadata.orientation})`);

      // Read, rotate based on EXIF, and overwrite
      await sharp(filePath)
        .rotate() // Auto-rotates based on EXIF orientation
        .toBuffer()
        .then(buffer => fs.writeFileSync(filePath, buffer));
    }
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err.message);
  }
}

async function processDirectory(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`Directory not found: ${dir}`);
    return;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (/\.(jpg|jpeg|png|webp)$/i.test(entry.name)) {
      await fixOrientation(fullPath);
    }
  }
}

async function main() {
  console.log('Fixing image orientations...');
  await processDirectory(ASSETS_DIR);
  console.log('Done!');
}

main().catch(console.error);

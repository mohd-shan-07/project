const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, 'public', 'posters');
const outputDir = path.join(inputDir, 'optimized');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function optimizeImages() {
  // Process all 47 posters
  const files = fs.readdirSync(inputDir).filter(f => f.match(/^poster-([0-9]{2})\.(jpg|png)$/));
  
  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const baseName = path.parse(file).name;
    const outputPath = path.join(outputDir, `${baseName}.webp`);
    
    console.log(`Optimizing ${file}...`);
    await sharp(inputPath)
      .resize(800, null, { withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(outputPath);
    console.log(`Saved ${baseName}.webp`);
  }
}

optimizeImages().catch(console.error);

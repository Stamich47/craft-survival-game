const sharp = require("sharp");
const path = require("path");
const fs = require("fs").promises;

async function resizeWeaponSprites() {
  const weaponsDir = path.join(__dirname, "..", "src", "assets", "weapons");
  const outputDir = path.join(
    __dirname,
    "..",
    "src",
    "assets",
    "weapons-resized"
  );

  try {
    // Create output directory
    await fs.mkdir(outputDir, { recursive: true });

    // Get list of all weapon files
    const files = await fs.readdir(weaponsDir);
    const weaponFiles = files.filter((file) => file.endsWith(".png"));

    console.log("=== RESIZING WEAPON SPRITES ===");
    console.log(`Found ${weaponFiles.length} weapon sprites to resize`);

    let resizedCount = 0;

    for (const filename of weaponFiles) {
      const inputPath = path.join(weaponsDir, filename);
      const outputPath = path.join(outputDir, filename);

      // Determine target size based on weapon type
      let targetSize;
      if (filename.includes("large")) {
        targetSize = 64; // Large weapons to 64x64
      } else {
        targetSize = 48; // Small weapons to 48x48
      }

      await sharp(inputPath)
        .resize(targetSize, targetSize, {
          fit: "contain",
          background: { r: 0, g: 0, b: 0, alpha: 0 }, // Transparent background
        })
        .png()
        .toFile(outputPath);

      resizedCount++;
      console.log(`Resized: ${filename} -> ${targetSize}x${targetSize}`);
    }

    console.log(`\n✅ Successfully resized ${resizedCount} weapon sprites!`);
    console.log(`📁 Resized sprites saved to: ${outputDir}`);
    console.log("\n📝 Summary:");
    console.log(`- Large weapons: resized to 64x64 pixels`);
    console.log(`- Small weapons: resized to 48x48 pixels`);
    console.log("- Maintained aspect ratio with transparent backgrounds");
    console.log("- Ready for use in React Native game!");

    // Create a viewer for the resized weapons
    await createResizedWeaponViewer(outputDir);
  } catch (error) {
    console.error("❌ Error resizing sprites:", error.message);
  }
}

async function createResizedWeaponViewer(spritesDir) {
  const viewerPath = path.join(__dirname, "..", "weapon-viewer-resized.html");

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resized Weapons Viewer</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; background: #2a2a2a; color: white; }
        h1, h2 { color: #4CAF50; }
        .section { margin-bottom: 40px; }
        .sprite-grid { display: flex; flex-wrap: wrap; gap: 10px; margin: 20px 0; }
        .sprite-item { 
            border: 2px solid #555; 
            padding: 10px; 
            text-align: center; 
            background: #3a3a3a;
            border-radius: 8px;
            min-width: 80px;
        }
        .sprite-item:hover { border-color: #4CAF50; background: #4a4a4a; }
        .sprite-image { 
            image-rendering: pixelated; 
            border: 1px solid #666;
            background: #fff;
            padding: 2px;
        }
        .sprite-info { margin-top: 5px; font-size: 11px; color: #bbb; }
    </style>
</head>
<body>
    <h1>⚔️ Resized Weapons Sprites</h1>
    <p>Ready for React Native game use!</p>
    
    <div class="section">
        <h2>Large Weapons (64×64)</h2>
        <div class="sprite-grid">`;

  // Add large weapons
  for (let i = 0; i < 20; i++) {
    const fileName = `weapon_large_${i.toString().padStart(3, "0")}.png`;
    html += `
            <div class="sprite-item">
                <img src="src/assets/weapons-resized/${fileName}" alt="Large Weapon ${i}" class="sprite-image" width="64" height="64">
                <div class="sprite-info">Large #${i}</div>
            </div>`;
  }

  html += `
        </div>
    </div>
    
    <div class="section">
        <h2>Small Weapons (48×48)</h2>
        <div class="sprite-grid">`;

  // Add small weapons
  for (let i = 0; i < 30; i++) {
    const fileName = `weapon_small_${i.toString().padStart(3, "0")}.png`;
    html += `
            <div class="sprite-item">
                <img src="src/assets/weapons-resized/${fileName}" alt="Small Weapon ${i}" class="sprite-image" width="48" height="48">
                <div class="sprite-info">Small #${i}</div>
            </div>`;
  }

  html += `
        </div>
    </div>
</body>
</html>`;

  await fs.writeFile(viewerPath, html);
  console.log(`✅ Created weapon-viewer-resized.html`);
}

resizeWeaponSprites();

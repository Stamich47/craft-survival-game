const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

async function extractWeaponsPrecise() {
  const inputPath = path.join(__dirname, "..", "src", "assets", "weapons.png");
  const outputDir = path.join(__dirname, "..", "src", "assets", "weapons");

  try {
    // Create output directory
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    console.log("=== EXTRACTING WEAPONS WITH PRECISE COORDINATES ===");

    // Weapon extraction coordinates (in pixels, 8px per transparency block)
    const BLOCK_SIZE = 8;
    const START_X = 11 * BLOCK_SIZE; // 88 pixels from left
    const WEAPON_SIZE = 4 * BLOCK_SIZE; // 32x32 pixels each weapon
    const WEAPONS_PER_ROW = 5;

    // Row starting positions (in transparency blocks from top)
    const ROW_POSITIONS = [9, 15, 21, 27]; // blocks from top

    console.log(`Starting position: ${START_X}px from left (${11} blocks)`);
    console.log(`Weapon size: ${WEAPON_SIZE}x${WEAPON_SIZE}px (4x4 blocks)`);
    console.log(
      `Row positions: ${ROW_POSITIONS.map((r) => r * BLOCK_SIZE + "px").join(
        ", "
      )}`
    );
    console.log("");

    let weaponIndex = 0;

    for (let row = 0; row < ROW_POSITIONS.length; row++) {
      const startY = ROW_POSITIONS[row] * BLOCK_SIZE;

      console.log(
        `Row ${row + 1}: Y position ${startY}px (${
          ROW_POSITIONS[row]
        } blocks from top)`
      );

      for (let col = 0; col < WEAPONS_PER_ROW; col++) {
        const x = START_X + col * WEAPON_SIZE;
        const y = startY;

        const outputFilename = `weapon_${weaponIndex
          .toString()
          .padStart(3, "0")}.png`;
        const outputPath = path.join(outputDir, outputFilename);

        await sharp(inputPath)
          .extract({
            left: x,
            top: y,
            width: WEAPON_SIZE,
            height: WEAPON_SIZE,
          })
          .png()
          .toFile(outputPath);

        console.log(
          `  ✅ ${outputFilename} at (${x}, ${y}) - ${WEAPON_SIZE}x${WEAPON_SIZE}px`
        );
        weaponIndex++;
      }
      console.log("");
    }

    console.log(`🎉 Successfully extracted ${weaponIndex} weapons!`);
    console.log(`📁 Weapons saved to: ${outputDir}`);

    // Create a viewer
    await createWeaponViewer(weaponIndex);
  } catch (error) {
    console.error("❌ Error extracting weapons:", error);
  }
}

async function createWeaponViewer(totalWeapons) {
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Extracted Large Weapons</title>
    <style>
        body { 
            background: #2a2a2a; 
            color: white; 
            font-family: Arial, sans-serif; 
            padding: 20px; 
            margin: 0;
        }
        h1 { color: #4CAF50; }
        .info {
            background: #1a1a1a;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        .weapon-grid { 
            display: grid; 
            grid-template-columns: repeat(5, 1fr); 
            gap: 15px; 
            max-width: 1000px; 
            margin: 0 auto;
        }
        .weapon-item { 
            text-align: center; 
            background: #1a1a1a; 
            padding: 15px; 
            border-radius: 8px; 
            border: 2px solid #444; 
            transition: border-color 0.2s;
        }
        .weapon-item:hover {
            border-color: #4CAF50;
        }
        .weapon-image { 
            width: 64px; 
            height: 64px; 
            image-rendering: pixelated; 
            background: #333; 
            margin: 0 auto 10px; 
            display: block; 
            border: 1px solid #555;
            border-radius: 4px;
        }
        .weapon-info { 
            font-size: 12px; 
            color: #ccc; 
        }
        .weapon-name {
            font-size: 14px;
            font-weight: bold;
            color: #4CAF50;
            margin-bottom: 5px;
        }
        .row-label {
            grid-column: 1 / -1;
            text-align: center;
            font-size: 18px;
            font-weight: bold;
            color: #4CAF50;
            margin: 20px 0 10px 0;
            padding: 10px;
            background: #333;
            border-radius: 6px;
        }
    </style>
</head>
<body>
    <h1>🗡️ Extracted Large Weapons</h1>
    
    <div class="info">
        <strong>Extraction Details:</strong><br>
        • Total weapons: <strong>${totalWeapons}</strong><br>
        • Size: <strong>32×32 pixels</strong> each (4×4 transparency blocks)<br>
        • Position: <strong>11 blocks from left</strong>, rows at 9, 15, 21, 27 blocks from top<br>
        • Layout: <strong>4 rows × 5 weapons</strong> each
    </div>
    
    <div class="weapon-grid">`;

  // Add weapons with row labels
  for (let row = 0; row < 4; row++) {
    htmlContent += `<div class="row-label">Row ${row + 1}</div>`;

    for (let col = 0; col < 5; col++) {
      const weaponIndex = row * 5 + col;
      htmlContent += `
        <div class="weapon-item">
            <div class="weapon-name">Weapon ${weaponIndex}</div>
            <img src="src/assets/weapons/weapon_${weaponIndex
              .toString()
              .padStart(3, "0")}.png" 
                 alt="Weapon ${weaponIndex}" 
                 class="weapon-image">
            <div class="weapon-info">
                32×32px<br>
                Row ${row + 1}, Col ${col + 1}
            </div>
        </div>`;
    }
  }

  htmlContent += `
    </div>
    
    <div style="margin-top: 30px; text-align: center; color: #888;">
        <p>Ready for integration into React Native game! 🎮</p>
    </div>
</body>
</html>`;

  fs.writeFileSync(
    path.join(__dirname, "..", "weapon-viewer-precise.html"),
    htmlContent
  );
  console.log("📄 Created weapon-viewer-precise.html");
}

// Run the extraction
extractWeaponsPrecise();

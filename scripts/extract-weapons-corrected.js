const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

async function extractAllWeapons() {
  const inputPath = "src/assets/weapons.png";
  const outputDir = "src/assets/weapons";

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log("🗡️ Extracting all 20 weapons with corrected coordinates...");

  // Corrected starting position (first weapon):
  // - 10 transparency blocks from left = 10 * 8 = 80 pixels
  // - 8 transparency blocks from top = 8 * 8 = 64 pixels
  // - Each weapon is 4x4 transparency blocks = 32x32 pixels
  // - 5 weapons across, with spacing between them
  // - 6 transparency blocks down between rows

  const startLeft = 10 * 8; // 80 pixels
  const startTop = 8 * 8; // 64 pixels
  const weaponSize = 4 * 8; // 32 pixels (4 blocks)
  const weaponSpacing = 5 * 8; // 40 pixels (5 blocks spacing between weapons)
  const rowOffset = 6 * 8; // 48 pixels (6 blocks down between rows)

  let weaponCount = 0;

  // Extract 4 rows of 5 weapons each
  for (let row = 0; row < 4; row++) {
    console.log(`\n📍 Extracting Row ${row + 1}:`);

    for (let col = 0; col < 5; col++) {
      const left = startLeft + col * weaponSpacing;
      const top = startTop + row * rowOffset;

      console.log(
        `  Weapon ${weaponCount}: (${left}px, ${top}px) - ${left / 8} blocks, ${
          top / 8
        } blocks`
      );

      try {
        await sharp(inputPath)
          .extract({
            left: left,
            top: top,
            width: weaponSize,
            height: weaponSize,
          })
          .png()
          .toFile(
            path.join(
              outputDir,
              `weapon_${String(weaponCount).padStart(3, "0")}.png`
            )
          );

        weaponCount++;
      } catch (error) {
        console.error(
          `❌ Error extracting weapon ${weaponCount}:`,
          error.message
        );
      }
    }
  }

  console.log(`\n✅ Successfully extracted ${weaponCount} weapons!`);
  console.log("📁 Files saved in: src/assets/weapons/");

  // Create updated viewer
  await createWeaponViewer(weaponCount);
}

async function createWeaponViewer(totalWeapons) {
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Corrected Weapon Extraction</title>
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
            font-family: monospace;
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
    <h1>🗡️ Corrected Weapon Extraction</h1>
    
    <div class="info">
        <strong>Corrected Extraction Details:</strong><br>
        • Starting position: <strong>10 blocks left, 8 blocks top</strong> (80px, 64px)<br>
        • Weapon size: <strong>4×4 blocks</strong> (32×32 pixels)<br>
        • Horizontal spacing: <strong>5 blocks</strong> (40 pixels)<br>
        • Row offset: <strong>6 blocks down</strong> (48 pixels)<br>
        • Total weapons: <strong>${totalWeapons}</strong>
    </div>
    
    <div class="weapon-grid">`;

  let htmlWeapons = "";
  let weaponIndex = 0;

  for (let row = 0; row < 4; row++) {
    htmlWeapons += `        <div class="row-label">Row ${row + 1}</div>\n`;

    for (let col = 0; col < 5; col++) {
      htmlWeapons += `        <div class="weapon-item">
            <div class="weapon-name">Weapon ${weaponIndex}</div>
            <img src="src/assets/weapons/weapon_${String(weaponIndex).padStart(
              3,
              "0"
            )}.png" alt="Weapon ${weaponIndex}" class="weapon-image">
            <div class="weapon-info">32×32px<br>Row ${row + 1}, Col ${
        col + 1
      }</div>
        </div>\n`;
      weaponIndex++;
    }
  }

  const htmlFooter = `    </div>
    
    <div style="margin-top: 30px; text-align: center; color: #888;">
        <p>Perfect alignment achieved! Ready for game integration! 🎮</p>
    </div>
</body>
</html>`;

  fs.writeFileSync(
    "weapon-viewer-corrected.html",
    htmlContent + htmlWeapons + htmlFooter
  );
  console.log("📄 Created weapon-viewer-corrected.html");
}

extractAllWeapons();

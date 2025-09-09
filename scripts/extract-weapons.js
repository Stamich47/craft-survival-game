const sharp = require("sharp");
const path = require("path");
const fs = require("fs").promises;

async function extractWeaponsSprites() {
  const inputPath = path.join(__dirname, "..", "src", "assets", "weapons.png");
  const outputDir = path.join(__dirname, "..", "src", "assets", "weapons");

  try {
    // Create output directory
    await fs.mkdir(outputDir, { recursive: true });

    // Get image metadata to verify dimensions
    const metadata = await sharp(inputPath).metadata();
    console.log("=== WEAPONS SPRITE EXTRACTION ===");
    console.log(`Image dimensions: ${metadata.width} x ${metadata.height}`);

    // Define the two sections
    const sections = {
      large: {
        cols: 5,
        rows: 4,
        startY: 0,
        // We'll calculate height dynamically
      },
      small: {
        cols: 6,
        rows: 5,
        // startY will be calculated after large section
      },
    };

    // Calculate sprite dimensions
    const totalWidth = metadata.width;
    const totalHeight = metadata.height;

    // Assume roughly equal height for both sections
    const sectionHeight = Math.floor(totalHeight / 2);

    // Large weapons section (top half)
    const largeWidth = Math.floor(totalWidth / sections.large.cols);
    const largeHeight = Math.floor(sectionHeight / sections.large.rows);

    // Small weapons section (bottom half)
    const smallWidth = Math.floor(totalWidth / sections.small.cols);
    const smallHeight = Math.floor(sectionHeight / sections.small.rows);

    console.log(`Large weapons: ${largeWidth}x${largeHeight} pixels each`);
    console.log(`Small weapons: ${smallWidth}x${smallHeight} pixels each`);
    console.log("");

    let totalExtracted = 0;

    // Extract large weapons (top section)
    console.log("Extracting large weapons...");
    for (let row = 0; row < sections.large.rows; row++) {
      for (let col = 0; col < sections.large.cols; col++) {
        const x = col * largeWidth;
        const y = row * largeHeight;
        const spriteNumber = row * sections.large.cols + col;
        const fileName = `weapon_large_${spriteNumber
          .toString()
          .padStart(3, "0")}.png`;

        await sharp(inputPath)
          .extract({
            left: x,
            top: y,
            width: largeWidth,
            height: largeHeight,
          })
          .png()
          .toFile(path.join(outputDir, fileName));

        totalExtracted++;
        console.log(
          `Extracted: ${fileName} (${x},${y} -> ${largeWidth}x${largeHeight})`
        );
      }
    }

    // Extract small weapons (bottom section)
    console.log("\nExtracting small weapons...");
    const smallSectionStartY = sectionHeight;

    for (let row = 0; row < sections.small.rows; row++) {
      for (let col = 0; col < sections.small.cols; col++) {
        const x = col * smallWidth;
        const y = smallSectionStartY + row * smallHeight;
        const spriteNumber = row * sections.small.cols + col;
        const fileName = `weapon_small_${spriteNumber
          .toString()
          .padStart(3, "0")}.png`;

        await sharp(inputPath)
          .extract({
            left: x,
            top: y,
            width: smallWidth,
            height: smallHeight,
          })
          .png()
          .toFile(path.join(outputDir, fileName));

        totalExtracted++;
        console.log(
          `Extracted: ${fileName} (${x},${y} -> ${smallWidth}x${smallHeight})`
        );
      }
    }

    console.log(
      `\n✅ Successfully extracted ${totalExtracted} weapon sprites!`
    );
    console.log(`📁 Sprites saved to: ${outputDir}`);

    // Create a quick viewer HTML for the weapons
    console.log("\n🔧 Creating weapon viewer...");
    await createWeaponViewer(
      outputDir,
      sections.large.rows * sections.large.cols,
      sections.small.rows * sections.small.cols
    );
  } catch (error) {
    console.error("❌ Error extracting sprites:", error.message);
  }
}

async function createWeaponViewer(spritesDir, largeCount, smallCount) {
  const viewerPath = path.join(__dirname, "..", "weapon-viewer.html");

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weapons Sprite Viewer</title>
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
            min-width: 100px;
        }
        .sprite-item:hover { border-color: #4CAF50; background: #4a4a4a; }
        .sprite-image { 
            image-rendering: pixelated; 
            border: 1px solid #666;
            background: #fff;
            padding: 5px;
        }
        .large-weapon img { width: 65px; height: 58px; }
        .small-weapon img { width: 54px; height: 46px; }
        .sprite-info { margin-top: 5px; font-size: 12px; color: #bbb; }
    </style>
</head>
<body>
    <h1>🗡️ Weapons Sprite Sheet Viewer</h1>
    <p>Extracted from weapons.png (325x463)</p>
    
    <div class="section">
        <h2>Large Weapons (5×4 grid = ${largeCount} weapons)</h2>
        <div class="sprite-grid">`;

  // Add large weapons
  for (let i = 0; i < largeCount; i++) {
    const fileName = `weapon_large_${i.toString().padStart(3, "0")}.png`;
    const row = Math.floor(i / 5);
    const col = i % 5;
    html += `
            <div class="sprite-item large-weapon">
                <img src="src/assets/weapons/${fileName}" alt="Large Weapon ${i}" class="sprite-image">
                <div class="sprite-info">Large #${i}<br>Row ${row}, Col ${col}</div>
            </div>`;
  }

  html += `
        </div>
    </div>
    
    <div class="section">
        <h2>Small Weapons (6×5 grid = ${smallCount} weapons)</h2>
        <div class="sprite-grid">`;

  // Add small weapons
  for (let i = 0; i < smallCount; i++) {
    const fileName = `weapon_small_${i.toString().padStart(3, "0")}.png`;
    const row = Math.floor(i / 6);
    const col = i % 6;
    html += `
            <div class="sprite-item small-weapon">
                <img src="src/assets/weapons/${fileName}" alt="Small Weapon ${i}" class="sprite-image">
                <div class="sprite-info">Small #${i}<br>Row ${row}, Col ${col}</div>
            </div>`;
  }

  html += `
        </div>
    </div>
    
    <script>
        console.log('Weapons sprite viewer loaded');
        console.log('Large weapons: ${largeCount}');
        console.log('Small weapons: ${smallCount}');
        console.log('Total weapons: ${largeCount + smallCount}');
    </script>
</body>
</html>`;

  await fs.writeFile(viewerPath, html);
  console.log(`✅ Created weapon-viewer.html`);
}

extractWeaponsSprites();

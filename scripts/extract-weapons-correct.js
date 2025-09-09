const sharp = require("sharp");
const path = require("path");
const fs = require("fs").promises;

async function extractWeaponsCorrectSize() {
  const inputPath = path.join(__dirname, "..", "src", "assets", "weapons.png");
  const outputDir = path.join(__dirname, "..", "src", "assets", "weapons");

  try {
    // Create output directory
    await fs.mkdir(outputDir, { recursive: true });

    console.log("=== EXTRACTING WEAPONS (325x463) ===");

    // Hard-coded dimensions for the correct sprite sheet
    const SHEET_WIDTH = 325;
    const SHEET_HEIGHT = 463;

    // Top section: Large weapons (5 cols × 4 rows)
    const LARGE_COLS = 5;
    const LARGE_ROWS = 4;
    const LARGE_WIDTH = Math.floor(SHEET_WIDTH / LARGE_COLS); // 65px
    const LARGE_HEIGHT = Math.floor(SHEET_HEIGHT / 2 / LARGE_ROWS); // ~57px

    // Bottom section: Small weapons (6 cols × 5 rows)
    const SMALL_COLS = 6;
    const SMALL_ROWS = 5;
    const SMALL_WIDTH = Math.floor(SHEET_WIDTH / SMALL_COLS); // 54px
    const SMALL_HEIGHT = Math.floor(SHEET_HEIGHT / 2 / SMALL_ROWS); // ~46px

    const SECTION_SPLIT = Math.floor(SHEET_HEIGHT / 2); // 231px

    console.log(`Sheet dimensions: ${SHEET_WIDTH}x${SHEET_HEIGHT}`);
    console.log(
      `Large weapons: ${LARGE_WIDTH}x${LARGE_HEIGHT} (${LARGE_COLS}x${LARGE_ROWS} = ${
        LARGE_COLS * LARGE_ROWS
      })`
    );
    console.log(
      `Small weapons: ${SMALL_WIDTH}x${SMALL_HEIGHT} (${SMALL_COLS}x${SMALL_ROWS} = ${
        SMALL_COLS * SMALL_ROWS
      })`
    );
    console.log(`Section split at: ${SECTION_SPLIT}px\n`);

    let totalExtracted = 0;

    // Extract large weapons (top section)
    console.log("Extracting large weapons...");
    for (let row = 0; row < LARGE_ROWS; row++) {
      for (let col = 0; col < LARGE_COLS; col++) {
        const x = col * LARGE_WIDTH;
        const y = row * LARGE_HEIGHT;
        const spriteNumber = row * LARGE_COLS + col;
        const fileName = `weapon_large_${spriteNumber
          .toString()
          .padStart(3, "0")}.png`;

        await sharp(inputPath)
          .extract({
            left: x,
            top: y,
            width: LARGE_WIDTH,
            height: LARGE_HEIGHT,
          })
          .png()
          .toFile(path.join(outputDir, fileName));

        totalExtracted++;
        console.log(`  ${fileName} (${x},${y}) ${LARGE_WIDTH}x${LARGE_HEIGHT}`);
      }
    }

    // Extract small weapons (bottom section)
    console.log("\nExtracting small weapons...");
    for (let row = 0; row < SMALL_ROWS; row++) {
      for (let col = 0; col < SMALL_COLS; col++) {
        const x = col * SMALL_WIDTH;
        const y = SECTION_SPLIT + row * SMALL_HEIGHT;
        const spriteNumber = row * SMALL_COLS + col;
        const fileName = `weapon_small_${spriteNumber
          .toString()
          .padStart(3, "0")}.png`;

        await sharp(inputPath)
          .extract({
            left: x,
            top: y,
            width: SMALL_WIDTH,
            height: SMALL_HEIGHT,
          })
          .png()
          .toFile(path.join(outputDir, fileName));

        totalExtracted++;
        console.log(`  ${fileName} (${x},${y}) ${SMALL_WIDTH}x${SMALL_HEIGHT}`);
      }
    }

    console.log(
      `\n✅ Successfully extracted ${totalExtracted} weapon sprites!`
    );
    console.log(`📁 Sprites saved to: ${outputDir}`);

    // Create weapon viewer
    await createWeaponViewer();

    return {
      totalExtracted,
      largeCount: LARGE_COLS * LARGE_ROWS,
      smallCount: SMALL_COLS * SMALL_ROWS,
    };
  } catch (error) {
    console.error("❌ Error extracting sprites:", error.message);
    throw error;
  }
}

async function createWeaponViewer() {
  const viewerPath = path.join(__dirname, "..", "weapon-viewer.html");

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weapons Sprite Viewer (325x463)</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; background: #2a2a2a; color: white; }
        h1, h2 { color: #4CAF50; }
        .section { margin-bottom: 40px; }
        .sprite-grid { display: flex; flex-wrap: wrap; gap: 8px; margin: 20px 0; }
        .sprite-item { 
            border: 2px solid #555; 
            padding: 8px; 
            text-align: center; 
            background: #3a3a3a;
            border-radius: 6px;
            min-width: 80px;
        }
        .sprite-item:hover { border-color: #4CAF50; background: #4a4a4a; cursor: pointer; }
        .sprite-image { 
            image-rendering: pixelated; 
            border: 1px solid #666;
            background: #fff;
            padding: 3px;
            border-radius: 3px;
        }
        .sprite-info { margin-top: 5px; font-size: 11px; color: #bbb; }
        .large-weapon img { max-width: 65px; max-height: 57px; }
        .small-weapon img { max-width: 54px; max-height: 46px; }
    </style>
</head>
<body>
    <h1>⚔️ Weapons Sprite Viewer</h1>
    <p>Extracted from weapons.png (325×463)</p>
    
    <div class="section">
        <h2>Large Weapons (5×4 grid = 20 weapons)</h2>
        <p>Each sprite: ~65×57 pixels</p>
        <div class="sprite-grid">`;

  // Add large weapons
  for (let i = 0; i < 20; i++) {
    const fileName = `weapon_large_${i.toString().padStart(3, "0")}.png`;
    const row = Math.floor(i / 5);
    const col = i % 5;
    html += `
            <div class="sprite-item large-weapon">
                <img src="src/assets/weapons/${fileName}" alt="Large Weapon ${i}" class="sprite-image">
                <div class="sprite-info">L${i} (${row},${col})</div>
            </div>`;
  }

  html += `
        </div>
    </div>
    
    <div class="section">
        <h2>Small Weapons (6×5 grid = 30 weapons)</h2>
        <p>Each sprite: ~54×46 pixels</p>
        <div class="sprite-grid">`;

  // Add small weapons
  for (let i = 0; i < 30; i++) {
    const fileName = `weapon_small_${i.toString().padStart(3, "0")}.png`;
    const row = Math.floor(i / 6);
    const col = i % 6;
    html += `
            <div class="sprite-item small-weapon">
                <img src="src/assets/weapons/${fileName}" alt="Small Weapon ${i}" class="sprite-image">
                <div class="sprite-info">S${i} (${row},${col})</div>
            </div>`;
  }

  html += `
        </div>
    </div>
    
    <p><strong>Total: 50 weapon sprites ready for your game!</strong></p>
</body>
</html>`;

  await fs.writeFile(viewerPath, html);
  console.log(`✅ Created weapon-viewer.html`);
}

// Run the extraction
extractWeaponsCorrectSize()
  .then((result) => {
    console.log(`\n🎉 EXTRACTION COMPLETE!`);
    console.log(`🗡️  Large weapons: ${result.largeCount}`);
    console.log(`🔪  Small weapons: ${result.smallCount}`);
    console.log(`⚔️  Total weapons: ${result.totalExtracted}`);
    console.log(`\n📱 These sprites are ready for React Native!`);
    console.log(`💡 Next: Add them to your weapons mapping!`);
  })
  .catch((error) => {
    console.error("Failed to extract weapons:", error.message);
  });

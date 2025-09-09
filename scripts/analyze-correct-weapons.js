const sharp = require("sharp");
const path = require("path");

async function analyzeCorrectWeaponsSheet() {
  const inputPath = path.join(__dirname, "..", "src", "assets", "weapons.png");

  try {
    // Get image metadata
    const metadata = await sharp(inputPath).metadata();
    console.log("=== WEAPONS SPRITE SHEET ANALYSIS (CORRECTED) ===");
    console.log(`Actual dimensions: ${metadata.width} x ${metadata.height}`);
    console.log(`Format: ${metadata.format}`);
    console.log(`Channels: ${metadata.channels}`);

    // Now let's calculate realistic grid layouts for 325x463
    console.log("\n=== POSSIBLE GRID LAYOUTS FOR 325x463 ===");

    // Common sprite sizes to test
    const commonSizes = [16, 20, 24, 25, 32, 40, 48, 50, 64, 65];

    for (const size of commonSizes) {
      const cols = Math.floor(325 / size);
      const rows = Math.floor(463 / size);
      const totalSprites = cols * rows;
      const widthRemainder = 325 % size;
      const heightRemainder = 463 % size;

      console.log(
        `${size}x${size} sprites: ${cols} cols x ${rows} rows = ${totalSprites} sprites`
      );
      console.log(
        `  Remainder: ${widthRemainder}px width, ${heightRemainder}px height`
      );

      // If remainders are small, this might be the right size
      if (widthRemainder < size / 3 && heightRemainder < size / 3) {
        console.log(`  ⭐ LIKELY CANDIDATE - small remainders!`);
      }
      console.log("");
    }

    // Check some rectangular sprite possibilities too
    console.log("=== RECTANGULAR SPRITE POSSIBILITIES ===");
    const rectSizes = [
      { w: 25, h: 30 },
      { w: 32, h: 40 },
      { w: 40, h: 50 },
      { w: 50, h: 60 },
    ];

    for (const rect of rectSizes) {
      const cols = Math.floor(325 / rect.w);
      const rows = Math.floor(463 / rect.h);
      const totalSprites = cols * rows;
      const widthRemainder = 325 % rect.w;
      const heightRemainder = 463 % rect.h;

      console.log(
        `${rect.w}x${rect.h} sprites: ${cols} cols x ${rows} rows = ${totalSprites} sprites`
      );
      console.log(
        `  Remainder: ${widthRemainder}px width, ${heightRemainder}px height`
      );

      if (widthRemainder < rect.w / 3 && heightRemainder < rect.h / 3) {
        console.log(`  ⭐ POSSIBLE MATCH!`);
      }
      console.log("");
    }

    // Create a full sample this time since it's a reasonable size
    console.log("=== CREATING SAMPLE IMAGE ===");
    await sharp(inputPath)
      .png()
      .toFile(path.join(__dirname, "..", "weapons-sample-correct.png"));

    console.log(
      "✅ Created weapons-sample-correct.png (full image) for examination"
    );
  } catch (error) {
    console.error("Error analyzing sprite sheet:", error.message);
    console.log("\nTrying to read file info differently...");

    // Try a different approach
    try {
      const fs = require("fs");
      const stats = fs.statSync(inputPath);
      console.log(`File size: ${stats.size} bytes`);
      console.log("File exists and is readable");
    } catch (fsError) {
      console.error("File system error:", fsError.message);
    }
  }
}

analyzeCorrectWeaponsSheet();

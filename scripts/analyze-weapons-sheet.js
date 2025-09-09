const sharp = require("sharp");
const path = require("path");

async function analyzeWeaponsSheet() {
  const inputPath = path.join(__dirname, "..", "src", "assets", "weapons.png");

  try {
    // Get image metadata
    const metadata = await sharp(inputPath).metadata();
    console.log("=== WEAPONS SPRITE SHEET ANALYSIS ===");
    console.log(`Dimensions: ${metadata.width} x ${metadata.height}`);
    console.log(`Format: ${metadata.format}`);
    console.log(`Channels: ${metadata.channels}`);

    // Calculate possible grid layouts
    console.log("\n=== POSSIBLE GRID LAYOUTS ===");

    // Common sprite sizes to test
    const commonSizes = [16, 24, 32, 48, 64];

    for (const size of commonSizes) {
      const cols = Math.floor(metadata.width / size);
      const rows = Math.floor(metadata.height / size);
      const totalSprites = cols * rows;
      const widthRemainder = metadata.width % size;
      const heightRemainder = metadata.height % size;

      console.log(
        `${size}x${size} sprites: ${cols} cols x ${rows} rows = ${totalSprites} sprites`
      );
      console.log(
        `  Remainder: ${widthRemainder}px width, ${heightRemainder}px height`
      );

      // If remainders are small, this might be the right size
      if (widthRemainder < size / 4 && heightRemainder < size / 4) {
        console.log(`  ⭐ LIKELY CANDIDATE - small remainders!`);
      }
      console.log("");
    }

    // Also check if it's a custom layout
    console.log("=== CUSTOM LAYOUT POSSIBILITIES ===");

    // Check some other common ratios
    const customLayouts = [
      { w: 25, h: 25 }, // Small weapons
      { w: 30, h: 30 }, // Medium weapons
      { w: 40, h: 40 }, // Larger weapons
      { w: 65, h: 65 }, // Very large weapons
    ];

    for (const layout of customLayouts) {
      const cols = Math.floor(metadata.width / layout.w);
      const rows = Math.floor(metadata.height / layout.h);
      const totalSprites = cols * rows;
      const widthRemainder = metadata.width % layout.w;
      const heightRemainder = metadata.height % layout.h;

      console.log(
        `${layout.w}x${layout.h} sprites: ${cols} cols x ${rows} rows = ${totalSprites} sprites`
      );
      console.log(
        `  Remainder: ${widthRemainder}px width, ${heightRemainder}px height`
      );

      if (widthRemainder < layout.w / 4 && heightRemainder < layout.h / 4) {
        console.log(`  ⭐ POSSIBLE MATCH - small remainders!`);
      }
      console.log("");
    }
  } catch (error) {
    console.error("Error analyzing sprite sheet:", error.message);
  }
}

analyzeWeaponsSheet();

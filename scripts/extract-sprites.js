const fs = require("fs");
const path = require("path");

// This script requires sharp package for image processing
// Install with: npm install sharp --save-dev

async function extractSprites() {
  try {
    const sharp = require("sharp");

    const inputFile = path.join(
      __dirname,
      "..",
      "src",
      "assets",
      "resources_basic.png"
    );
    const outputDir = path.join(__dirname, "..", "src", "assets", "sprites");

    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const sheetWidth = 264;
    const sheetHeight = 264;
    const rows = 11;
    const cols = 11;
    const spriteWidth = Math.floor(sheetWidth / cols); // 24px
    const spriteHeight = Math.floor(sheetHeight / rows); // 24px

    console.log(
      `Extracting ${rows}x${cols} sprites of ${spriteWidth}x${spriteHeight}px each...`
    );

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * spriteWidth;
        const y = row * spriteHeight;
        const spriteNumber = row * cols + col;
        const outputPath = path.join(
          outputDir,
          `sprite_${spriteNumber.toString().padStart(3, "0")}.png`
        );

        await sharp(inputFile)
          .extract({
            left: x,
            top: y,
            width: spriteWidth,
            height: spriteHeight,
          })
          .png()
          .toFile(outputPath);

        console.log(`Extracted sprite ${spriteNumber}: ${outputPath}`);
      }
    }

    console.log("✅ All sprites extracted successfully!");
  } catch (error) {
    console.error("❌ Error extracting sprites:", error.message);
    console.log("💡 Make sure to install sharp: npm install sharp --save-dev");
  }
}

extractSprites();

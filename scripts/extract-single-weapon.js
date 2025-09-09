const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

async function extractFirstWeapon() {
  const inputPath = "src/assets/weapons.png";
  const outputDir = "src/assets/weapons";

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log("🎯 Extracting first weapon with exact coordinates...");

  // Adjusted coordinates:
  // - 10 transparency blocks from left (was 11, moved 1 left) = 10 * 8 = 80 pixels
  // - 8 transparency blocks from top (was 9, moved 1 up) = 8 * 8 = 64 pixels
  // - 4x4 transparency blocks = 4 * 8 = 32x32 pixels

  const left = 10 * 8; // 80 pixels
  const top = 8 * 8; // 64 pixels
  const width = 4 * 8; // 32 pixels
  const height = 4 * 8; // 32 pixels

  console.log(`📍 Position: ${left}px from left, ${top}px from top`);
  console.log(`📐 Size: ${width}x${height} pixels`);

  try {
    await sharp(inputPath)
      .extract({
        left: left,
        top: top,
        width: width,
        height: height,
      })
      .png()
      .toFile(path.join(outputDir, "first_weapon_test.png"));

    console.log("✅ First weapon extracted successfully!");
    console.log("📁 Saved as: src/assets/weapons/first_weapon_test.png");
  } catch (error) {
    console.error("❌ Error extracting weapon:", error.message);
  }
}

extractFirstWeapon();

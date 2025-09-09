const sharp = require("sharp");
const path = require("path");

async function examineWeaponsSheet() {
  const inputPath = path.join(__dirname, "..", "src", "assets", "weapons.png");

  try {
    // Get the full image info
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    console.log("=== WEAPONS SPRITE SHEET EXAMINATION ===");
    console.log(`Full dimensions: ${metadata.width} x ${metadata.height}`);

    // Extract a smaller section to examine (top-left corner)
    const sampleWidth = Math.min(400, metadata.width);
    const sampleHeight = Math.min(400, metadata.height);

    console.log(
      `\nCreating sample image (${sampleWidth}x${sampleHeight}) to examine...`
    );

    await image
      .extract({ left: 0, top: 0, width: sampleWidth, height: sampleHeight })
      .png()
      .toFile(path.join(__dirname, "..", "weapons-sample.png"));

    console.log("✅ Created weapons-sample.png in the root directory");
    console.log("Please examine this sample to identify:");
    console.log("1. Individual sprite size");
    console.log("2. Grid pattern");
    console.log("3. Any spacing/borders between sprites");

    // Try to detect common patterns
    console.log("\n=== RECOMMENDED NEXT STEPS ===");
    console.log("1. Open weapons-sample.png in an image editor");
    console.log("2. Count pixels to determine sprite size");
    console.log("3. Look for repeating patterns or text labels");
    console.log("4. Check if there are borders/spacing between sprites");

    // Given the huge size, it might be organized differently
    console.log("\n=== ANALYSIS NOTES ===");
    console.log("This sprite sheet is exceptionally large (6500x9260).");
    console.log("It might be:");
    console.log("- High-resolution sprites (64x64 or larger)");
    console.log("- Multiple weapon categories in sections");
    console.log("- Contains text labels or descriptions");
    console.log("- Has significant spacing between sprites");
  } catch (error) {
    console.error("Error examining sprite sheet:", error.message);
  }
}

examineWeaponsSheet();

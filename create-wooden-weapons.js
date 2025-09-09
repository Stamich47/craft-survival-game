const sharp = require("sharp");
const fs = require("fs");

// Function to create wooden variant from copper sprite
async function createWoodenVariant(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .modulate({
        brightness: 1.3, // Make it brighter (lighter)
        saturation: 0.6, // Reduce saturation to make it less metallic
        hue: 30, // Shift hue towards yellow/orange for wooden look
      })
      .gamma(1.2) // Slightly adjust gamma for warmer tone
      .toFile(outputPath);
    console.log(`✅ Created ${outputPath}`);
  } catch (error) {
    console.error(`❌ Failed to create ${outputPath}:`, error.message);
  }
}

// Create wooden variants of copper weapons
async function createAllWoodenWeapons() {
  console.log("🪵 Creating wooden weapon variants...");

  await createWoodenVariant(
    "src/assets/weapons/weapon_000.png", // copper_sword
    "src/assets/weapons/wooden_sword.png"
  );

  await createWoodenVariant(
    "src/assets/weapons/weapon_002.png", // copper_pickaxe
    "src/assets/weapons/wooden_pickaxe.png"
  );

  await createWoodenVariant(
    "src/assets/weapons/weapon_003.png", // copper_axe
    "src/assets/weapons/wooden_axe.png"
  );

  console.log("🎉 All wooden weapon sprites created!");
}

createAllWoodenWeapons();

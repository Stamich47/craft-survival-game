// Test sprite imports to debug the issue
const testSprite = require("./sprites/sprite_000.png");
console.log("Test sprite value:", testSprite);
console.log("Test sprite type:", typeof testSprite);

export const TEST_SPRITES = {
  wood: require("./sprites/sprite_000.png"),
  wooden_plank: require("./sprites/sprite_001.png"),
  stick: require("./sprites/sprite_002.png"),
};

console.log("TEST_SPRITES:", TEST_SPRITES);

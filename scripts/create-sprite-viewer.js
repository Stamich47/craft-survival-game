const fs = require("fs");
const path = require("path");

function createSpriteViewer() {
  const spritesDir = path.join(__dirname, "..", "src", "assets", "sprites");
  const outputFile = path.join(__dirname, "..", "sprite-viewer.html");

  // Get all sprite files
  const spriteFiles = fs
    .readdirSync(spritesDir)
    .filter((file) => file.endsWith(".png"))
    .sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)[0]);
      const numB = parseInt(b.match(/\d+/)[0]);
      return numA - numB;
    });

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sprite Viewer - Resources Basic</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f0f0f0;
            margin: 20px;
            line-height: 1.6;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            text-align: center;
            color: #333;
            margin-bottom: 30px;
        }
        .sprite-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
            gap: 15px;
            margin-bottom: 30px;
        }
        .sprite-card {
            border: 2px solid #ddd;
            border-radius: 8px;
            padding: 10px;
            text-align: center;
            background: white;
            transition: transform 0.2s, border-color 0.2s;
        }
        .sprite-card:hover {
            transform: scale(1.05);
            border-color: #4a90e2;
            box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }
        .sprite-image {
            width: 48px;
            height: 48px;
            margin: 0 auto 10px;
            background: #f9f9f9;
            border: 1px solid #eee;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 4px;
        }
        .sprite-image img {
            max-width: 100%;
            max-height: 100%;
            image-rendering: pixelated;
            image-rendering: -moz-crisp-edges;
            image-rendering: crisp-edges;
        }
        .sprite-info {
            font-size: 12px;
            color: #666;
        }
        .sprite-number {
            font-weight: bold;
            color: #333;
            margin-bottom: 5px;
        }
        .sprite-position {
            color: #999;
            font-size: 10px;
        }
        .instructions {
            background: #e3f2fd;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            border-left: 4px solid #2196f3;
        }
        .row-header {
            grid-column: 1 / -1;
            background: #4a90e2;
            color: white;
            padding: 10px;
            text-align: center;
            font-weight: bold;
            border-radius: 4px;
            margin-top: 20px;
        }
        .row-header:first-child {
            margin-top: 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎨 Sprite Viewer - Resources Basic</h1>
        
        <div class="instructions">
            <h3>📋 Instructions:</h3>
            <p>Below are all 121 sprites from your sprite sheet. Each sprite is 24x24 pixels and has been extracted from an 11x11 grid.</p>
            <p><strong>How to use:</strong> Look at each sprite and note what it represents. Then update the <code>src/assets/index.ts</code> file with meaningful names.</p>
            <p><strong>Grid Layout:</strong> Sprites are numbered left-to-right, top-to-bottom (0-120)</p>
        </div>

        <div class="sprite-grid">
${spriteFiles
  .map((file, index) => {
    const spriteNumber = parseInt(file.match(/\d+/)[0]);
    const row = Math.floor(spriteNumber / 11);
    const col = spriteNumber % 11;

    let html = "";

    // Add row header at the start of each row
    if (col === 0) {
      html += `            <div class="row-header">Row ${row} (Sprites ${
        row * 11
      }-${row * 11 + 10})</div>\n`;
    }

    html += `            <div class="sprite-card">
                <div class="sprite-image">
                    <img src="src/assets/sprites/${file}" alt="Sprite ${spriteNumber}">
                </div>
                <div class="sprite-info">
                    <div class="sprite-number">Sprite ${spriteNumber}</div>
                    <div class="sprite-position">Row ${row}, Col ${col}</div>
                </div>
            </div>`;

    return html;
  })
  .join("\n")}
        </div>

        <div class="instructions">
            <h3>🔧 Next Steps:</h3>
            <ol>
                <li>Look at each sprite and identify what it represents</li>
                <li>Open <code>src/assets/index.ts</code> in your editor</li>
                <li>Replace the placeholder names with meaningful names like:
                    <ul>
                        <li><code>sprite_000: require('./sprites/sprite_000.png')</code> → <code>wood_log: require('./sprites/sprite_000.png')</code></li>
                        <li><code>sprite_001: require('./sprites/sprite_001.png')</code> → <code>stone: require('./sprites/sprite_001.png')</code></li>
                    </ul>
                </li>
                <li>Update your <code>src/data/items.ts</code> to use the new sprite names</li>
            </ol>
        </div>
    </div>
</body>
</html>
`;

  fs.writeFileSync(outputFile, html);
  console.log(`✅ Sprite viewer created: ${outputFile}`);
  console.log("📖 Open this file in your browser to view all sprites!");
}

createSpriteViewer();

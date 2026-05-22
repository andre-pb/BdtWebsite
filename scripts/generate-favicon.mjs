import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public");
const logoPath = path.join(publicDir, "busy_dad_white_logo_small.png");

const BRAND_BLUE = { r: 0, g: 85, b: 255 };

async function findIconCrop() {
  const { data, info } = await sharp(logoPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const alphaIndex = channels - 1;
  const iconMaxX = Math.floor(width * 0.28);
  const columnDensity = [];

  for (let x = 0; x < iconMaxX; x += 1) {
    let sum = 0;
    for (let y = 0; y < height; y += 1) {
      sum += data[(y * width + x) * channels + alphaIndex];
    }
    columnDensity.push(sum);
  }

  const peak = Math.max(...columnDensity);
  const threshold = peak * 0.35;
  let rightEdge = 0;

  for (let x = columnDensity.length - 1; x >= 0; x -= 1) {
    if (columnDensity[x] >= threshold) {
      rightEdge = x;
      break;
    }
  }

  let minX = width;
  let maxX = 0;
  let minY = height;
  let maxY = 0;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x <= rightEdge; x += 1) {
      const alpha = data[(y * width + x) * channels + alphaIndex];
      if (alpha > 24) {
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      }
    }
  }

  const pad = 4;
  const left = Math.max(0, minX - pad);
  const top = Math.max(0, minY - pad);
  const cropWidth = Math.min(width - left, maxX - minX + 1 + pad * 2);
  const cropHeight = Math.min(height - top, maxY - minY + 1 + pad * 2);

  return { left, top, width: cropWidth, height: cropHeight };
}

async function buildSquareIcon(size) {
  const crop = await findIconCrop();
  const iconSize = Math.round(size * 0.72);
  const icon = await sharp(logoPath)
    .extract(crop)
    .resize(iconSize, iconSize, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { ...BRAND_BLUE, alpha: 1 },
    },
  }).composite([{ input: icon, gravity: "center" }]);
}

async function writePng(pipeline, filename) {
  const buffer = await pipeline
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();
  await writeFile(path.join(publicDir, filename), buffer);
}

async function writeIco(png32) {
  const pngBuffer = await png32
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();
  const pngSize = pngBuffer.length;

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);

  const entry = Buffer.alloc(16);
  entry[0] = 32;
  entry[1] = 32;
  entry[2] = 0;
  entry[3] = 0;
  entry[4] = 1;
  entry[5] = 0;
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(pngSize, 8);
  entry.writeUInt32LE(22, 12);

  await writeFile(
    path.join(publicDir, "favicon.ico"),
    Buffer.concat([header, entry, pngBuffer]),
  );
}

async function main() {
  await mkdir(publicDir, { recursive: true });

  const png16 = await buildSquareIcon(16);
  const png32 = await buildSquareIcon(32);
  const png180 = await buildSquareIcon(180);
  const png192 = await buildSquareIcon(192);
  const png512 = await buildSquareIcon(512);

  await Promise.all([
    writePng(png16, "favicon-16x16.png"),
    writePng(png32, "favicon-32x32.png"),
    writePng(png180, "apple-touch-icon.png"),
    writePng(png192, "icon-192.png"),
    writePng(png512, "icon-512.png"),
    writeIco(png32),
  ]);

  console.log("Favicon assets written to public/");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

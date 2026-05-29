// Re-encode heavy /public/img assets in place with sharp (balanced quality).
// Frames feed an on-screen <canvas> ~600-900px wide, so quality 72 + width cap
// 900px is visually lossless there while massively cutting payload.
//
//   node scripts/optimize-images.mjs
//
// Note: overwrites in place via toBuffer()+writeFile (no rename) so it tolerates
// OneDrive file locking; retries briefly on EPERM.
import sharp from 'sharp';
import { readdir, stat, writeFile, unlink } from 'node:fs/promises';
import path from 'node:path';

const IMG = path.resolve('public/img');
const Q = 72;          // webp quality
const MAX_W = 900;     // cap frame width (canvas never renders wider)
const LOCK = new Set(['EPERM', 'UNKNOWN', 'EBUSY', 'EACCES']); // OneDrive sync locks

let savedBytes = 0;
let count = 0;
let skipped = 0;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Overwrite a file that OneDrive may be locking: delete then create, retrying.
async function overwrite(file, buf, tries = 12) {
  for (let i = 0; i < tries; i++) {
    try {
      try { await unlink(file); } catch (e) { if (!LOCK.has(e.code) && e.code !== 'ENOENT') throw e; }
      await writeFile(file, buf, { flag: 'w' });
      return true;
    } catch (e) {
      if (LOCK.has(e.code) && i < tries - 1) { await sleep(500); continue; }
      throw e;
    }
  }
  return false;
}

async function reencode(file, { maxW = MAX_W, quality = Q, format = 'webp' } = {}) {
  const before = (await stat(file)).size;
  const img = sharp(file).rotate();
  const meta = await img.metadata();
  if (meta.width && maxW && meta.width > maxW) img.resize({ width: maxW });
  const buf = format === 'png'
    ? await img.png({ compressionLevel: 9, palette: true, quality }).toBuffer()
    : await img.webp({ quality, effort: 5 }).toBuffer();
  if (buf.length >= before) return; // re-encode didn't help; keep original
  try {
    await overwrite(file, buf);
    savedBytes += before - buf.length;
    count++;
  } catch (e) {
    skipped++;
    console.warn('  skip (locked):', path.basename(file), e.code);
  }
}

async function run() {
  const entries = await readdir(IMG);

  // 1) top-level webp frames (seq_*, hypeBamVideo*) + any other webp
  for (const f of entries.filter((x) => x.endsWith('.webp'))) {
    await reencode(path.join(IMG, f));
  }

  // 2) flavour cans — cap a touch (display ~520px)
  try {
    const fl = await readdir(path.join(IMG, 'flavours'));
    for (const f of fl.filter((x) => x.endsWith('.webp'))) {
      await reencode(path.join(IMG, 'flavours', f), { maxW: 700, quality: 78 });
    }
  } catch {}

  // 3) texture.png (background, tiles → small is fine)
  try { await reencode(path.join(IMG, 'texture.png'), { maxW: 512, quality: 70, format: 'png' }); } catch {}

  // 4) smiley icon
  try { await reencode(path.join(IMG, 'original-flavor-icon.png'), { maxW: 300, quality: 82, format: 'png' }); } catch {}

  console.log(`Optimized ${count} files. Saved ${(savedBytes / 1048576).toFixed(1)} MB.${skipped ? ' Skipped (locked): ' + skipped + ' — re-run to retry.' : ''}`);
}

run().catch((e) => { console.error(e); process.exit(1); });

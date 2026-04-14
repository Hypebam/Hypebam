/**
 * compress-videos.mjs
 * Compresses testimonial videos in public/img/video/ for web delivery.
 * Uses ffmpeg-static (bundled binary - no system install needed).
 *
 * Target: H.264 video, AAC audio, 720p max, CRF 28, ~2Mbps cap
 * Run: node scripts/compress-videos.mjs
 */

import { execFileSync } from 'child_process';
import { existsSync, mkdirSync, readdirSync, statSync, renameSync } from 'fs';
import { join, basename, extname } from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

// Get ffmpeg binary path from ffmpeg-static
const ffmpegPath = require('ffmpeg-static');

const VIDEO_DIR = join(__dirname, '..', 'public', 'img', 'video');
const OUTPUT_DIR = join(VIDEO_DIR, 'compressed');

if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR, { recursive: true });
}

const videoFiles = readdirSync(VIDEO_DIR).filter(f => 
  ['.mp4', '.mov', '.webm'].includes(extname(f).toLowerCase()) && !f.startsWith('.')
);

if (videoFiles.length === 0) {
  console.log('No video files found in', VIDEO_DIR);
  process.exit(0);
}

console.log(`\n🎬 Found ${videoFiles.length} video(s) to compress\n`);
console.log('FFmpeg binary:', ffmpegPath);
console.log('Input dir:', VIDEO_DIR);
console.log('Output dir:', OUTPUT_DIR);
console.log('');

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

let totalOriginal = 0;
let totalCompressed = 0;

for (const file of videoFiles) {
  const inputPath = join(VIDEO_DIR, file);
  // Rename output to web-safe filename (no spaces)
  const safeName = file.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9._-]/g, '');
  const outputPath = join(OUTPUT_DIR, safeName);

  const originalSize = statSync(inputPath).size;
  totalOriginal += originalSize;

  console.log(`📦 Compressing: ${file}`);
  console.log(`   Original size: ${formatBytes(originalSize)}`);

  if (existsSync(outputPath)) {
    const existingSize = statSync(outputPath).size;
    console.log(`   ⚡ Already compressed (${formatBytes(existingSize)}), skipping.\n`);
    totalCompressed += existingSize;
    continue;
  }

  try {
    const args = [
      '-i', inputPath,
      // Video: H.264, quality CRF 28 (good quality, smaller file)
      '-c:v', 'libx264',
      '-crf', '28',
      // Cap bitrate to prevent huge files even on complex scenes
      '-maxrate', '1500k',
      '-bufsize', '3000k',
      // Scale down to max 720p width, keeping aspect ratio
      '-vf', 'scale=trunc(min(iw\\,1280)/2)*2:trunc(ow/a/2)*2',
      // Preset: slow = better compression, faster = quicker encoding
      '-preset', 'slow',
      // Audio: AAC 128kbps stereo
      '-c:a', 'aac',
      '-b:a', '128k',
      '-ac', '2',
      // Web optimization: move moov atom to front for fast start
      '-movflags', '+faststart',
      // Overwrite output if exists
      '-y',
      outputPath
    ];

    execFileSync(ffmpegPath, args, { stdio: 'inherit' });

    const compressedSize = statSync(outputPath).size;
    totalCompressed += compressedSize;
    const reduction = ((1 - compressedSize / originalSize) * 100).toFixed(1);

    console.log(`   ✅ Compressed size: ${formatBytes(compressedSize)} (${reduction}% smaller)\n`);
  } catch (err) {
    console.error(`   ❌ Failed to compress ${file}:`, err.message);
  }
}

console.log('═══════════════════════════════════════');
console.log('📊 Summary:');
console.log(`   Original total:   ${formatBytes(totalOriginal)}`);
console.log(`   Compressed total: ${formatBytes(totalCompressed)}`);
const totalReduction = ((1 - totalCompressed / totalOriginal) * 100).toFixed(1);
console.log(`   Total reduction:  ${totalReduction}%`);
console.log('');
console.log('✅ Done! Compressed videos are in:');
console.log('   ', OUTPUT_DIR);
console.log('');
console.log('📋 Next steps:');
console.log('   1. Review the compressed videos in the /compressed folder');
console.log('   2. If quality is acceptable, copy them to public/img/video/ replacing originals');
console.log('   3. Update InsiderSection.tsx to use local paths');

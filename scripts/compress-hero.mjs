import sharp from 'sharp';
import fs from 'fs';

const input = '/mnt/data/projects/empliq-website/public/hero/lima-dawn-commute.png';
const outDir = '/mnt/data/projects/empliq-website/public/hero';

const cfg = [
  { name: 'lima-dawn-commute-2400.webp', width: 2400, format: 'webp', quality: 82 },
  { name: 'lima-dawn-commute-1600.webp', width: 1600, format: 'webp', quality: 80 },
  { name: 'lima-dawn-commute-1024.webp', width: 1024, format: 'webp', quality: 78 },
  { name: 'lima-dawn-commute-2400.jpg',  width: 2400, format: 'jpeg', quality: 82, opts: { mozjpeg: true } },
  { name: 'lima-dawn-commute-1600.jpg',  width: 1600, format: 'jpeg', quality: 80, opts: { mozjpeg: true } },
  { name: 'lima-dawn-commute-blur.jpg',  width: 32,   format: 'jpeg', quality: 50, opts: { mozjpeg: true } },
];

for (const c of cfg) {
  const out = `${outDir}/${c.name}`;
  let pipe = sharp(input).resize({ width: c.width, withoutEnlargement: true });
  if (c.format === 'webp') pipe = pipe.webp({ quality: c.quality, effort: 6 });
  if (c.format === 'jpeg') pipe = pipe.jpeg({ quality: c.quality, ...(c.opts || {}) });
  await pipe.toFile(out);
  const { size } = fs.statSync(out);
  console.log(`${c.name.padEnd(40)} ${(size / 1024).toFixed(0).padStart(6)} KB`);
}

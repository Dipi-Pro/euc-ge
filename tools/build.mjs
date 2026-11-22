/* ==========================================================================
   ZIPI.GE: საიტის აწყობა.   გაშვება: node tools/build.mjs   შედეგი: _site/

   GitHub Actions ამას ყოველ push-ზე უშვებს (.github/workflows/pages.yml),
   ამიტომ ფასის ან ტექსტის შესაცვლელად ხელით გაშვება არ გჭირდება.

   რას აკეთებს:
     1. კითხულობს data/catalog.js-ს, data/i18n.js-ს და content/-ს;
     2. tools/build/site.js-ით აწყობს ყველა გვერდს (ქართული + /en/);
     3. ფოტოებს ამცირებს (cwebp, ImageMagick) და .cache/img-ში ინახავს;
     4. ამოწმებს, რომ ყველა შიდა ბმული არსებულ გვერდზე მიდის.
        გატეხილი ბმული = აწყობა ჩერდება და ძველი საიტი რჩება.
   დამოკიდებულებები: მხოლოდ Node.js (18+). ფოტოების ხელსაწყოები არჩევითია:
   თუ არ არის, საიტი ორიგინალ ფოტოებს გამოიყენებს.
   ========================================================================== */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import crypto from "node:crypto";
import os from "node:os";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "_site");
const CACHE = path.join(ROOT, ".cache", "img");
const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");
const sha = (buf) => crypto.createHash("sha1").update(buf).digest("hex").slice(0, 10);
const log = (...a) => console.log(...a);

/* --- 1. მონაცემები და ამწყობი ერთ "ქვიშის ყუთში" -------------------------- */
const ctx = vm.createContext({ console });
ctx.window = ctx; /* catalog.js და i18n.js window.CATALOG / window.I18N-ს წერს */
for (const f of ["data/catalog.js", "data/i18n.js", "tools/build/site.js"]) {
  vm.runInContext(read(f), ctx, { filename: f });
}
if (!ctx.CATALOG || !ctx.I18N || !ctx.ZB) throw new Error("catalog.js, i18n.js or site.js did not load");

/* მოდელის ფოტოები მის საქაღალდეშია: assets/wheels/<id>/1.jpg, 2.jpg, ...
   "1" მთავარი ფოტოა (ბარათი, სლაიდშოუ), დანარჩენები რიცხვის მიხედვით ლაგდება. */
const SRC = path.join(ROOT, "assets", "wheels");
const IMG_RE = /\.(jpe?g|png|webp)$/i;
const byNumber = (a, b) => {
  const na = parseFloat(a), nb = parseFloat(b);
  if (!isNaN(na) && !isNaN(nb) && na !== nb) return na - nb;
  if (!isNaN(na) !== !isNaN(nb)) return isNaN(na) ? 1 : -1;
  return a.localeCompare(b);
};
for (const w of ctx.CATALOG.wheels) {
  const dir = path.join(SRC, w.id);
  if (fs.existsSync(dir)) {
    const list = fs.readdirSync(dir).filter((n) => IMG_RE.test(n)).sort(byNumber);
    if (list.length) w.images = list.map((n) => `${w.id}/${n}`);
  }
  if (!w.images || !w.images.length) throw new Error(`No photos for model "${w.id}": add them to assets/wheels/${w.id}/`);
}

const tips = read("content/tips/articles.tsv").split(/\r?\n/).filter((l) => l.trim()).map((line) => {
  const [slug, tka, ten, dka, den] = line.split("\t");
  return {
    slug,
    ka: { title: tka, desc: dka, body: read(`content/tips/${slug}.ka.html`) },
    en: { title: ten, desc: den, body: read(`content/tips/${slug}.en.html`) }
  };
});
const guide = { ka: read("content/guide.ka.html"), en: read("content/guide.en.html") };

/* --- 2. ფოტოები ------------------------------------------------------------ */
function dims(buf) {
  /* JPEG / WebP / PNG ზომა ფაილის თავიდან, ბიბლიოთეკის გარეშე */
  if (buf[0] === 0x89 && buf.toString("ascii", 1, 4) === "PNG") return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
  if (buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const kind = buf.toString("ascii", 12, 16);
    if (kind === "VP8 ") return { w: buf.readUInt16LE(26) & 0x3fff, h: buf.readUInt16LE(28) & 0x3fff };
    if (kind === "VP8L") {
      const b0 = buf[21], b1 = buf[22], b2 = buf[23], b3 = buf[24];
      return { w: 1 + (((b1 & 0x3f) << 8) | b0), h: 1 + (((b3 & 0xf) << 10) | (b2 << 2) | ((b1 & 0xc0) >> 6)) };
    }
    if (kind === "VP8X") return { w: 1 + buf.readUIntLE(24, 3), h: 1 + buf.readUIntLE(27, 3) };
    return null;
  }
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i + 9 < buf.length) {
      if (buf[i] !== 0xff) { i++; continue; }
      const m = buf[i + 1];
      if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) return { w: buf.readUInt16BE(i + 7), h: buf.readUInt16BE(i + 5) };
      if (m === 0xd8 || m === 0x01 || (m >= 0xd0 && m <= 0xd7)) { i += 2; continue; }
      i += 2 + buf.readUInt16BE(i + 2);
    }
  }
  return null;
}
const has = (cmd) => !spawnSync(cmd, ["-version"], { stdio: "ignore" }).error;
const CWEBP = has("cwebp"), DWEBP = has("dwebp"), CONVERT = has("convert");
log(`image tools: cwebp=${CWEBP} dwebp=${DWEBP} convert=${CONVERT}`);

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(path.join(OUT, "assets", "img"), { recursive: true });
fs.mkdirSync(CACHE, { recursive: true });

const SIZES = [480, 1000, 1600];
const images = [];
/* ყველა ფოტო assets/wheels/-ში, ქვესაქაღალდეების ჩათვლით (მაგ. "nosfet-aero/1.webp") */
const walk = (dir, rel = "") => fs.readdirSync(dir).flatMap((n) => {
  const p = path.join(dir, n), r = rel ? `${rel}/${n}` : n;
  return fs.statSync(p).isDirectory() ? walk(p, r) : IMG_RE.test(n) ? [r] : [];
});
for (const name of walk(SRC)) {
  const file = path.join(SRC, name);
  const buf = fs.readFileSync(file);
  const d = dims(buf);
  if (!d) { log(`  skip ${name}: unknown size`); continue; }
  const id = sha(buf), stem = name.replace(/\.[^.]+$/, "");
  fs.mkdirSync(path.dirname(path.join(OUT, "assets", "img", stem)), { recursive: true });
  const wide = d.w >= d.h, long = Math.max(d.w, d.h);
  for (const size of SIZES) {
    const cached = path.join(CACHE, `${id}-${size}.webp`);
    if (!fs.existsSync(cached) && CWEBP) {
      const t = String(Math.min(size, long));
      const r = spawnSync("cwebp", ["-quiet", "-q", "80", "-resize", wide ? t : "0", wide ? "0" : t, file, "-o", cached]);
      if (r.status !== 0) fs.rmSync(cached, { force: true });
    }
    if (fs.existsSync(cached)) {
      fs.copyFileSync(cached, path.join(OUT, "assets", "img", `${stem}-${size}.webp`));
      images.push(`${stem}-${size}.webp`);
    }
  }
  /* გაზიარების ფოტო (og:image): JPG, რადგან WhatsApp-ი და ზოგი სოც. ქსელი WebP-ს ყოველთვის არ აჩვენებს */
  const og = path.join(CACHE, `${id}-og.jpg`);
  if (!fs.existsSync(og) && CONVERT) {
    let input = file, tmp = null;
    if (/\.webp$/i.test(name) && DWEBP) {
      tmp = path.join(os.tmpdir(), `zipi-${id}.png`);
      if (spawnSync("dwebp", ["-quiet", file, "-o", tmp]).status === 0) input = tmp;
    }
    const r = spawnSync("convert", [input, "-resize", "1200x1200>", "-background", "white", "-alpha", "remove", "-alpha", "off",
      "-strip", "-quality", "82", og]);
    if (r.status !== 0) fs.rmSync(og, { force: true });
    if (tmp) fs.rmSync(tmp, { force: true });
  }
  if (fs.existsSync(og)) {
    fs.copyFileSync(og, path.join(OUT, "assets", "img", `${stem}-og.jpg`));
    images.push(`${stem}-og.jpg`);
  }
}
log(`images: ${images.length} resized files`);

/* --- 3. სტატიკური ფაილები ------------------------------------------------- */
const copyDir = (from, to) => {
  if (!fs.existsSync(from)) return;
  fs.mkdirSync(to, { recursive: true });
  for (const n of fs.readdirSync(from)) {
    const a = path.join(from, n), b = path.join(to, n);
    if (fs.statSync(a).isDirectory()) copyDir(a, b); else fs.copyFileSync(a, b);
  }
};
/* ორიგინალები: სარეზერვოდ და ძველი ბმულებისთვის */
copyDir(SRC, path.join(OUT, "assets", "wheels"));
copyDir(path.join(ROOT, "assets", "icons"), path.join(OUT, "assets", "icons"));
for (const f of ["favicon.svg", "favicon.ico"]) {
  const p = path.join(ROOT, "assets", "icons", f);
  if (fs.existsSync(p)) fs.copyFileSync(p, path.join(OUT, f));
}
if (fs.existsSync(path.join(ROOT, "CNAME"))) fs.copyFileSync(path.join(ROOT, "CNAME"), path.join(OUT, "CNAME"));

/* CSS: კომენტარების და ცარიელი ადგილების გარეშე (მხოლოდ უსაფრთხო შეკუმშვა) */
const css = read("assets/styles.css").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\n\s*/g, "\n").replace(/\n+/g, "\n").trim() + "\n";
const js = read("assets/app.js");
fs.writeFileSync(path.join(OUT, "assets", "styles.css"), css);
fs.writeFileSync(path.join(OUT, "assets", "app.js"), js);

/* --- 4. გვერდები ----------------------------------------------------------- */
const files = ctx.ZB.build({
  catalog: ctx.CATALOG,
  i18n: ctx.I18N,
  tips,
  guide,
  images,
  versions: { css: sha(css), js: sha(js) },
  today: new Date().toISOString().slice(0, 10)
});
let count = 0;
for (const [key, body] of Object.entries(files)) {
  const p = path.join(OUT, key);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, body);
  count++;
}
log(`pages: ${count} files`);

/* --- 5. შიდა ბმულების შემოწმება ------------------------------------------- */
const exists = (u) => {
  const clean = decodeURIComponent(u.split("#")[0].split("?")[0]);
  if (!clean) return true;
  const p = path.join(OUT, clean.endsWith("/") ? clean + "index.html" : clean);
  return fs.existsSync(p);
};
const broken = [];
for (const [key, body] of Object.entries(files)) {
  if (!key.endsWith(".html")) continue;
  const re = /(?:href|src|data-src|data-full)="(\/[^"]*)"/g;
  let m;
  while ((m = re.exec(body))) if (!exists(m[1])) broken.push(`${key} -> ${m[1]}`);
  const ss = /(?:srcset|imagesrcset)="([^"]*)"/g;
  while ((m = ss.exec(body))) m[1].split(",").forEach((part) => {
    const u = part.trim().split(/\s+/)[0];
    if (u.startsWith("/") && !exists(u)) broken.push(`${key} -> ${u}`);
  });
}
if (broken.length) {
  console.error(`Broken internal links (${broken.length}):\n` + [...new Set(broken)].slice(0, 40).join("\n"));
  process.exit(1);
}
log("links: ok");

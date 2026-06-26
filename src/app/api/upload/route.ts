import { NextRequest, NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";
import sharp from "sharp";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const convertWebp = formData.get("webp") === "true";

  if (!file) {
    return NextResponse.json({ error: "File tidak ditemukan" }, { status: 400 });
  }

  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json(
      { error: "Format tidak didukung. Gunakan JPG, PNG, WebP, atau GIF." },
      { status: 400 }
    );
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: `File terlalu besar. Maksimal ${MAX_SIZE / 1024 / 1024}MB.` },
      { status: 400 }
    );
  }

  // Ensure upload dir exists
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  let outputBuffer: Buffer = buffer;
  let ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  let mimeType = file.type;

  // Auto-optimize: resize if wider than 1200px, convert to WebP if requested
  try {
    const metadata = await sharp(buffer).metadata();

    if (file.type !== "image/gif") {
      let pipeline = sharp(buffer);

      // Resize if wider than 1200px (keep aspect ratio)
      if (metadata.width && metadata.width > 1200) {
        pipeline = pipeline.resize(1200, undefined, {
          withoutEnlargement: true,
          fit: "inside",
        });
      }

      if (convertWebp) {
        pipeline = pipeline.webp({ quality: 82 });
        ext = "webp";
        mimeType = "image/webp";
      } else if (ext === "png") {
        pipeline = pipeline.png({ compressionLevel: 6 });
      } else if (ext === "jpg" || ext === "jpeg") {
        pipeline = pipeline.jpeg({ quality: 82, mozjpeg: true });
      }

      outputBuffer = await pipeline.toBuffer();
    }
  } catch {
    // If sharp fails, use original buffer
    outputBuffer = buffer;
  }

  // Generate unique filename
  const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const filePath = path.join(UPLOAD_DIR, name);

  fs.writeFileSync(filePath, outputBuffer);

  const url = `/uploads/${name}`;

  return NextResponse.json({
    url,
    filename: name,
    size: outputBuffer.length,
    type: mimeType,
    optimized: outputBuffer.length < buffer.length,
    originalSize: file.size,
    savedPercent:
      outputBuffer.length < buffer.length
        ? Math.round((1 - outputBuffer.length / buffer.length) * 100)
        : 0,
  });
}

export async function GET() {
  if (!fs.existsSync(UPLOAD_DIR)) {
    return NextResponse.json([]);
  }

  const files = fs.readdirSync(UPLOAD_DIR).map((filename) => {
    const stat = fs.statSync(path.join(UPLOAD_DIR, filename));
    return {
      filename,
      url: `/uploads/${filename}`,
      size: stat.size,
      created: stat.birthtime.toISOString(),
    };
  });

  files.sort(
    (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
  );

  return NextResponse.json(files);
}

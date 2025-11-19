import { RequestHandler } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { readCollection, writeCollection } from "../storage/db";

const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${unique}${ext}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    const allowed = [".jpg", ".jpeg", ".png"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowed.includes(ext)) return cb(new Error("Only JPG/PNG allowed"));
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

interface UploadMeta {
  id: string;
  userId: string;
  filename: string;
  originalName: string;
  type: "receipt" | "food";
  associatedInventoryId?: string;
  associatedLogId?: string;
  uploadedAt: string;
}

export const handleUploadReceipt: RequestHandler = (req, res) => {
  // handled by upload middleware
  res.json({ message: "Upload successful" });
};

export const uploadReceiptMiddleware = [
  // @ts-expect-error typed middleware
  upload.single("file"),
  (req: any, res: any) => {
    try {
      // @ts-expect-error user attached by middleware
      const userId: string | undefined = req.user?.id;
      if (!userId) return res.status(401).json({ error: "Unauthorized" });
      const file = req.file;
      if (!file) return res.status(400).json({ error: "No file uploaded" });
      const id = (globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`).toString();
      const meta: UploadMeta = {
        id,
        userId,
        filename: file.filename,
        originalName: file.originalname,
        type: "receipt",
        associatedInventoryId: req.body?.inventoryId,
        associatedLogId: req.body?.logId,
        uploadedAt: new Date().toISOString(),
      };
      const metas = readCollection<UploadMeta[]>("uploads");
      metas.push(meta);
      writeCollection("uploads", metas);
      res.json({ message: "Upload successful", upload: meta });
    } catch (error) {
      res.status(500).json({ error: "Upload failed" });
    }
  },
];

export const uploadFoodPhotoMiddleware = [
  // @ts-expect-error typed middleware
  upload.single("file"),
  (req: any, res: any) => {
    try {
      // @ts-expect-error user attached by middleware
      const userId: string | undefined = req.user?.id;
      if (!userId) return res.status(401).json({ error: "Unauthorized" });
      const file = req.file;
      if (!file) return res.status(400).json({ error: "No file uploaded" });
      const id = (globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`).toString();
      const meta: UploadMeta = {
        id,
        userId,
        filename: file.filename,
        originalName: file.originalname,
        type: "food",
        associatedInventoryId: req.body?.inventoryId,
        associatedLogId: req.body?.logId,
        uploadedAt: new Date().toISOString(),
      };
      const metas = readCollection<UploadMeta[]>("uploads");
      metas.push(meta);
      writeCollection("uploads", metas);
      res.json({ message: "Upload successful", upload: meta });
    } catch (error) {
      res.status(500).json({ error: "Upload failed" });
    }
  },
];
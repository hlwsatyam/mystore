import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";

const router = express.Router();

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    // Example: uploads/2025/11-04
    const uploadPath = path.join("uploads", `${year}`, `${month}-${day}`);

    // agar folder exist nahi karta to create karo
    fs.mkdirSync(uploadPath, { recursive: true });

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // unique name generate
    const uniqueName = Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// POST route
router.post("/", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }
  // base URL dynamically get karo (agar express static se serve kar rahe ho)
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  const fileUrl = `${baseUrl}/${req.file.path.replace(/\\/g, "/")}`;

  res.status(200).json({
    success: true,
    message: "File uploaded successfully",
    fileUrl,
  });
});

export default router;

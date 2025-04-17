//file management multer

import express from 'express'; 
import multer from 'multer';
import path from "path"; 
import fs from 'fs';
import { exec } from 'child_process';

const fileRouter = express.Router(); 

//upload directory

const uploadDir = './uploads'; 

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir); 
}

//convert directory 
const convertedDir = "converted";
if (!fs.existsSync(convertedDir)) {
  fs.mkdirSync(convertedDir);
}

//multer storage config
// This tells Multer where and how to save the file.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);// folder to store files
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);// rename file to avoid conflicts
  }
}); 

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "audio/mpeg",
      "video/mp4",
      "image/png",
      "image/jpeg"
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Unsupported file type"));
    }
  }
}); 

fileRouter.post("/upload", upload.single("file"), (req, res) => {
  
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }
  res.status(200).json({
    success: true,
    message: "File uploaded successfully",
    file: {
      originalName: req.file.originalname,
      storedName: req.file.filename,
      path: req.file.path,
      mimetype: req.file.mimetype,
      size: req.file.size
    }
  });
})

fileRouter.post('/convert-to-mp3', async (req, res) => {
  const { filename } = req.body; 

  if (!filename || !filename.endsWith(".mp4")) {
    return res.status(400).json({ success: false, message: "Invalid or missing .mp4 filename" });
  }
  const inputPath = path.join(uploadDir, filename);
  const outputFilename = filename.replace(".mp4", ".mp3");
  const outputPath = path.join(convertedDir, outputFilename);

  const cmd = `ffmpeg -i "${inputPath}" -vn -ab 128k -ar 44100 -y "${outputPath}"`;

  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error("Conversion error:", error);
      return res.status(500).json({ success: false, message: "Conversion failed" });
    }

    res.status(200).json({
      success: true,
      message: "File converted successfully",
      convertedFile: outputFilename,
      path: outputPath,
    });
  });
})

export default fileRouter; 
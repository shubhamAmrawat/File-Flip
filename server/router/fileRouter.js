// fileRouter.js
import express from 'express';
import upload from '../middleware/multer.js';
import {
  handleFileUpload,
  convertToMp3,
  convertToPdf
} from '../controller/fileController.js';
import path from 'path';
import fs from 'fs'
import { deleteFileIfExists } from '../utils/fileHelpers.js';

const fileRouter = express.Router();

// fileRouter.post("/upload", upload.single("file"), handleFileUpload);
fileRouter.post("/convert-to-mp3", upload.single('file'), convertToMp3);
fileRouter.post("/convert-to-pdf", upload.single("file"), convertToPdf);
fileRouter.get("/downloads/:filename", (req, res) => {
  const filePath = path.join('converted', req.params.filename);
  if (fs.existsSync(filePath)) {
    res.download(filePath, (err) => {
      if (err) console.error("Error in sending file:", err.message);
      // Optionally delete after download
      deleteFileIfExists(filePath);
    });
  } else {
    res.status(404).json({ message: "File not found" });
  }
});

export default fileRouter;

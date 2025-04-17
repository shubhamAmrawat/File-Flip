// fileController.js
import path from 'path';
import fs from 'fs';
import { exec as execCb } from 'child_process';
import libre from 'libreoffice-convert';
import { promisify } from 'util';
import { deleteFileIfExists, getDownloadUrl } from '../utils/fileHelpers.js';

const exec = promisify(execCb); // Convert callback to promise

const uploadDir = "uploads";
const convertedDir = 'converted';

export const handleFileUpload = (req, res) => {
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
};

export const convertToMp3 = async (req, res) => {
  try {
    if (!req.file || !req.file.mimetype.includes('video/mp4')) {
      return res.status(400).json({ success: false, message: "Invalid or missing .mp4 file" });
    }

    const inputPath = req.file.path;
    const outputFilename = req.file.filename.replace(/\.mp4$/, '.mp3');
    const outputPath = path.join('converted', outputFilename);

    const cmd = `ffmpeg -i "${inputPath}" -vn -ab 128k -ar 44100 -y "${outputPath}"`;
    await exec(cmd);

    if (!fs.existsSync(outputPath)) {
      throw new Error("MP3 file not created");
    }

    // Cleanup input file
    deleteFileIfExists(inputPath);

    // Send response with download link
    const downloadUrl = getDownloadUrl(req, outputFilename);

    res.status(200).json({
      success: true,
      message: "File converted successfully",
      downloadUrl,
    });
  } catch (error) {
    console.error("MP3 conversion failed:", error.message);
    res.status(500).json({ success: false, message: "MP3 conversion failed" });
  }
};

export const convertToPdf = async (req, res) => {
  try {
    const filePath = req.file.path;
    const fileBuffer = fs.readFileSync(filePath);
    const outputFilename = req.file.filename.replace(path.extname(req.file.filename), '.pdf');
    const outputPath = path.join('converted', outputFilename);

    libre.convert(fileBuffer, '.pdf', undefined, (err, done) => {
      if (err) {
        console.error("Conversion error:", err);
        return res.status(500).json({ error: "Conversion failed" });
      }

      fs.writeFileSync(outputPath, done);

      // Cleanup uploaded file
      deleteFileIfExists(filePath);

      const downloadUrl = getDownloadUrl(req, outputFilename);
      res.status(200).json({
        success: true,
        message: "File converted successfully",
        downloadUrl
      });
    });

  } catch (err) {
    console.error("PDF Conversion error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};


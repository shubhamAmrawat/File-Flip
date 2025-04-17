// utils/fileHelpers.js
import fs from 'fs';
import path from 'path';

export const deleteFileIfExists = (filePath) => {
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (!err) {
      fs.unlink(filePath, (err) => {
        if (err) console.error(`Failed to delete ${filePath}:`, err.message);
      });
    }
  });
};

// Optional helper if you want to get a full download URL from filename
export const getDownloadUrl = (req, filename) => {
  return `${req.protocol}://${req.get('host')}/downloads/${filename}`;
};

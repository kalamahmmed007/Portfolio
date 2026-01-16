import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import config from "../config/config.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: config.cloudinary.folder,
    allowed_formats: config.upload.allowedFormats
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: config.upload.maxFileSize
  }
});

export default upload;

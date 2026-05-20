import multer from "multer";
import fs from "fs";

const uploadPath = "uploads";

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, {
        recursive: true,
    });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },

    filename: (req, file, cb) => {
        const sanitizedName = file.originalname
            .replace(/\s+/g, "-")
            .replace(/[^\w.-]/g, "");

        const uniqueName = Date.now() + "-" + sanitizedName;

        cb(null, uniqueName);
    },
});

export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB limit
export const MAX_FILE_SIZE_MB = MAX_FILE_SIZE_BYTES / (1024 * 1024);

const upload = multer({
    storage,
    limits: {
        fileSize: MAX_FILE_SIZE_BYTES,
    },
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp",
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "text/plain",
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "application/zip",
            "application/x-zip-compressed",
            "application/x-rar-compressed",
            "text/csv",
            "application/csv"
        ];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type. Only images, PDFs, office documents, TXT, CSV, ZIP and RAR files are allowed."), false);
        }
    }
});

export default upload;
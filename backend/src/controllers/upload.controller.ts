import { Request, Response, NextFunction } from "express";
import multer from "multer";
import path from "path";

// Configuración de multer
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const upload = multer({ storage });

// ✅ Subida de uno o múltiples archivos
export const uploadDocuments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const files = req.files as Express.Multer.File[] | undefined;

    if (!files || files.length === 0) {
      return res
        .status(400)
        .json({ message: "No se ha subido ningún archivo." });
    }

    const uploadedFiles = files.map((file) => ({
      name: file.originalname,
      filename: file.filename,
      mimetype: file.mimetype,
      size: file.size,
      link: `/uploads/${file.filename}`, // URL relativa que puede usar el frontend
    }));

    res.json({
      message: "Archivos subidos exitosamente",
      files: uploadedFiles,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al subir archivo(s)", error });
  }
};

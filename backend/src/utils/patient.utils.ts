import fs from "fs";
import path from "path";
import { MulterRequest } from "../interfaces/express.interface";

// --- Transforma a mayúsculas (de forma recursiva) ---
export function transformStringsToUppercase(obj: any): any {
  if (typeof obj !== "object" || obj === null) return obj;

  const transformedObj: any = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (
        typeof value === "string" &&
        value !== "undefined" &&
        value !== "null"
      ) {
        transformedObj[key] = value.toUpperCase();
      } else if (typeof value === "object" && value !== null) {
        transformedObj[key] = transformStringsToUppercase(value);
      } else {
        transformedObj[key] = value;
      }
    }
  }
  return transformedObj;
}

// --- Sube un archivo y retorna {link, id} ---
const handleFileUpload = async (file: Express.Multer.File) => {
  try {
    const fileUrl = `${process.env.SERVER_BASE_URL}/uploads/${file.filename}`;
    return {
      link: fileUrl,
      id: file.filename, // usamos el filename como identificador
    };
  } catch (error) {
    console.error("Error al procesar archivo:", error);
    return null;
  }
};

// --- Procesa los archivos del formulario del paciente ---
export const processPatientFiles = async (
  req: MulterRequest
): Promise<{
  document1?: { link: string | null; id: string | null };
  document2?: { link: string | null; id: string | null };
  document3?: { link: string[] | null; id: string[] | null };
}> => {
  const files = req.files as
    | { [fieldname: string]: Express.Multer.File[] }
    | undefined;

  console.log("Archivos recibidos:", files); // 👈

  const uploadedFiles: any = {};

  // Procesa document1 y document2 (1 archivo cada uno)
  for (const field of ["document1", "document2"]) {
    const file = files?.[field]?.[0];
    if (file) {
      const uploaded = await handleFileUpload(file);
      uploadedFiles[field] = {
        link: uploaded?.link ?? null,
        id: uploaded?.id ?? null,
      };
    }
  }

  // Procesa document3 (varios archivos)
  const doc3Files = files?.["document3"];
  if (Array.isArray(doc3Files) && doc3Files.length > 0) {
    const links: string[] = [];
    const ids: string[] = [];

    for (const file of doc3Files) {
      const uploaded = await handleFileUpload(file);
      if (uploaded?.link) {
        links.push(uploaded.link);
        ids.push(uploaded.id ?? ""); // nunca null en string[]
      }
    }

    uploadedFiles["document3"] = {
      link: links.length > 0 ? links : null,
      id: ids.length > 0 ? ids : null,
    };
  }

  return uploadedFiles;
};

// --- Limpia valores vacíos o nulos ---
function cleanEmptyValuesRecursively(obj: any): any {
  if (typeof obj !== "object" || obj === null) {
    if (
      typeof obj === "string" &&
      (obj.trim() === "" ||
        obj.toLowerCase() === "null" ||
        obj.toLowerCase() === "undefined")
    ) {
      return null;
    }
    if (typeof obj === "number" && (isNaN(obj) || !isFinite(obj))) {
      return null;
    }
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => cleanEmptyValuesRecursively(item));
  }

  const cleanedObj: any = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cleanedObj[key] = cleanEmptyValuesRecursively(obj[key]);
    }
  }
  return cleanedObj;
}

// --- Normaliza los datos del paciente ---
export const normalizePatientData = (rawData: any): any => {
  const data = { ...rawData };
  const result: Record<string, any> = {};

  for (const key in data) {
    let value = data[key];

    try {
      value = JSON.parse(value);
    } catch {
      // Mantener como string si no es JSON válido
    }

    const keys = key.split(".");
    if (keys.length === 1) {
      result[keys[0]] = value;
    } else {
      if (!result[keys[0]] || typeof result[keys[0]] !== "object") {
        result[keys[0]] = {};
      }
      result[keys[0]][keys[1]] = value;
    }
  }

  const jsonFields = [
    "howDidYouHear",
    "cardiovascular",
    "ophthalmological",
    "psychologicalPsychiatric",
    "diabetes",
    "hypertension",
    "allergies",
    "autoimmuneDiseases",
    "hematologicalDiseases",
    "respiratoryDiseases",
    "sleepApnea",
    "eatingDisorder",
    "currentMedicationUse",
    "otherDiseasesNotMentioned",
    "smoking",
    "drugs",
    "alcohol",
    "surgeryDetails",
  ];

  for (const field of jsonFields) {
    if (data[field] && typeof data[field] === "string") {
      try {
        data[field] = JSON.parse(data[field]);
      } catch (e) {
        console.error(`Error parsing JSON for field ${field}:`, data[field], e);
        data[field] = {};
      }
    }

    if (
      data[field] === null ||
      data[field] === "" ||
      data[field] === undefined
    ) {
      data[field] = {};
    }
  }

  const cleaned = cleanEmptyValuesRecursively(result);
  const uppercased = transformStringsToUppercase(cleaned);

  return uppercased;
};

/**
 * Elimina un archivo a partir de su URL completa
 * @param fileUrl URL completa del archivo (ej: http://localhost:8000/uploads/nombre.webp)
 */
export const deleteFileByUrl = (fileUrl: string) => {
  if (!fileUrl) return;

  try {
    const url = new URL(fileUrl);
    const fileName = path.basename(url.pathname); // ✅ "document3-xxx.webp"

    const filePath = path.resolve("uploads", fileName);

    console.log("🔍 Verificando si existe:", filePath);
    if (fs.existsSync(filePath)) {
      console.log("Intentando eliminar:", filePath);
      fs.unlinkSync(filePath);
      console.log("✅ Archivo eliminado:", filePath);
    } else {
      console.warn("⚠️ Archivo no encontrado:", filePath);
    }
  } catch (error) {
    console.error("❌ Error eliminando archivo:", error);
  }
};

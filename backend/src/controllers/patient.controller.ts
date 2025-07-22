import { NextFunction, Request, Response } from "express";
import { patientService } from "../services/patient.service";
import { MulterRequest } from "../interfaces/express.interface";
import {
  processPatientFiles,
  normalizePatientData,
  deleteFileByUrl,
} from "../utils/patient.utils";
import { Profile } from "../models/profile.model";
import { normalizePatientDataForFrontend } from "../utils/patient.data.normalizer";

const createPatientHandler = async (
  req: MulterRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("FILES:", req.files);

    const patientData = normalizePatientData(req.body);
    const uploadedFileDetails = await processPatientFiles(req);

    const newPatientDataToSave = {
      ...patientData,
      document1: uploadedFileDetails.document1?.link,
      document2: uploadedFileDetails.document2?.link,
      document3: uploadedFileDetails.document3?.link,
    };

    const newPatient = await patientService.createPatient(newPatientDataToSave);
    const responsePatient = normalizePatientDataForFrontend(newPatient);
    res.json(responsePatient);
  } catch (error: any) {
    next(error);
  }
};

const getPatientByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const patient = await patientService.getPatientById(id);
    if (!patient) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }

    const responsePatient = normalizePatientDataForFrontend(patient.toJSON());
    res.json(responsePatient);
  } catch (error: any) {
    next(error);
  }
};

const updatePatientHandler = async (
  req: MulterRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("📌 Entrando a updatePatientHandler");
    const { id } = req.params;

    const existingPatient = await patientService.getPatientById(id);
    if (!existingPatient) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }

    const patientData = normalizePatientData(req.body);
    const uploadedFileDetails = await processPatientFiles(req);

    console.log("📦 Archivos subidos:", uploadedFileDetails);
    console.log("📨 Body recibido:", req.body);

    const updatedDataToSave: Record<string, any> = { ...patientData };

    // === document1 y document2 ===
    for (const field of ["document1", "document2"] as const) {
      const oldValue = existingPatient.get(field);
      const uploaded = uploadedFileDetails[field];

      const deleteFieldKey = `${field}_delete`;
      const shouldDelete = req.body[deleteFieldKey] === "true";

      if (shouldDelete) {
        if (typeof oldValue === "string") deleteFileByUrl(oldValue);
        updatedDataToSave[field] = null;
      } else if (uploaded?.link) {
        if (typeof oldValue === "string" && oldValue !== uploaded.link) {
          deleteFileByUrl(oldValue);
        }
        updatedDataToSave[field] = uploaded.link;
      } else {
        updatedDataToSave[field] = oldValue;
      }
    }

    // === document3 - Manejo mejorado ===
    const oldArray = Array.isArray(existingPatient.document3)
      ? existingPatient.document3
      : [];

    const uploaded = uploadedFileDetails.document3?.link ?? [];

    // 1. Manejo especial cuando se solicita eliminación completa
    if (req.body.document3_delete === "true") {
      oldArray.forEach(deleteFileByUrl);
      updatedDataToSave.document3 = [];
    }
    // 2. Manejo normal cuando hay imágenes para preservar/actualizar
    else {
      let preservedFromFrontend: string[] = [];

      try {
        const rawValue =
          req.body["existingDocument3"] ?? req.body["existingDocument3[]"];
        console.log("🧪 existingDocument3[] crudo:", rawValue);

        // Caso especial: array vacío explícito
        if (rawValue === "[]") {
          preservedFromFrontend = [];
        }
        // Caso string (única URL o string vacío)
        else if (typeof rawValue === "string") {
          preservedFromFrontend = rawValue === "" ? [] : [rawValue];
        }
        // Caso array de URLs
        else if (Array.isArray(rawValue)) {
          preservedFromFrontend = rawValue.filter(
            (url) => typeof url === "string" && url !== ""
          );
        }
        // Caso no proporcionado (usar valores existentes)
        else {
          preservedFromFrontend = oldArray;
        }
      } catch (e) {
        console.error("❌ Error al parsear existingDocument3[]:", e);
        preservedFromFrontend = oldArray;
      }

      console.log("✅ Imagenes preservadas:", preservedFromFrontend);
      console.log("➕ Nuevas subidas:", uploaded);

      const newArray = [...preservedFromFrontend, ...uploaded];
      const removed = oldArray.filter((url) => !newArray.includes(url));

      console.log("🗑️ Archivos a eliminar:", removed);
      removed.forEach(deleteFileByUrl);

      updatedDataToSave.document3 = newArray;
    }

    // Asegurar que las banderas lleguen al service
    updatedDataToSave.document1_delete = req.body.document1_delete;
    updatedDataToSave.document2_delete = req.body.document2_delete;
    updatedDataToSave.document3_delete = req.body.document3_delete;

    const updatedPatient = await patientService.updatePatientById(
      id,
      updatedDataToSave
    );

    console.log("✅ Paciente actualizado con éxito");
    res.json(normalizePatientDataForFrontend(updatedPatient.toJSON()));
  } catch (error: any) {
    console.error("🔥 Error en updatePatientHandler:", error);
    next(error);
  }
};

const deletePatientHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const patient = await patientService.getPatientById(id);

    if (!patient) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }

    if (patient.document1) deleteFileByUrl(patient.document1);
    if (patient.document2) deleteFileByUrl(patient.document2);
    if (Array.isArray(patient.document3)) {
      patient.document3.forEach(deleteFileByUrl);
    }

    const deletedPatient = await patientService.deletePatientById(id);
    res.json(deletedPatient.toJSON ? deletedPatient.toJSON() : deletedPatient);
  } catch (error: any) {
    next(error);
  }
};

const getAllPatientsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const patients = await patientService.getAllPatients();
    const normalized = patients.map((p) =>
      normalizePatientDataForFrontend(p.toJSON())
    );
    res.json(normalized);
  } catch (error: any) {
    next(error);
  }
};

export const patientController = {
  createPatientHandler,
  getPatientByIdHandler,
  updatePatientHandler,
  deletePatientHandler,
  getAllPatientsHandler,
};

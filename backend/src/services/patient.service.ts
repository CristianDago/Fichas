import fs from "fs";
import path from "path";
import { Profile } from "../models/profile.model";
import { HttpError } from "../utils/http.error.util";
import { validateField } from "../utils/validation.utils";
import {
  PatientCreationAttributes,
  PatientUpdateAttributes,
} from "../interfaces/patient.backend.interface";

const alreadyDeletedFiles = new Set<string>();

const deleteFileFromServer = (filePath: string) => {
  const filename = path.basename(filePath);
  const absolutePath = path.resolve("uploads", filename);

  if (alreadyDeletedFiles.has(absolutePath)) return;

  alreadyDeletedFiles.add(absolutePath);

  fs.access(absolutePath, fs.constants.F_OK, (err) => {
    if (!err) {
      fs.unlink(absolutePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error(
            `❌ Error al eliminar archivo: ${absolutePath}`,
            unlinkErr
          );
        } else {
        }
      });
    } else {
      console.warn(`⚠️ Archivo no encontrado para eliminar: ${absolutePath}`);
    }
  });
};

class PatientService {
  async createPatient(
    patientData: PatientCreationAttributes
  ): Promise<Profile> {
    const { name, lastname } = patientData;

    validateField(name, "El nombre");
    validateField(lastname, "El apellido");

    if (patientData.cardiovascular)
      this.validateJsonField(
        patientData.cardiovascular,
        ["present"],
        "Cardiovascular"
      );
    if (patientData.diabetes)
      this.validateJsonField(patientData.diabetes, ["present"], "Diabetes");
    if (patientData.hypertension)
      this.validateJsonField(
        patientData.hypertension,
        ["present"],
        "Hipertensión"
      );
    if (patientData.surgeryDetails)
      this.validateJsonField(
        patientData.surgeryDetails,
        ["type", "anesthesiaType", "adverseEffect"],
        "Detalles quirúrgicos"
      );

    return await Profile.create(patientData);
  }

  async getPatientById(id: string): Promise<Profile | null> {
    return await Profile.findByPk(id);
  }

  async deletePatientById(id: string): Promise<Profile> {
    const patient = await Profile.findByPk(id);
    if (!patient)
      throw new HttpError("No se encontró el paciente para eliminar", 404);

    if (patient.document1) deleteFileFromServer(patient.document1);
    if (patient.document2) deleteFileFromServer(patient.document2);

    const imagePaths = patient.document3;
    if (Array.isArray(imagePaths)) {
      imagePaths.forEach((img) => {
        if (typeof img === "string") deleteFileFromServer(img);
      });
    }

    await patient.destroy();
    return patient;
  }

  async updatePatientById(
    id: string,
    patientData: PatientUpdateAttributes
  ): Promise<Profile> {
    const patientToUpdate = await Profile.findByPk(id);
    if (!patientToUpdate) {
      throw new HttpError(
        "No se pudo actualizar el paciente: ID inválido",
        400
      );
    }

    // === DOCUMENTO 1 ===
    if (
      (patientData as any).document1_delete === "true" &&
      patientToUpdate.document1
    ) {
      deleteFileFromServer(patientToUpdate.document1);
      patientData.document1 = null;
    }

    // === DOCUMENTO 2 ===
    if (
      (patientData as any).document2_delete === "true" &&
      patientToUpdate.document2
    ) {
      deleteFileFromServer(patientToUpdate.document2);
      patientData.document2 = null;
    }

    // Modifica la parte de document3_delete
    if ((patientData as any).document3_delete === "true") {
      if (Array.isArray(patientToUpdate.document3)) {
        patientToUpdate.document3.forEach((img) => {
          if (typeof img === "string" && img !== "") {
            deleteFileFromServer(img);
          }
        });
      }
      patientData.document3 = []; // Forzar array vacío
    }

    // ✅ Luego, si se mandó arreglo parcial, comparamos y eliminamos las diferencias
    else if (
      Array.isArray(patientToUpdate.document3) &&
      Array.isArray(patientData.document3)
    ) {
      const nuevas = patientData.document3.filter(
        (item) => typeof item === "string"
      );
      const eliminadas = patientToUpdate.document3.filter(
        (anterior) => !nuevas.includes(anterior)
      );
      eliminadas.forEach((img) => deleteFileFromServer(img));
    }

    // Validaciones de campos JSON
    if (patientData.cardiovascular)
      this.validateJsonField(
        patientData.cardiovascular,
        ["present"],
        "Cardiovascular"
      );
    if (patientData.diabetes)
      this.validateJsonField(patientData.diabetes, ["present"], "Diabetes");
    if (patientData.hypertension)
      this.validateJsonField(
        patientData.hypertension,
        ["present"],
        "Hipertensión"
      );
    if (patientData.surgeryDetails)
      this.validateJsonField(
        patientData.surgeryDetails,
        ["type", "anesthesiaType", "adverseEffect"],
        "Detalles quirúrgicos"
      );

    return await patientToUpdate.update(patientData);
  }

  async getAllPatients(): Promise<Profile[]> {
    return await Profile.findAll();
  }

  private validateJsonField(
    field: any,
    requiredKeys: string[],
    fieldName: string
  ) {
    if (!field || typeof field !== "object") {
      throw new HttpError(`${fieldName} debe ser un objeto JSON`, 400);
    }
    for (const key of requiredKeys) {
      if (!(key in field)) {
        throw new HttpError(
          `${fieldName} debe contener la clave "${key}"`,
          400
        );
      }
    }
  }
}

export const patientService = new PatientService();

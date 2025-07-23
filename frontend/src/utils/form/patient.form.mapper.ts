import { PatientData } from "../../interface/patient/patient.interface.props";

export const mapPatientToFormData = (
  data: PatientData,
  isUpdate: boolean = false
): FormData => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (key === "document1") {
      if (value instanceof File) {
        formData.append("document1", value);
      } else if (value === null && isUpdate) {
        formData.append("document1_delete", "true");
      } else if (typeof value === "string" && value !== "") {
        formData.append("document1_existing", value);
      }
      return;
    }

    if (key === "document2") {
      if (value instanceof File) {
        formData.append("document2", value);
      } else if (value === null && isUpdate) {
        formData.append("document2_delete", "true");
      } else if (typeof value === "string" && value !== "") {
        formData.append("document2_existing", value);
      }
      return;
    }

    if (key === "document3") {
      const document3Value = value === null || value === undefined ? [] : value;
      const safeArray = Array.isArray(document3Value) ? document3Value : [];

      const newFiles = safeArray.filter(
        (item) => item instanceof File
      ) as File[];
      const existingUrls = safeArray.filter(
        (item) => typeof item === "string" && item !== ""
      ) as string[];

      newFiles.forEach((file) => {
        formData.append("document3", file);
      });

      existingUrls.forEach((url) => {
        formData.append("existingDocument3[]", url);
      });
      if (isUpdate && newFiles.length === 0 && existingUrls.length === 0) {
        formData.append("document3_delete", "true");
      }

      return;
    }

    if (
      typeof value === "object" &&
      value !== null &&
      !(value instanceof File) &&
      !Array.isArray(value)
    ) {
      formData.append(key, JSON.stringify(value));
    } else if (typeof value === "string" || typeof value === "number") {
      formData.append(key, String(value));
    } else if (typeof value === "boolean") {
      formData.append(key, value ? "true" : "false");
    }
  });

  return formData;
};

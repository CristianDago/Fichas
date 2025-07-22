// src/utils/patient.data.normalizer.ts

// Asegúrate de que esta lista de campos JSON sea precisa y coincida con tu modelo de Sequelize
const JSON_FIELDS = [
    'howDidYouHear', 'cardiovascular', 'ophthalmological', 'psychologicalPsychiatric',
    'diabetes', 'hypertension', 'allergies', 'autoimmuneDiseases', 'hematologicalDiseases',
    'respiratoryDiseases', 'sleepApnea', 'eatingDisorder', 'currentMedicationUse',
    'otherDiseasesNotMentioned', 'smoking', 'drugs', 'alcohol'
];

// Asegúrate de que esta lista de campos que pueden ser null y se quieren como undefined
// sea precisa y coincida con las expectativas de tu frontend.
const NULLABLE_TO_UNDEFINED_FIELDS = [
    'rut', 'age', 'weight', 'height', 'imc', 'email', 'phone', 'children',
    'occupation', 'reasonForConsultation', 'gender', 'physicalActivity',
    'suggestedTreatmentBySurgeon', 'patientDecidedTreatment',
    'document1', 'document2', 'document3'
];

/**
 * Intenta parsear una cadena como JSON. Si tiene éxito y el resultado es un objeto, lo devuelve.
 * Maneja cadenas JSON normales y cadenas doblemente escapadas.
 * Si falla, retorna un objeto vacío para campos JSON.
 * @param value El valor a parsear.
 * @returns El objeto parseado, o el valor original, o un objeto vacío si falla el parseo de un JSON esperado.
 */
export const parseJsonStringIfValid = (value: any): any => {
    if (typeof value === 'string' && (value.startsWith('{') || value.startsWith('['))) {
        try {
            let parsed = JSON.parse(value);
            // Detectar y parsear JSONs doblemente escapados (ej. de MySQL o de algún middleware)
            if (typeof parsed === 'string' && (parsed.startsWith('{"0":"{') || parsed.startsWith('{"present":'))) {
                parsed = JSON.parse(parsed);
            }
            if (typeof parsed === 'object' && parsed !== null) {
                return parsed;
            }
        } catch (e: any) {
            console.warn(`WARN: [Backend JSON Parse Issue] Falló el parseo de JSON en cadena: '${value}'. Error: ${e.message}`);
            return {}; // Retorna un objeto vacío para campos JSON que no se pudieron parsear.
        }
    }
    return value;
};

/**
 * Normaliza un objeto de paciente (generalmente de Sequelize.toJSON()) para ser enviado al frontend.
 * - Parsea cadenas JSON a objetos JavaScript.
 * - Convierte `null` a `undefined` para campos específicos esperados por el frontend.
 * - Asegura que los campos JSON sean siempre objetos (nunca `null`).
 * @param patientObj El objeto paciente plano (resultado de Sequelize.toJSON()).
 * @returns Un objeto paciente normalizado y listo para el frontend.
 */
export const normalizePatientDataForFrontend = (patientObj: any): any => {
    const newPatientObj: any = { ...patientObj };

    // 1. Parsear campos JSON que son cadenas en el objeto
    for (const field of JSON_FIELDS) {
        newPatientObj[field] = parseJsonStringIfValid(newPatientObj[field]);
        // Si después de parsear, el campo es `null` o no es un objeto (ej. era una cadena vacía ""),
        // lo forzamos a ser un objeto vacío {} para consistencia con el frontend.
        if (newPatientObj[field] === null || typeof newPatientObj[field] !== 'object') {
            newPatientObj[field] = {};
        }
    }

    // 2. Manejo específico para `surgeryDetails` (tiene JSONs anidados)
    if (newPatientObj.surgeryDetails) {
        newPatientObj.surgeryDetails = parseJsonStringIfValid(newPatientObj.surgeryDetails);
        if (typeof newPatientObj.surgeryDetails === 'object' && newPatientObj.surgeryDetails !== null) {
            newPatientObj.surgeryDetails.type = newPatientObj.surgeryDetails.type || {};
            newPatientObj.surgeryDetails.anesthesiaType = newPatientObj.surgeryDetails.anesthesiaType || {};
            newPatientObj.surgeryDetails.adverseEffect = newPatientObj.surgeryDetails.adverseEffect || {};
        } else {
            // Fallback si `surgeryDetails` completo no es un objeto válido
            newPatientObj.surgeryDetails = { type: {}, anesthesiaType: {}, adverseEffect: {} };
        }
    } else {
        newPatientObj.surgeryDetails = { type: {}, anesthesiaType: {}, adverseEffect: {} };
    }

    // 3. Convertir `null` a `undefined` para campos específicos
    for (const field of NULLABLE_TO_UNDEFINED_FIELDS) {
        if (newPatientObj[field] === null) {
            newPatientObj[field] = undefined;
        }
    }
    
    return newPatientObj;
};
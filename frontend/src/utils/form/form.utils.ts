// src/utils/form.utils.ts

/**
 * Actualiza una propiedad anidada en un objeto de forma inmutable.
 * @param obj El objeto base a actualizar.
 * @param path Un array de strings que representa la ruta de la propiedad anidada (ej. ['surgeryDetails', 'type', 'selected']).
 * @param val El nuevo valor para la propiedad anidada.
 * @returns Un nuevo objeto con la propiedad anidada actualizada.
 */
export const updateNested = (obj: any, path: string[], val: any): any => {
    const newObj = JSON.parse(JSON.stringify(obj)); // Copia profunda para inmutabilidad
    let current = newObj;
    for (let i = 0; i < path.length - 1; i++) {
      if (!current[path[i]]) {
        current[path[i]] = {}; // Inicializa el objeto anidado si no existe
      }
      current[path[i]] = { ...current[path[i]] }; // Clonar el objeto anidado para inmutabilidad
      current = current[path[i]];
    }
    current[path[path.length - 1]] = val;
    return newObj;
  };
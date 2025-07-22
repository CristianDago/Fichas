// src/config/database.ts

import { sequelizeProfile, sequelizeUser } from "./sequelize";

export const initializeDatabases = async (runDbSync: boolean, forceSync: boolean) => {
  try {
    if (runDbSync) {
      console.log("INFO: DB_SYNC_ON_STARTUP está en 'true'. Iniciando sincronización de bases de datos..."); // Informativo de sincronización

      // --- MANEJO DE sequelizeUser ---
      await sequelizeUser.authenticate();
      await sequelizeUser.sync({ force: forceSync });
      console.log("INFO: Base de datos de Usuarios conectada y sincronizada."); // Informativo de éxito

      // --- MANEJO DE sequelizeProfile ---
      await sequelizeProfile.authenticate();
      await sequelizeProfile.sync({ force: forceSync });
      console.log("INFO: Base de datos de Perfiles conectada y sincronizada."); // Informativo de éxito

      console.log("INFO: Todas las bases de datos requeridas conectadas y sincronizadas."); // Resumen de éxito
    } else {
      console.log("INFO: Iniciando con solo autenticación de bases de datos (sin sincronizar)..."); // Informativo de autenticación

      // --- AUTENTICANDO sequelizeUser ---
      await sequelizeUser.authenticate();
      console.log("INFO: Base de datos de Usuarios conectada."); // Informativo de éxito

      // --- AUTENTICANDO sequelizeProfile ---
      await sequelizeProfile.authenticate();
      console.log("INFO: Base de datos de Perfiles conectada."); // Informativo de éxito

      console.log("INFO: Todas las bases de datos requeridas conectadas."); // Resumen de éxito
    }
  } catch (error: any) {
    console.error("ERROR: Fallo crítico al conectar o sincronizar bases de datos. Detalles:", error.message || error); // ERROR CRÍTICO, SIEMPRE DEBE QUEDAR
    process.exit(1); // Sale del proceso si la DB no puede conectarse/sincronizarse
  }
};

export const closeDatabases = async () => {
  try {
    await sequelizeUser.close();
    console.log("INFO: Conexión a la base de datos de Usuarios cerrada."); // Informativo de cierre

    await sequelizeProfile.close();
    console.log("INFO: Conexión a la base de datos de Perfiles cerrada."); // Informativo de cierre
    
  } catch (error: any) {
    console.error("ERROR: Fallo al cerrar conexiones a la base de datos. Detalles:", error.message || error); // ERROR CRÍTICO, SIEMPRE DEBE QUEDAR
  }
};
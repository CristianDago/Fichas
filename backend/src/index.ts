import "reflect-metadata";
import "dotenv/config";
import app from "./app";
import { createServer } from "http";
import { initializeDatabases, closeDatabases } from "./config/database";

const port = process.env.PORT || 3000;

const server = createServer(app);
const main = async () => {
  const runDbSync = process.env.DB_SYNC_ON_STARTUP === "true";
  const forceSync = process.env.DB_FORCE_SYNC === "true";

  // Inicializa las bases de datos
  await initializeDatabases(runDbSync, forceSync);

  server.listen(port, () => {
    console.log(`Servidor encendido en puerto ${port}`); // Este es un log informativo, está bien
  });

  // Configuración del apagado elegante
  const gracefulShutdown = async (signal: string) => {
    console.log(`${signal} recibida. Iniciando apagado...`); // Log informativo

    try {
      await new Promise<void>((resolve, reject) => {
        server.close((err) => {
          if (err) {
            console.error("Error cerrando el servidor HTTP:", err);
            return reject(err);
          }
          console.log("Servidor HTTP cerrado."); // Log informativo
          resolve();
        });
      });

      await closeDatabases();
      console.log("Conexiones a bases de datos cerradas."); // Log informativo

      process.exit(0);
    } catch (error: any) {
      console.error("Error durante el apagado elegante:", error.message || error); // Log de error, es crucial
      process.exit(1);
    }
  };

  process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
  process.on("SIGINT", () => gracefulShutdown("SIGINT"));
};

main();
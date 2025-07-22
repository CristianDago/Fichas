import { Router, Request, Response, NextFunction } from "express";
import { patientController } from "../controllers/patient.controller";
import { verifyToken } from "../middlewares/jwt.middlewares";
import { upload } from "../middlewares/multer.middleware";
import { MulterRequest } from "../interfaces/express.interface";

const router = Router();

// Autenticación para todas las rutas
router.use(verifyToken);

// Obtener todos los pacientes
router.get("/", patientController.getAllPatientsHandler);

// Crear paciente
router.post(
  "/",
  upload.fields([
    { name: "document1", maxCount: 1 },
    { name: "document2", maxCount: 1 },
    { name: "document3", maxCount: 10 },
  ]),
  async (req: Request, res: Response, next: NextFunction) => {
    await patientController.createPatientHandler(
      req as MulterRequest,
      res,
      next
    );
  }
);

// Obtener paciente por ID
router.get("/:id", patientController.getPatientByIdHandler);

// Actualizar paciente
router.put(
  "/:id",
  upload.fields([
    { name: "document1", maxCount: 1 },
    { name: "document2", maxCount: 1 },
    { name: "document3", maxCount: 10 },
  ]),
  async (req: Request, res: Response, next: NextFunction) => {
    await patientController.updatePatientHandler(
      req as MulterRequest,
      res,
      next
    );
  }
);

// Eliminar paciente
router.delete("/:id", patientController.deletePatientHandler);

export default router;

import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { verifyToken } from "../middlewares/jwt.middlewares";

const router = Router();

router.post("/", authController.handleLogin);
router.post("/register", verifyToken, authController.handleRegister);

export default router;

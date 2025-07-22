import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { verifyToken } from "../middlewares/jwt.middlewares";

const router = Router();

router.use(verifyToken);

router.get("/", userController.getAllUsersHandler);

router.post("/", userController.createUserHandler);

router.get("/:id", userController.getUserByIdHandler);

router.put("/:id", userController.updateUserHandler);

router.delete("/:id", userController.deleteUserHandler);

export default router;

import { NextFunction, Request, Response } from "express";
import { authService } from "../services/auth.service";
import { HttpError } from "../utils/http.error.util";
import { userLoginSchema, userRegisterSchema } from "../schemas/auth.schemas";
const handleLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = userLoginSchema.validate(req.body);
    if (error) {
      throw new HttpError(error.message, 400);
    }
    const { email, password } = value;
    const token = await authService.authenticateUser(email, password);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};
const handleRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error, value } = userRegisterSchema.validate(req.body);
    if (error) {
      throw new HttpError(error.message, 400);
    }
    const { email, password, role } = value;
    const token = await authService.createUserAccount(email, password, role);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

export const authController = {
  handleLogin,
  handleRegister,
};

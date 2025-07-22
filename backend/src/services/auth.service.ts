import bcryptjs from "bcryptjs";
import { userService } from "./user.service";
import { allowedRoles } from "../interfaces/user.interface";
import { generateAccessToken } from "../utils/auth.util";
import { HttpError } from "../utils/http.error.util";

const authenticateUser = async (email: string, password: string) => {
  const user = await userService.findUserByEmail(email);

  if (!user) {
    throw new HttpError("El email no está registrado", 404);
  }

  const { email: userEmail, id: userId, password: userPassword } = user.get();

  if (!userEmail || !userId) {
    throw new HttpError("Error interno: datos del usuario incompletos", 500);
  }

  const isValidPassword = await bcryptjs.compare(password, userPassword);
  if (!isValidPassword) {
    throw new HttpError("La contraseña es incorrecta", 401);
  }

  const token = generateAccessToken(userEmail, userId);
  return token;
};

const createUserAccount = async (
  email: string,
  password: string,
  role: allowedRoles
) => {
  const newUser = await userService.registerUser(email, password, role);

  const user = newUser.get();

  const token = generateAccessToken(user.email, user.id);
  return token;
};

export const authService = {
  authenticateUser,
  createUserAccount,
};

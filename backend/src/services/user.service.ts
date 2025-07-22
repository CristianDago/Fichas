import { User } from "../models/user.model";
import { allowedRoles } from "../interfaces/user.interface";
import { HttpError } from "../utils/http.error.util";
import bcryptjs from "bcryptjs";

const allowedRolesArray: allowedRoles[] = [
  "admin",
  "catcher",
  "editor",
  "visit",
];

const registerUser = async (
  email: string,
  password: string,
  role: allowedRoles
) => {
  const existingUser = await User.findOne({ where: { email } });

  if (!allowedRolesArray.includes(role)) {
    throw new HttpError("El rol no es válido.", 403);
  }
  if (existingUser) {
    throw new HttpError("El email ya está registrado", 409);
  }
  const salt = await bcryptjs.genSalt(10);
  const passwordHashed = await bcryptjs.hash(password, salt);

  const newUser = (await User.create({
    email: email.toLowerCase(),
    password: passwordHashed,
    role,
  })) as User;

  return newUser;
};

const findUserById = async (id: string) => {
  const user = await User.findByPk(id);
  if (!user) throw new HttpError("El ID de usuario no es válido", 404);

  const { password, ...sanitizedUser } = user.toJSON();
  return sanitizedUser;
};

const findUserByEmail = async (email: string) => {
  const user = await User.findOne({ where: { email: email.toLowerCase() } });
  if (!user) throw new HttpError("El email no se encuentra registrado", 404);

  return user;
};

const modifyUserById = async (
  id: string,
  email: string,
  password: string,
  role: allowedRoles
) => {
  if (!allowedRolesArray.includes(role as allowedRoles)) {
    throw new HttpError("El rol no es válido.", 403);
  }

  const user = await User.findByPk(id);
  if (!user) {
    throw new HttpError("No se pudo actualizar el usuario: ID inválido", 400);
  }

  const salt = await bcryptjs.genSalt(10);
  const passwordHashed = await bcryptjs.hash(password, salt);

  await user.update({ email, password: passwordHashed, role });

  const { password: _, ...sanitizedUser } = user.get();
  return sanitizedUser;
};

const removeUserById = async (id: string) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new HttpError("No se encontró el usuario para eliminar", 404);
  }

  await user.destroy();
  return { message: "Usuario eliminado correctamente" };
};

const listAllUsers = async () => {
  const users = await User.findAll();
  if (!users.length) {
    throw new HttpError("No se encontraron usuarios registrados", 404);
  }

  const sanitizedUsers = users.map((user) => {
    const { password, ...rest } = user.get();
    return rest;
  });

  return sanitizedUsers;
};

export const userService = {
  registerUser,
  findUserById,
  findUserByEmail,
  removeUserById,
  modifyUserById,
  listAllUsers,
};

import Joi from "joi";

export const allowedRolesArray = ["admin", "catcher", "editor", "visit"];

const emailSchema = Joi.string().email().required().messages({
  "string.email": "El formato del correo electrónico es inválido.",
  "string.empty": "El campo de correo electrónico no puede estar vacío.",
  "any.required": "El correo electrónico es obligatorio.",
});

const passwordSchema = Joi.string().min(6).required().messages({
  "string.min": "La contraseña debe tener al menos 6 caracteres.",
  "string.empty": "El campo de contraseña no puede estar vacío.",
  "any.required": "La contraseña es obligatoria.",
});

const roleSchema = Joi.string()
  .valid(...allowedRolesArray)
  .required()
  .messages({
    "any.only": `El rol debe ser uno de los siguientes: ${allowedRolesArray.join(
      ", "
    )}.`,
    "any.required": "El rol es obligatorio.",
    "string.empty": "El campo de rol no puede estar vacío.",
  });

export const userLoginSchema = Joi.object({
  email: emailSchema,
  password: passwordSchema,
});

export const userRegisterSchema = Joi.object({
  email: emailSchema,
  password: passwordSchema,
  role: roleSchema,
});

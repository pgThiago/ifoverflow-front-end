import { z } from "zod";

const validationSchema = {
  email: validateEmail(),
  password: validatePassword(),
};

function validateEmail() {
  return z
    .string()
    .nonempty({ message: "Digite seu e-mail" })
    .email({
      message: "E-mail inválido",
    })
    .toLowerCase()
    .refine((email) => {
      return (
        email.endsWith("@gmail.com") ||
        email.endsWith("@outlook.com") ||
        email.endsWith("@hotmail.com")
      );
    }, "Só aceitamos gmail.com, outlook.com ou hotmail.com");
}

function validatePassword() {
  return z
    .string()
    .nonempty({
      message: "Senha é obrigatória",
    })
    .min(4, {
      message: "Pelo menos 4 caracteres",
    });
}

export const signInValidationSchema = z.object(validationSchema);

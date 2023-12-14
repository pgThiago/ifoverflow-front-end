import { z } from "zod";

const validationSchema = {
  name: validateName(),
  state: validateState(),
  campus: validateCampus(),
  email: validateEmail(),
  password: validatePassword(),
  confirmPassword: validateConfirmPassword(),
};

function validateName() {
  return z
    .string()
    .nonempty({
      message: "Nome é obrigatório",
    })
    .min(3, {
      message: "Pelo menos 3 caracteres",
    });
}

function validateState() {
  return z.string().nonempty({
    message: "Selecione o estado",
  });
}

function validateCampus() {
  return z.string().nonempty({
    message: "Selecione o campus",
  });
}

function validateEmail() {
  return z
    .string()
    .nonempty({ message: "E-mail é obrigatório" })
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
    }, "Por favor, use gmail.com, outlook.com ou hotmail.com");
}

// function validatePassword() {
//   return z
//     .string()
//     .nonempty({
//       message: "Senha é obrigatória",
//     })
//     .min(8, {
//       message: "Pelo menos 8 caracteres",
//     })
//     .regex(
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
//       {
//         message: `- Pelo menos uma letra minúscula (a-z).- Pelo menos uma letra maiúscula (A-Z).- Pelo menos um dígito (0-9).- Pelo menos um caractere especial: "@", "$", "!", "%", "*", "?", ou "&".- Pelo menos 8 caracteres.`,
//       }
//     );
// }

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

function validateConfirmPassword() {
  return z.string().nonempty({ message: "Confirme a senha" });
}

const matchPassword = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => password === confirmPassword;

export const signUpValidationSchema = z
  .object(validationSchema)
  .refine(matchPassword, {
    message: "Confirmação incorreta: senhas diferentes",
    path: ["confirmPassword"],
  });

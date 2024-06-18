import {
  regexMinimum8Characters,
  regexAtLeast1LetterUppercase,
  regexAtLeast1LetterLowercase,
  regexAtLeast1SpecialCharacter,
} from "@/constants";
import { object, ref, string } from "yup";

export const userAdminSchema = object({
  name: string().required("Nome é obrigatório"),
  email: string()
    .email("Por favor informe um endereço de e-mail válido")
    .required("Email é obrigatório"),
  password: string()
    .required("Campo obrigatório")
    .matches(regexMinimum8Characters, "Senha inválida, minímo 8 caracteres")
    .matches(
      regexAtLeast1LetterUppercase,
      "Informe ao menos uma letra maiscúla"
    )
    .matches(
      regexAtLeast1LetterLowercase,
      "Informe ao menos uma letra minúscula"
    )
    .matches(
      regexAtLeast1SpecialCharacter,
      "Informe ao menos um caractere especial"
    ),
  password_confirmation: string()
    .required("Campo obrigatório")
    .oneOf([ref("password")], "Confirmação de senha inválida"),
});

export const userAdminUpdateSchema = object({
  name: string().required("Nome é obrigatório"),
  email: string()
    .email("Por favor informe um endereço de e-mail válido")
    .required("Email é obrigatório"),
});

import {
  regexMinimum8Characters,
  regexAtLeast1LetterUppercase,
  regexAtLeast1LetterLowercase,
  regexAtLeast1SpecialCharacter,
} from "@/constants";
import { object, string } from "yup";

export const signInSchema = object({
  email: string().required("Campo obrigatório").email("E-mail inválido"),
  password: string()
    .required("Campo obrigatório")
    .matches(regexMinimum8Characters, "Senha inválida")
    .matches(regexAtLeast1LetterUppercase, "Senha inválida")
    .matches(regexAtLeast1LetterLowercase, "Senha inválida")
    .matches(regexAtLeast1SpecialCharacter, "Senha inválida"),
});

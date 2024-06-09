import { object, string } from "yup";

export const companySchema = object({
  name: string().required("Nome é obrigatório"),
  phone: string()
    .max(11, "Telefone inválido")
    .required("Telefone é obrigatório"),
  preview: string().required("Imagem é obrigatória"),
});

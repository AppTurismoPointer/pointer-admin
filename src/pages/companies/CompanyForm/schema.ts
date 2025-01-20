import { object, string, mixed } from "yup";

export const companySchema = object({
  name: string().required("Nome é obrigatório"),
  phone: string()
    .max(11, "Telefone inválido")
    .required("Telefone é obrigatório"),
  preview: string().required("Imagem é obrigatória"),
  accept_reservation: mixed<"true" | "false">()
    .oneOf(["true", "false"], "Valor inválido")
    .required("Campo obrigatório"),
});

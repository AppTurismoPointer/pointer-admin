import { object, string } from "yup";

export const locationSchema = object({
  name: string().required("Nome é obrigatório"),
  state_id: string().required("Cidade é obrigatória"),
  city_id: string().required("Estado é obrigatório"),
  preview: string().required("Imagem é obrigatória"),
  description: string()
    .min(50, "Descrição precisa ter no no mínimo 50 caracteres")
    .required("Descrição é obrigatória"),
});

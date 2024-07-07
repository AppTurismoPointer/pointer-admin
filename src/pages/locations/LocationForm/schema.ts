import { object, string } from "yup";

export const locationSchema = object({
  name: string().required("Nome é obrigatório"),
  state_id: string().required("Estado é obrigatório"),
  city_id: string().required("Cidade/localidade é obrigatória"),
  preview: string().required("Imagem é obrigatória"),
  description: string()
    .min(5, "Descrição precisa ter no no mínimo 5 caracteres")
    .required("Descrição é obrigatória"),
});

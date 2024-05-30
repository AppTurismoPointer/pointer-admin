import { object, string } from "yup";

export const locationSchema = object({
  name: string().required("Nome é obrigatório"),
  state_id: string().required("Cidade é obrigatória"),
  city_id: string().required("Estado é obrigatório"),
  preview: string().required("Imagem é obrigatória"),
});

import { object, string } from "yup";

export const updateCategorySchema = object({
  name: string().required("Nome é obrigatório"),
});

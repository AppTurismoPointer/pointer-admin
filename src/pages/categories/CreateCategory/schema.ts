import { object, string } from "yup";

export const createCategorySchema = object({
  name: string().required("Nome é obrigatório"),
});

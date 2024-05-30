import { object, string } from "yup";

export const categorySchema = object({
  name: string().required("Nome é obrigatório"),
});

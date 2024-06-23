import { object, string } from "yup";

export const citySchema = object({
  name: string().required("Nome é obrigatório"),
});

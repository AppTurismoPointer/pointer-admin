import { fileSchema } from "@/utils";
import { object, string } from "yup";

export const updateLocationSchema = object({
  name: string().required("Nome é obrigatório"),
  state_id: string().required("Cidade é obrigatória"),
  city_id: string().required("Estado é obrigatório"),
  file: fileSchema,
});

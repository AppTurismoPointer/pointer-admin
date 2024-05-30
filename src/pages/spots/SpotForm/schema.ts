import { object, string, number } from "yup";

export const spotSchema = object({
  name: string().required("Nome é obrigatório"),
  state_id: string().required("Cidade é obrigatória"),
  city_id: string().required("Estado é obrigatório"),
  category_id: string().required("Categoria é obrigatória"),
  latitude: number()
    .min(-90, "Latitude inválida")
    .max(90, "Latitude inválida")
    .required("Longitude é obrigatória"),
  longitude: number()
    .min(-180, "Latitude inválida")
    .max(180, "Latitude inválida")
    .required("Longitude é obrigatória"),
  preview: string().required("Imagem é obrigatória"),
});

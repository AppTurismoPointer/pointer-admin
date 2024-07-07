import { SpotType } from "@/services/spot.service";
import { object, string, number, mixed, bool } from "yup";

export const spotSchema = object({
  name: string().required("Nome é obrigatório"),
  state_id: string().required("Cidade é obrigatória"),
  city_id: string().required("Estado é obrigatório"),
  category_id: string().required("Categoria é obrigatória"),
  company_id: string().required("Empresa é obrigatória"),
  latitude: number()
    .typeError("Latitude é obrigatória")
    .min(-90, "Latitude inválida")
    .max(90, "Latitude inválida")
    .required("Latitude é obrigatória"),
  longitude: number()
    .typeError("Longitude é obrigatória")
    .min(-180, "Longitude inválida")
    .max(180, "Longitude inválida")
    .required("Longitude é obrigatória"),
  preview: string().required("Imagem é obrigatória"),
  price: number().when("type", {
    is: "SERVICE",
    then: () =>
      number().typeError("Preço é obrigatório").min(1, "Preço é obrigatório"),
    otherwise: () =>
      number()
        .optional()
        .transform((value) => (isNaN(value) ? undefined : value))
        .nullable(),
  }),
  payment_methods: object().shape({
    PIX: bool().default(false),
    CREDIT_CARD: bool().default(false),
    CASH: bool().default(false),
  }),
  transport_methods: object().shape({
    UBER: bool().default(false),
    TAXI: bool().default(false),
    BIKE: bool().default(false),
    TRANSFER: bool().default(false),
    BUS: bool().default(false),
  }),
  type: mixed<SpotType>()
    .oneOf(Object.values(["ESTABLISHMENT", "SERVICE"]))
    .required("Escolha o tipo do serviço/estabelecimento"),
  description: string()
    .min(50, "Descrição precisa ter no no mínimo 50 caracteres")
    .required("Descrição é obrigatória"),
});

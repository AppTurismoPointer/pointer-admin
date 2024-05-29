import { object, string, mixed } from "yup";

const MAX_FILE_SIZE = 200000;

export const createLocationSchema = object({
  name: string().required("Nome é obrigatório"),
  state_id: string().required("Cidade é obrigatória"),
  city_id: string().required("Estado é obrigatório"),
  file: mixed<Blob[]>()
    .test({
      message: "Insira uma imagem válida",
      test: (file, context) => {
        if (!file) return;

        const [{ type }] = file;
        const isValid = ["image/png", "image/jpeg", "image/jpg"].includes(type);

        if (!isValid) context?.createError();
        return isValid;
      },
    })
    .test({
      message: `Arquivo muito grande, não pode exceder ${MAX_FILE_SIZE}Kb`,
      test: (file) => {
        if (!file) return;
        const [{ size }] = file;
        const isValid = size < MAX_FILE_SIZE;
        return isValid;
      },
    })
    .required("Insira uma imagem"),
});

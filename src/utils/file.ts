import { mixed } from "yup";

const MAX_FILE_SIZE = 200000;

export const validateFile = (file: File) => {
  const { type, size } = file;

  if (!["image/png", "image/jpeg", "image/jpg"].includes(type)) {
    throw Error("Insira uma imagem válida");
  }

  if (size > MAX_FILE_SIZE) {
    throw Error(`Arquivo muito grande, não pode exceder ${MAX_FILE_SIZE}Kb`);
  }

  return true;
};

export const fileSchema = mixed<FileList>()
  .test({
    message: "Insira uma imagem válida",
    test: (file, context) => {
      if (!file?.length) return;

      const [{ type }] = file;
      const isValid = ["image/png", "image/jpeg", "image/jpg"].includes(type);

      if (!isValid) context?.createError();
      return isValid;
    },
  })
  .test({
    message: `Arquivo muito grande, não pode exceder ${MAX_FILE_SIZE}Kb`,
    test: (file) => {
      if (!file?.length) return;
      const [{ size }] = file;
      const isValid = size < MAX_FILE_SIZE;
      return isValid;
    },
  })
  .required("Insira uma imagem");

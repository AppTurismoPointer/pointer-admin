const MAX_FILE_SIZE = 400000;

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

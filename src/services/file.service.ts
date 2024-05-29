import { api } from "./api";

const FILE_DOMAIN = "files";

export type FileInput = {
  file: Blob;
};

const create = ({ file }: FileInput): Promise<{ id: string }> => {
  const formData = new FormData();
  formData.append("file", file);

  return api.post(FILE_DOMAIN, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const FileService = {
  create,
};

import { SpotService } from "@/services/spot.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FileService } from "@/services/file.service";
import { SpotForm, SpotInput } from "../SpotForm";
import { useState } from "react";

export function CreateSpot() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File>();

  const onSubmit = async (payload: SpotInput) => {
    if (!file) return;

    try {
      const { id } = await FileService.create({
        file,
      });

      await SpotService.create({
        ...payload,
        file_id: id,
      });
      toast.success("Ponto cadastrado com sucesso!");
      navigate("/spots");
    } catch (error) {
      toast.error((error as string) ?? "Ocorreu um erro ao cadastrar.");
    }
  };

  return <SpotForm file={file} setFile={setFile} onSubmit={onSubmit} />;
}

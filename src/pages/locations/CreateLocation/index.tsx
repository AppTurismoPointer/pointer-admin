import { LocationService } from "@/services/location.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FileService } from "@/services/file.service";
import { LocationForm, LocationInput } from "../LocationForm";
import { useState } from "react";

export function CreateLocation() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File>();

  const onSubmit = async (payload: LocationInput) => {
    if (!file) return;

    try {
      const { id } = await FileService.create({
        file,
      });

      await LocationService.create({
        ...payload,
        file_id: id,
      });
      toast.success("Local Popular cadastrado com sucesso!");
      navigate("/locations");
    } catch (error) {
      toast.error((error as string) ?? "Ocorreu um erro ao cadastrar.");
    }
  };

  return <LocationForm file={file} setFile={setFile} onSubmit={onSubmit} />;
}

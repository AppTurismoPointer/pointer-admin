import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createLocationSchema } from "./schema";
import { LocationService } from "@/services/location.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FileService } from "@/services/file.service";
import { LocationForm, LocationInput } from "../LocationForm";

export function CreateLocation() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<LocationInput>({
    resolver: yupResolver(createLocationSchema),
  });

  const onSubmit = async (payload: LocationInput) => {
    try {
      const { id } = await FileService.create({
        file: payload.file[0],
      });

      await LocationService.create({
        ...payload,
        file_id: id,
      });
      toast.success("Localização cadastrada com sucesso!");
      navigate("/locations");
    } catch (error) {
      toast.error((error as string) ?? "Ocorreu um erro ao cadastrar.");
    }
  };

  return (
    <LocationForm
      errors={errors}
      register={register}
      control={control}
      watch={watch}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
}

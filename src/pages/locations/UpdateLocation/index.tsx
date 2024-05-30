import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateLocationSchema } from "./schema";
import { LocationDTO, LocationService } from "@/services/location.service";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { FileService } from "@/services/file.service";
import { LocationForm, LocationInput } from "../LocationForm";
import { useEffect, useState } from "react";

export function UpdateLocation() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [location, setLocation] = useState<LocationDTO>();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setValue,
  } = useForm<LocationInput>({
    resolver: yupResolver(updateLocationSchema),
  });

  const onSubmit = async (payload: LocationInput) => {
    try {
      if (!location) return;

      let fileId = location?.file?.id;

      if (fileId !== payload?.file_id) {
        const { id } = await FileService.create({
          file: payload.file[0],
        });

        fileId = id;
      }

      await LocationService.update(id as string, {
        ...payload,
        file_id: fileId,
      });
      toast.success("Localização atualizada com sucesso!");
      navigate("/locations");
    } catch (error) {
      toast.error((error as string) ?? "Ocorreu um erro ao atualizar.");
    }
  };

  const getLocation = async () => {
    try {
      const { data } = await LocationService.getById(id as string);

      setLocation(data);
      setValue("name", data.name);
      setValue("state_id", data.state.id);
      setValue("city_id", data.city.id);
      setValue("file_id", data.file.id);
    } catch (error) {
      toast.error(
        (error as string) ?? "Ocorreu um erro ao buscar localização."
      );
    }
  };

  useEffect(() => {
    getLocation();
  }, [id]);

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

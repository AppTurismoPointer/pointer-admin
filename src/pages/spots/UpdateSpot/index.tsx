import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateSpotSchema } from "./schema";
import { SpotDTO, SpotService } from "@/services/spot.service";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { FileService } from "@/services/file.service";
import { SpotForm, SpotInput } from "../SpotForm";
import { useState, useEffect } from "react";

export function UpdateSpot() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [spot, setSpot] = useState<SpotDTO>();

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<SpotInput>({
    resolver: yupResolver(updateSpotSchema),
  });

  const onSubmit = async (payload: SpotInput) => {
    try {
      if (!spot) return;

      let fileId = spot?.file?.id;

      if (fileId !== payload?.file_id) {
        const { id } = await FileService.create({
          file: payload.file[0],
        });

        fileId = id;
      }

      await SpotService.update(id as string, {
        ...payload,
        file_id: fileId,
      });
      toast.success("Ponto atualizado com sucesso!");
      navigate("/spots");
    } catch (error) {
      toast.error((error as string) ?? "Ocorreu um erro ao atualizar.");
    }
  };

  const getSpot = async () => {
    try {
      const { data } = await SpotService.getById(id as string);

      setSpot(data);
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
    getSpot();
  }, [id]);

  return (
    <SpotForm
      onSubmit={handleSubmit(onSubmit)}
      errors={errors}
      register={register}
      control={control}
      watch={watch}
      setValue={setValue}
    />
  );
}

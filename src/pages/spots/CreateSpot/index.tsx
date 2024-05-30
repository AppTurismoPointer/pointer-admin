import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createSpotSchema } from "./schema";
import { SpotService } from "@/services/spot.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FileService } from "@/services/file.service";
import { SpotForm, SpotInput } from "../SpotForm";

export function CreateSpot() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<SpotInput>({
    resolver: yupResolver(createSpotSchema),
  });

  const onSubmit = async (payload: SpotInput) => {
    try {
      const { id } = await FileService.create({
        file: payload.file[0],
      });

      await SpotService.create({
        ...payload,
        file_id: id,
      });
      toast.success("Ponto cadastrada com sucesso!");
      navigate("/spots");
    } catch (error) {
      toast.error((error as string) ?? "Ocorreu um erro ao cadastrar.");
    }
  };

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

import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createSpotSchema } from "./schema";
import { Button } from "@/components/ui/button";
import { SpotService } from "@/services/spot.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CityDTO, StateDTO, StateService } from "@/services/state.service";
import { useEffect, useState } from "react";
import { FileService } from "@/services/file.service";
import { CategoryDTO, CategoryService } from "@/services/category.service";
import { getLocation } from "@/utils";

type Input = {
  name: string;
  state_id: string;
  city_id: string;
  category_id: string;
  latitude: number;
  longitude: number;
  file: Blob[];
};

export function CreateSpot() {
  const [states, setStates] = useState<StateDTO[]>([]);
  const [cities, setCities] = useState<CityDTO[]>([]);
  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<Input>({
    resolver: yupResolver(createSpotSchema),
  });

  const stateId = watch("state_id");

  const onSubmit = async (payload: Input) => {
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

  const getStates = async () => {
    try {
      const { data } = await StateService.getAll();

      setStates(data);
    } catch (error) {
      toast.error((error as string) ?? "Ocorreu um erro ao listar estados.");
    }
  };

  const getCities = async () => {
    try {
      const { data } = await StateService.getById(stateId);

      setCities(data.cities);
    } catch (error) {
      toast.error((error as string) ?? "Ocorreu um erro ao listar cidades.");
    }
  };

  const getCategories = async () => {
    try {
      const { data } = await CategoryService.getAll({ page: 1, limit: 9999 });

      setCategories(data);
    } catch (error) {
      toast.error((error as string) ?? "Ocorreu um erro ao listar categorias.");
    }
  };

  const getCurrentLocation = async () => {
    try {
      const { latitude, longitude } = await getLocation();

      setValue("latitude", latitude);
      setValue("longitude", longitude);
    } catch (error) {
      toast.error(
        (error as string) ?? "Ocorreu um erro ao buscar localização."
      );
    }
  };

  useEffect(() => {
    if (stateId) getCities();
  }, [stateId]);

  useEffect(() => {
    getStates();
    getCategories();
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-full flex flex-col gap-4"
    >
      <div className="flex justify-end">
        <Button size="lg">Cadastrar</Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Input
          label="Nome"
          placeholder="Digite o nome da localização"
          error={errors?.name?.message}
          {...register("name")}
        />
        <Input
          label="Imagem"
          type="file"
          error={errors?.file?.message}
          accept="image/png, image/jpeg, image/jpg"
          {...register("file")}
        />
      </div>

      <div className="grid grid-cols-3 gap-4 items-end">
        <Input
          label="Longitude"
          placeholder="Digite o nome da localização"
          error={errors?.longitude?.message}
          {...register("longitude")}
          type="number"
        />
        <Input
          label="Latitude"
          placeholder="Digite o nome da localização"
          error={errors?.latitude?.message}
          {...register("latitude")}
          type="number"
        />

        <Button onClick={() => getCurrentLocation()}>Localização atual</Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Controller
          control={control}
          name="state_id"
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <Label>Estado</Label>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger error={errors?.state_id?.message}>
                  <SelectValue placeholder="Selecione o estado" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem value={state.id} key={state.id}>
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        />
        <Controller
          control={control}
          name="city_id"
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <Label>Cidade</Label>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={!stateId}
              >
                <SelectTrigger error={errors?.city_id?.message}>
                  <SelectValue placeholder="Selecione a cidade" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem value={city.id} key={city.id}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        />
        <Controller
          control={control}
          name="category_id"
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <Label>Categoria</Label>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger error={errors?.category_id?.message}>
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem value={category.id} key={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        />
      </div>
    </form>
  );
}

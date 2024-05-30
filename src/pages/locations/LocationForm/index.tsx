import { Input } from "@/components/ui/input";
import {
  Controller,
  FieldErrors,
  UseFormRegister,
  Control,
  UseFormWatch,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
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

export type LocationInput = {
  name: string;
  state_id: string;
  city_id: string;
  file: Blob[];
  file_id?: string;
};

interface LocationFormProps {
  errors: FieldErrors<LocationInput>;
  register: UseFormRegister<LocationInput>;
  onSubmit: () => void;
  control: Control<LocationInput>;
  watch: UseFormWatch<LocationInput>;
}

export function LocationForm({
  register,
  errors,
  onSubmit,
  control,
  watch,
}: LocationFormProps) {
  const [states, setStates] = useState<StateDTO[]>([]);
  const [cities, setCities] = useState<CityDTO[]>([]);

  const stateId = watch("state_id");

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

  useEffect(() => {
    if (stateId) getCities();
  }, [stateId]);

  useEffect(() => {
    getStates();
  }, []);

  return (
    <form onSubmit={onSubmit} className="h-full flex flex-col gap-4">
      <div className="flex justify-end">
        <Button size="lg" type="submit">
          Cadastrar
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
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

      <div className="grid grid-cols-2 gap-4">
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
      </div>
    </form>
  );
}

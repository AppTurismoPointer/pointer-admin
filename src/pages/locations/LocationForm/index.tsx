import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
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
import { LocationByIdDTO } from "@/services/location.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { locationSchema } from "./schema";
import { InputFile } from "@/components/ui/input-file";
import { validateFile } from "@/utils";
import { ImageIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export type LocationInput = {
  name: string;
  state_id: string;
  city_id: string;
  preview: string;
};

interface LocationFormProps {
  onSubmit: (payload: LocationInput) => Promise<void>;
  location?: LocationByIdDTO;
  file: File | undefined;
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
}

export function LocationForm({
  file,
  setFile,
  onSubmit,
  location,
}: LocationFormProps) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
  } = useForm<LocationInput>({
    resolver: yupResolver(locationSchema),
    defaultValues: {
      name: location?.name,
      city_id: location?.city?.id,
      state_id: location?.city?.state?.id,
      preview: location?.preview,
    },
  });

  const [states, setStates] = useState<StateDTO[]>([]);
  const [cities, setCities] = useState<CityDTO[]>([]);

  const name = watch("name");
  const preview = watch("preview");
  const stateId = watch("state_id");

  const getStates = async () => {
    try {
      const { data } = await StateService.getAll();

      setStates(data);
      if (location) setValue("state_id", location.city.state.id);
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-full max-w-3xl flex flex-col gap-6"
    >
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-sm flex items-center justify-center overflow-hidden bg-white">
          {preview ? (
            <img
              src={preview}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <ImageIcon size={18} />
          )}
        </div>

        <strong className="block text-md">{name}</strong>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Nome"
          placeholder="Digite o nome da localização"
          error={errors?.name?.message}
          {...register("name")}
        />

        <InputFile
          label="Imagem"
          placeholder={(file?.name || location?.file?.name) ?? "Buscar imagem"}
          name="file"
          error={errors?.preview?.message}
          onChange={(e) => {
            try {
              const currentFile = e.target?.files?.[0] as File;

              validateFile(currentFile);
              setFile(currentFile);
              setValue("preview", URL.createObjectURL(currentFile));
              clearErrors("preview");
            } catch (error) {
              const err = error as unknown as { message: string };
              setError("preview", {
                type: "custom",
                message: err?.message,
              });
              setFile(undefined);
            }
          }}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Controller
          control={control}
          name="state_id"
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <Label>Estado</Label>
              <Select onValueChange={field.onChange} value={field.value}>
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
                value={field.value}
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

      <div className="flex items-center gap-4 justify-end mt-8">
        <Button variant="ghost" onClick={() => navigate("/locations")}>
          Cancelar
        </Button>
        <Button type="submit">Salvar</Button>
      </div>
    </form>
  );
}

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { CityDTO, CityService } from "@/services/city.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { citySchema } from "./schema";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useEffect } from "react";

export type CityInput = {
  name: string;
};

interface CityFormProps {
  isOpen: boolean;
  onClose: () => void;
  refreshData: () => void;
  city?: CityDTO;
  stateId: string;
}

export function CityFormModal({
  isOpen,
  onClose,
  city,
  refreshData,
  stateId,
}: CityFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CityInput>({
    resolver: yupResolver(citySchema),
  });

  const onSubmit = async (payload: CityInput) => {
    try {
      if (city?.id) {
        await CityService.update(city?.id, { ...payload, state_id: stateId });
        toast.success("Cidade/localidade atualizada com sucesso!");
      } else {
        await CityService.create({ ...payload, state_id: stateId });
        toast.success("Cidade/localidade cadastrada com sucesso!");
      }

      onClose();
      refreshData();
    } catch (error) {
      toast.error((error as string) ?? "Ocorreu um erro ao cadastrar.");
    }
  };

  useEffect(() => {
    if (isOpen) reset({ name: city?.name ?? "" });
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>
            {city ? "Atualizar" : "Cadastrar"} cidade/localidade
          </DialogTitle>
          <DialogDescription>
            {city
              ? "Atualize o nome da cidade/localidade."
              : "Cadastre uma nova cidade/localidade."}
          </DialogDescription>
        </DialogHeader>

        <form id="city-form" onSubmit={handleSubmit(onSubmit)} className="mb-4">
          <Input
            label="Nome"
            placeholder="Digite o nome da cidade/localidade"
            error={errors?.name?.message}
            {...register("name")}
          />
        </form>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" form="city-form">
            {city ? "Atualizar" : "Cadastrar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

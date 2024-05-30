import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { CategoryDTO, CategoryService } from "@/services/category.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { categorySchema } from "./schema";
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

export type CategoryInput = {
  name: string;
};

interface CategoryFormProps {
  isOpen: boolean;
  onClose: () => void;
  refreshData: () => void;
  category?: CategoryDTO;
}

export function CategoryFormModal({
  isOpen,
  onClose,
  category,
  refreshData,
}: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryInput>({
    resolver: yupResolver(categorySchema),
  });

  const onSubmit = async (payload: CategoryInput) => {
    try {
      if (category?.id) {
        await CategoryService.update(category?.id, payload);
        toast.success("Categoria atualizada com sucesso!");
      } else {
        await CategoryService.create(payload);
        toast.success("Categoria cadastrada com sucesso!");
      }

      onClose();
      refreshData();
    } catch (error) {
      toast.error((error as string) ?? "Ocorreu um erro ao cadastrar.");
    }
  };

  useEffect(() => {
    if (isOpen) reset({ name: category?.name ?? "" });
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>
            {category ? "Atualizar" : "Cadastrar"} categoria
          </DialogTitle>
          <DialogDescription>
            {category
              ? "Atualize o nome da categoria."
              : "Cadastre uma nova categoria."}
          </DialogDescription>
        </DialogHeader>

        <form
          id="category-form"
          onSubmit={handleSubmit(onSubmit)}
          className="mb-4"
        >
          <Input
            label="Nome"
            placeholder="Digite o nome da categoria"
            error={errors?.name?.message}
            {...register("name")}
          />
        </form>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" form="category-form">
            {category ? "Atualizar" : "Cadastrar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

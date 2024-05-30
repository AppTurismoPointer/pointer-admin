import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FieldErrors, UseFormRegister } from "react-hook-form";

export type CategoryInput = {
  name: string;
};

interface CategoryFormProps {
  errors: FieldErrors<CategoryInput>;
  register: UseFormRegister<CategoryInput>;
  onSubmit: () => void;
}

export function CategoryForm({
  register,
  onSubmit,
  errors,
}: CategoryFormProps) {
  return (
    <form onSubmit={onSubmit} className="h-full flex flex-col gap-4">
      <div className="flex justify-end">
        <Button size="lg" type="submit">
          Salvar
        </Button>
      </div>

      <Input
        label="Nome"
        placeholder="Digite o nome da categoria"
        error={errors?.name?.message}
        {...register("name")}
      />
    </form>
  );
}

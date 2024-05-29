import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createCategorySchema } from "./schema";
import { Button } from "@/components/ui/button";
import { CategoryService } from "@/services/category.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type Input = {
  name: string;
};

export function CreateCategory() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>({
    resolver: yupResolver(createCategorySchema),
  });

  const onSubmit = async (payload: Input) => {
    try {
      await CategoryService.create(payload);
      toast.success("Categoria cadastrada com sucesso!");
      navigate("/categories");
    } catch (error) {
      toast.error((error as string) ?? "Ocorreu um erro ao cadastrar.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-full flex flex-col gap-4"
    >
      <div className="flex justify-end">
        <Button size="lg">Cadastrar</Button>
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

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createCategorySchema } from "./schema";
import { CategoryService } from "@/services/category.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CategoryForm, CategoryInput } from "../CategoryForm";

export function CreateCategory() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryInput>({
    resolver: yupResolver(createCategorySchema),
  });

  const onSubmit = async (payload: CategoryInput) => {
    try {
      await CategoryService.create(payload);
      toast.success("Categoria cadastrada com sucesso!");
      navigate("/categories");
    } catch (error) {
      toast.error((error as string) ?? "Ocorreu um erro ao cadastrar.");
    }
  };

  return (
    <CategoryForm
      register={register}
      errors={errors}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
}

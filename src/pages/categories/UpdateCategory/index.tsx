import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateCategorySchema } from "./schema";
import { CategoryService } from "@/services/category.service";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { CategoryForm, CategoryInput } from "../CategoryForm";
import { useEffect } from "react";

export function UpdateCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryInput>({
    resolver: yupResolver(updateCategorySchema),
  });

  const onSubmit = async (payload: CategoryInput) => {
    try {
      await CategoryService.update(id as string, payload);
      toast.success("Categoria atualizada com sucesso!");
      navigate("/categories");
    } catch (error) {
      toast.error((error as string) ?? "Ocorreu um erro ao atualizar.");
    }
  };

  const getCategory = async () => {
    try {
      await CategoryService.getById(id as string);
    } catch (error) {
      toast.error((error as string) ?? "Ocorreu um erro ao buscar categoria.");
    }
  };

  useEffect(() => {
    getCategory();
  }, [id]);

  return (
    <CategoryForm
      register={register}
      errors={errors}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
}

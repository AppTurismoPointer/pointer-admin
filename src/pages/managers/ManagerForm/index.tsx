import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import { yupResolver } from "@hookform/resolvers/yup";
import { managerSchema, managerUpdateSchema } from "./schema";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { CompanyDTO, CompanyService } from "@/services/company.service";
import { toast } from "react-toastify";
import { Label } from "@/components/ui/label";

interface ManagerFormProps {
  onSubmit: (payload: ManagerInput) => Promise<void>;
  manager?: Manager;
}

export function ManagerForm({ onSubmit, manager }: ManagerFormProps) {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState<CompanyDTO[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ManagerInput>({
    resolver: yupResolver(!manager ? managerSchema : managerUpdateSchema),
    defaultValues: {
      name: manager?.name,
      email: manager?.email,
    },
  });

  const getCompanies = async () => {
    try {
      const { data } = await CompanyService.getAll({ page: 1, limit: 9999 });

      setCompanies(data);
    } catch (error) {
      toast.error((error as string) ?? "Ocorreu um erro ao listar empresas.");
    }
  };

  useEffect(() => {
    getCompanies();
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-full max-w-3xl flex flex-col gap-6"
    >
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Nome"
          placeholder="Digite o nome do usuário"
          error={errors?.name?.message}
          {...register("name")}
        />
        <Input
          label="E-mail"
          placeholder="Digite o e-mail do usuário"
          error={errors?.email?.message}
          {...register("email")}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Senha"
          placeholder="Digite o a senha"
          error={errors?.password?.message}
          {...register("password")}
          type="password"
          disabled={!!manager}
        />
        <Input
          label="Confirmação de senha"
          placeholder="Digite a confirmação de senha"
          error={errors?.password_confirmation?.message}
          {...register("password_confirmation")}
          type="password"
          disabled={!!manager}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Controller
          control={control}
          name="company_id"
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <Label>Empresa</Label>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger error={errors?.company_id?.message}>
                  <SelectValue placeholder="Selecione a empresa" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((company) => (
                    <SelectItem value={company.id} key={company.id}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        />
      </div>
      <div className="flex items-center gap-4 justify-end mt-8">
        <Button variant="ghost" onClick={() => navigate("/admin")}>
          Cancelar
        </Button>
        <Button type="submit">Salvar</Button>
      </div>
    </form>
  );
}

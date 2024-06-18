import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import { UserAdminDTO } from "@/services/user-admin.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { userAdminSchema, userAdminUpdateSchema } from "./schema";
import { useNavigate } from "react-router-dom";

export type UserAdminInput = {
  name: string;
  email: string;
  password?: string;
  password_confirmation?: string;
};

interface UserAdminFormProps {
  onSubmit: (payload: UserAdminInput) => Promise<void>;
  userAdmin?: UserAdminDTO;
}

export function UserAdminForm({ onSubmit, userAdmin }: UserAdminFormProps) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserAdminInput>({
    resolver: yupResolver(!userAdmin ? userAdminSchema : userAdminUpdateSchema),
    defaultValues: {
      name: userAdmin?.name,
      email: userAdmin?.email,
    },
  });

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
          disabled={!!userAdmin}
        />
        <Input
          label="Confirmação de senha"
          placeholder="Digite a confirmação de senha"
          error={errors?.password_confirmation?.message}
          {...register("password_confirmation")}
          type="password"
          disabled={!!userAdmin}
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

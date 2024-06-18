import { UserAdminService } from "@/services/user-admin.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserAdminForm, UserAdminInput } from "../UserAdminForm";

export function CreateUserAdmin() {
  const navigate = useNavigate();

  const onSubmit = async (payload: UserAdminInput) => {
    try {
      await UserAdminService.create(payload);
      toast.success("Usuário admnistrativo cadastrado com sucesso!");
      navigate("/admin");
    } catch (error) {
      toast.error((error as string) ?? "Ocorreu um erro ao cadastrar.");
    }
  };

  return <UserAdminForm onSubmit={onSubmit} />;
}

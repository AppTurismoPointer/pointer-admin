import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ManagerForm } from "../ManagerForm";
import { ManagerService } from "@/services/manager.service";

export function CreateManager() {
  const navigate = useNavigate();

  const onSubmit = async (payload: ManagerInput) => {
    try {
      await ManagerService.create(payload);
      toast.success("Usuário cadastrado com sucesso!");
      navigate("/managers");
    } catch (error) {
      toast.error((error as string) ?? "Ocorreu um erro ao cadastrar.");
    }
  };

  return <ManagerForm onSubmit={onSubmit} />;
}

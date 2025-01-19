import { ManagerService } from "@/services/manager.service";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { ManagerForm } from "../ManagerForm";
import { useEffect, useState } from "react";

export function UpdateManager() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [manager, setManager] = useState<Manager>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (payload: ManagerInput) => {
    try {
      await ManagerService.update(id as string, payload);
      toast.success("Usuário atualizado com sucesso!");
      navigate("/managers");
    } catch (error) {
      toast.error((error as string) ?? "Ocorreu um erro ao atualizar.");
    }
  };

  const getManager = async () => {
    setLoading(true);

    try {
      const { data } = await ManagerService.getById(id as string);

      setManager(data);
    } catch (error) {
      toast.error((error as string) ?? "Ocorreu um erro ao buscar usuário.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getManager();
  }, [id]);

  return (
    <>{!loading && <ManagerForm onSubmit={onSubmit} manager={manager} />}</>
  );
}

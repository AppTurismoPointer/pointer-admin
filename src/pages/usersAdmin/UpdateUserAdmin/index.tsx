import { UserAdminDTO, UserAdminService } from "@/services/user-admin.service";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { UserAdminForm, UserAdminInput } from "../UserAdminForm";
import { useEffect, useState } from "react";

export function UpdateUserAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userAdmin, setUserAdmin] = useState<UserAdminDTO>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (payload: UserAdminInput) => {
    try {
      await UserAdminService.update(id as string, payload);
      toast.success("Usuário admnistrativo atualizado com sucesso!");
      navigate("/admin");
    } catch (error) {
      toast.error((error as string) ?? "Ocorreu um erro ao atualizar.");
    }
  };

  const getUserAdmin = async () => {
    setLoading(true);

    try {
      const { data } = await UserAdminService.getById(id as string);

      setUserAdmin(data);
    } catch (error) {
      toast.error(
        (error as string) ?? "Ocorreu um erro ao buscar localização."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserAdmin();
  }, [id]);

  return (
    <>
      {!loading && <UserAdminForm onSubmit={onSubmit} userAdmin={userAdmin} />}
    </>
  );
}

import { CompanyByIdDTO, CompanyService } from "@/services/company.service";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { FileService } from "@/services/file.service";
import { CompanyForm, CompanyInput } from "../CompanyForm";
import { useEffect, useState } from "react";

export function UpdateCompany() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [file, setFile] = useState<File>();
  const [company, setCompany] = useState<CompanyByIdDTO>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (payload: CompanyInput) => {
    try {
      if (!company) return;

      let fileId = company?.file?.id;

      if (file) {
        const { id } = await FileService.create({
          file,
        });

        fileId = id;
      }

      await CompanyService.update(id as string, {
        ...payload,
        file_id: fileId,
        accept_reservation:
          payload.accept_reservation === "true" ? true : false,
      });
      toast.success("Empresa atualizada com sucesso!");
      navigate("/companies");
    } catch (error) {
      toast.error((error as string) ?? "Ocorreu um erro ao atualizar.");
    }
  };

  const getCompany = async () => {
    setLoading(true);

    try {
      const { data } = await CompanyService.getById(id as string);

      setCompany(data);
    } catch (error) {
      toast.error(
        (error as string) ?? "Ocorreu um erro ao buscar localização."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCompany();
  }, [id]);

  return (
    <>
      {!loading && (
        <CompanyForm
          onSubmit={onSubmit}
          company={company}
          file={file}
          setFile={setFile}
        />
      )}
    </>
  );
}

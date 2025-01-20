import { CompanyService } from "@/services/company.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FileService } from "@/services/file.service";
import { CompanyForm, CompanyInput } from "../CompanyForm";
import { useState } from "react";

export function CreateCompany() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File>();

  const onSubmit = async (payload: CompanyInput) => {
    if (!file) return;

    try {
      const { id } = await FileService.create({
        file,
      });

      await CompanyService.create({
        ...payload,
        file_id: id,
        accept_reservation:
          payload.accept_reservation === "true" ? true : false,
      });
      toast.success("Empresa cadastrada com sucesso!");
      navigate("/companies");
    } catch (error) {
      toast.error((error as string) ?? "Ocorreu um erro ao cadastrar.");
    }
  };

  return <CompanyForm file={file} setFile={setFile} onSubmit={onSubmit} />;
}

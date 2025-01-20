import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import { CompanyByIdDTO } from "@/services/company.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { companySchema } from "./schema";
import { InputFile } from "@/components/ui/input-file";
import { validateFile } from "@/utils";
import { ImageIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export type CompanyInput = {
  name: string;
  phone: string;
  preview: string;
  accept_reservation: "true" | "false";
};

interface CompanyFormProps {
  onSubmit: (payload: CompanyInput) => Promise<void>;
  company?: CompanyByIdDTO;
  file: File | undefined;
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
}

export function CompanyForm({
  file,
  setFile,
  onSubmit,
  company,
}: CompanyFormProps) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
    control,
  } = useForm<CompanyInput>({
    resolver: yupResolver(companySchema),
    defaultValues: {
      name: company?.name,
      phone: company?.phone,
      preview: company?.preview,
      accept_reservation: company?.accept_reservation ? "true" : "false",
    },
  });

  const name = watch("name");
  const preview = watch("preview");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-full max-w-3xl flex flex-col gap-6"
    >
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-sm flex items-center justify-center overflow-hidden bg-white">
          {preview ? (
            <img
              src={preview}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <ImageIcon size={18} />
          )}
        </div>

        <strong className="block text-md">{name}</strong>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Nome"
          placeholder="Digite o nome da empresa"
          error={errors?.name?.message}
          {...register("name")}
        />
        <div className="space-y-2">
          <Label htmlFor="option-one">Aceita reserva</Label>
          <Controller
            name="accept_reservation"
            control={control}
            render={({ field }) => (
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="flex gap-4 items-center"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="true" />
                  <Label htmlFor="true">Sim</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="false" />
                  <Label htmlFor="false">Não</Label>
                </div>
              </RadioGroup>
            )}
          />

          {errors?.accept_reservation?.message && (
            <span className="text-sm text-destructive font-semibold">
              {errors?.accept_reservation?.message}
            </span>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Telefone"
          placeholder="Digite o telefone da empresa"
          error={errors?.phone?.message}
          {...register("phone")}
        />

        <InputFile
          label="Imagem"
          placeholder={(file?.name || company?.file?.name) ?? "Buscar imagem"}
          name="file"
          error={errors?.preview?.message}
          onChange={(e) => {
            try {
              const currentFile = e.target?.files?.[0] as File;

              validateFile(currentFile);
              setFile(currentFile);
              setValue("preview", URL.createObjectURL(currentFile));
              clearErrors("preview");
            } catch (error) {
              const err = error as unknown as { message: string };
              setError("preview", {
                type: "custom",
                message: err?.message,
              });
              setFile(undefined);
            }
          }}
        />
      </div>

      <div className="flex items-center gap-4 justify-end mt-8">
        <Button variant="ghost" onClick={() => navigate("/companies")}>
          Cancelar
        </Button>
        <Button type="submit">Salvar</Button>
      </div>
    </form>
  );
}

import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { StateDTO, StateService } from "@/services/state.service";
import { useEffect, useState } from "react";
import {
  PaymentMethodType,
  SpotByIdDTO,
  SpotType,
  TransportMethodType,
} from "@/services/spot.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { spotSchema } from "./schema";
import { InputFile } from "@/components/ui/input-file";
import { getLocation, validateFile } from "@/utils";
import { ImageIcon } from "lucide-react";
import { CategoryDTO, CategoryService } from "@/services/category.service";
import { useNavigate } from "react-router-dom";
import { CompanyDTO, CompanyService } from "@/services/company.service";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { paymentMethods, transportMethods } from "@/constants";
import { CityDTO, CityService } from "@/services/city.service";

export type SpotInput = {
  name: string;
  state_id: string;
  city_id: string;
  company_id: string;
  category_id: string;
  preview: string;
  latitude: number;
  longitude: number;
  price?: number;
  description: string;
  transport_methods: Record<TransportMethodType, boolean>;
  payment_methods: Record<PaymentMethodType, boolean>;
  type: SpotType;
};

interface SpotFormProps {
  onSubmit: (payload: SpotInput) => Promise<void>;
  spot?: SpotByIdDTO;
  file: File | undefined;
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
}

export function SpotForm({ file, setFile, onSubmit, spot }: SpotFormProps) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
  } = useForm<SpotInput>({
    resolver: yupResolver(spotSchema),
    defaultValues: {
      name: spot?.name,
      city_id: spot?.city?.id,
      state_id: spot?.city?.state?.id,
      preview: spot?.preview,
      category_id: spot?.category?.id,
      longitude: spot?.longitude,
      latitude: spot?.latitude,
      company_id: spot?.company?.id,
      price: spot?.price,
      description: spot?.description,
      type: spot?.type,
      payment_methods: {
        PIX: spot?.payment_methods.includes("PIX"),
        BOLETO: spot?.payment_methods.includes("BOLETO"),
        BANK_TRANSFER: spot?.payment_methods.includes("BANK_TRANSFER"),
      },
      transport_methods: {
        UBER: spot?.transport_methods.includes("UBER"),
        TAXI: spot?.transport_methods.includes("TAXI"),
        BIKE: spot?.transport_methods.includes("BIKE"),
        TRANSFER: spot?.transport_methods.includes("TRANSFER"),
        BUS: spot?.transport_methods.includes("BUS"),
      },
    },
  });

  const [states, setStates] = useState<StateDTO[]>([]);
  const [cities, setCities] = useState<CityDTO[]>([]);
  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const [companies, setCompanies] = useState<CompanyDTO[]>([]);

  const name = watch("name");
  const preview = watch("preview");
  const stateId = watch("state_id");
  const type = watch("type");

  const getStates = async () => {
    try {
      const { data } = await StateService.getAll({ page: 1, limit: 99999999 });

      setStates(data);
      if (spot) setValue("state_id", spot.city.state.id);
    } catch (error) {
      toast.error((error as string) ?? "Ocorreu um erro ao listar estados.");
    }
  };

  const getCities = async () => {
    try {
      const { data } = await CityService.getAll(stateId, {
        page: 1,
        limit: 99999999,
      });

      setCities(data);
    } catch (error) {
      toast.error((error as string) ?? "Ocorreu um erro ao listar cidades.");
    }
  };

  const getCategories = async () => {
    try {
      const { data } = await CategoryService.getAll({ page: 1, limit: 9999 });

      setCategories(data);
    } catch (error) {
      toast.error((error as string) ?? "Ocorreu um erro ao listar categorias.");
    }
  };

  const getCompanies = async () => {
    try {
      const { data } = await CompanyService.getAll({ page: 1, limit: 9999 });

      setCompanies(data);
    } catch (error) {
      toast.error((error as string) ?? "Ocorreu um erro ao listar categorias.");
    }
  };

  const getCurrentLocation = async () => {
    try {
      const { latitude, longitude } = await getLocation();

      setValue("latitude", latitude);
      setValue("longitude", longitude);
    } catch (error) {
      toast.error(
        (error as string) ?? "Ocorreu um erro ao buscar localização."
      );
    }
  };

  useEffect(() => {
    if (type === "ESTABLISHMENT") {
      setValue("price", 0);
    }
  }, [type]);

  useEffect(() => {
    if (stateId) getCities();
  }, [stateId]);

  useEffect(() => {
    getCategories();
    getStates();
    getCompanies();
  }, []);

  return (
    <div className="h-full overflow-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-full max-w-5xl flex flex-col gap-6"
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
            placeholder="Digite o nome do ponto"
            error={errors?.name?.message}
            {...register("name")}
          />

          <InputFile
            label="Imagem"
            placeholder={(file?.name || spot?.file?.name) ?? "Buscar imagem"}
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
        <div className="grid grid-cols-2 gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Preço"
              placeholder="Informe o preço"
              error={errors?.price?.message}
              {...register("price")}
              type="float"
              min={0}
              max={9999}
              disabled={type === "ESTABLISHMENT"}
            />
            <Controller
              control={control}
              name="type"
              render={({ field }) => (
                <div className="flex flex-col gap-2">
                  <Label>Tipo</Label>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger error={errors?.type?.message}>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ESTABLISHMENT">
                        Estabelecimento
                      </SelectItem>
                      <SelectItem value="SERVICE">Serviço</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            />
          </div>

          <Controller
            control={control}
            name="company_id"
            render={({ field }) => (
              <div className="flex flex-col gap-2">
                <Label>Empresa</Label>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label>Meios de pagamento</Label>

            <div className="flex items-center gap-4">
              {Object.keys(paymentMethods).map((item) => (
                <Controller
                  key={item}
                  control={control}
                  name={`payment_methods.${item as PaymentMethodType}`}
                  render={({ field: { name, value, onChange, ...field } }) => (
                    <Checkbox
                      {...field}
                      label={paymentMethods[item as PaymentMethodType]}
                      value={item}
                      onCheckedChange={onChange}
                      name={name}
                      checked={!!value}
                    />
                  )}
                />
              ))}
            </div>

            {errors.payment_methods?.message && (
              <span className="text-sm text-destructive font-semibold">
                {errors.payment_methods?.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label>Tipos de transporte</Label>

            <div className="flex items-center gap-4">
              {Object.keys(transportMethods).map((item) => (
                <Controller
                  key={item}
                  control={control}
                  name={`transport_methods.${item as TransportMethodType}`}
                  render={({ field: { name, value, onChange, ...field } }) => (
                    <Checkbox
                      {...field}
                      label={transportMethods[item as TransportMethodType]}
                      value={item}
                      onCheckedChange={onChange}
                      name={name}
                      checked={!!value}
                    />
                  )}
                />
              ))}
            </div>

            {errors.transport_methods?.message && (
              <span className="text-sm text-destructive font-semibold">
                {errors.transport_methods?.message}
              </span>
            )}
          </div>
        </div>

        <Textarea
          label="Descrição"
          placeholder="Digite uma breve descrição"
          error={errors?.description?.message}
          {...register("description")}
        />

        <div className="grid grid-cols-2 gap-4 items-end">
          <div className="flex items-center gap-4">
            <Input
              label="Latitude"
              placeholder="Informe a latitude"
              error={errors?.latitude?.message}
              {...register("latitude")}
              type="float"
              min={-90}
              max={90}
            />
            <Input
              label="Longitude"
              placeholder="Informe a longitude"
              error={errors?.longitude?.message}
              {...register("longitude")}
              type="float"
              min={-90}
              max={90}
            />
          </div>

          <Button onClick={() => getCurrentLocation()}>
            Local Popular atual
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Controller
            control={control}
            name="state_id"
            render={({ field }) => (
              <div className="flex flex-col gap-2">
                <Label>Estado</Label>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger error={errors?.state_id?.message}>
                    <SelectValue placeholder="Selecione o estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem value={state.id} key={state.id}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          />

          <Controller
            control={control}
            name="city_id"
            render={({ field }) => (
              <div className="flex flex-col gap-2">
                <Label>Cidade</Label>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={!stateId}
                >
                  <SelectTrigger error={errors?.city_id?.message}>
                    <SelectValue placeholder="Selecione a cidade" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem value={city.id} key={city.id}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          />
          <Controller
            control={control}
            name="category_id"
            render={({ field }) => (
              <div className="flex flex-col gap-2">
                <Label>Categoria</Label>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger error={errors?.category_id?.message}>
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem value={category.id} key={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          />
        </div>

        <div className="flex items-center gap-4 justify-end mt-8">
          <Button variant="ghost" onClick={() => navigate("/spots")}>
            Cancelar
          </Button>
          <Button type="submit">Salvar</Button>
        </div>
      </form>
    </div>
  );
}

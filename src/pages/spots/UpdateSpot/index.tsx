import {
  PaymentMethodType,
  SpotByIdDTO,
  SpotService,
  TransportMethodType,
} from "@/services/spot.service";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { FileService } from "@/services/file.service";
import { SpotForm, SpotInput } from "../SpotForm";
import { useEffect, useState } from "react";

export function UpdateSpot() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [file, setFile] = useState<File>();
  const [spot, setSpot] = useState<SpotByIdDTO>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (payload: SpotInput) => {
    try {
      if (!spot) return;

      let fileId = spot?.file?.id;

      if (file) {
        const { id } = await FileService.create({
          file,
        });

        fileId = id;
      }

      const payments = Object.keys(payload.payment_methods).filter(
        (item) => payload.payment_methods[item as PaymentMethodType] === true
      );

      const transports = Object.keys(payload.transport_methods).filter(
        (item) =>
          payload.transport_methods[item as TransportMethodType] === true
      );

      await SpotService.update(id as string, {
        ...payload,
        payment_methods: payments as PaymentMethodType[],
        transport_methods: transports as TransportMethodType[],
        file_id: fileId,
      });
      toast.success("Serviços / Estabelecimento atualizado com sucesso!");
      navigate(-1);
    } catch (error) {
      toast.error((error as string) ?? "Ocorreu um erro ao atualizar.");
    }
  };

  const getSpot = async () => {
    setLoading(true);

    try {
      const { data } = await SpotService.getById(id as string);

      setSpot(data);
    } catch (error) {
      toast.error(
        (error as string) ?? "Ocorreu um erro ao buscar localização."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSpot();
  }, [id]);

  return (
    <>
      {!loading && (
        <SpotForm
          onSubmit={onSubmit}
          spot={spot}
          file={file}
          setFile={setFile}
        />
      )}
    </>
  );
}

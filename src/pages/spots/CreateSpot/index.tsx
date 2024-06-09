import {
  PaymentMethodType,
  SpotService,
  TransportMethodType,
} from "@/services/spot.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FileService } from "@/services/file.service";
import { SpotForm, SpotInput } from "../SpotForm";
import { useState } from "react";

export function CreateSpot() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File>();

  const onSubmit = async (payload: SpotInput) => {
    if (!file) return;

    try {
      const { id } = await FileService.create({
        file,
      });

      const payments = Object.keys(payload.payment_methods).filter(
        (item) => payload.payment_methods[item as PaymentMethodType] === true
      );

      const transports = Object.keys(payload.transport_methods).filter(
        (item) =>
          payload.transport_methods[item as TransportMethodType] === true
      );

      await SpotService.create({
        ...payload,
        payment_methods: payments as PaymentMethodType[],
        transport_methods: transports as TransportMethodType[],
        file_id: id,
      });
      toast.success("Ponto cadastrado com sucesso!");
      navigate("/spots");
    } catch (error) {
      toast.error((error as string) ?? "Ocorreu um erro ao cadastrar.");
    }
  };

  return <SpotForm file={file} setFile={setFile} onSubmit={onSubmit} />;
}

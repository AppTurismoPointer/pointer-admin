import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import {
  LocationAssociates,
  LocationAssociatesCombo,
  LocationService,
} from "@/services/location.service";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AssociatedSpotsFormProps {
  locationId: string;
}

export function AssociatedSpotsForm({ locationId }: AssociatedSpotsFormProps) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<LocationAssociates[]>([]);
  const [spots, setSpots] = useState<LocationAssociatesCombo[]>([]);
  const [error, setError] = useState("");

  const [spot, setSpot] = useState("");

  const getSpots = async () => {
    try {
      const { data } = await LocationService.associates.getCombo(locationId);

      setSpots(data);
    } catch (error) {
      toast.error((error as string) ?? "Ocorreu um erro ao listar cidades.");
    }
  };

  const getAssociates = async () => {
    try {
      const { data } = await LocationService.associates.getAll(locationId);

      setData(data);
    } catch (error) {
      toast.error((error as string) ?? "Ocorreu um erro ao listar cidades.");
    }
  };

  const onSubmit = async () => {
    try {
      setLoading(true);

      await LocationService.associates.create({
        location_id: locationId,
        spot_id: spot,
      });

      setError("");
      toast.success("Serviços / Estabelecimento relacionado com sucesso!");
      getAssociates();
    } catch (error) {
      toast.error((error as string) ?? "Ocorreu um erro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (id: string) => {
    try {
      await LocationService.associates.remove(id);

      toast.success("Serviços / Estabelecimento desassociado com sucesso!");
      getAssociates();
    } catch (error) {
      toast.error(
        (error as string) ??
          "Ocorreu um erro ao desassociar serviço/estabelecimento."
      );
    }
  };

  useEffect(() => {
    getSpots();
    getAssociates();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <Label>Serviços / Estabelecimentos</Label>

      <div className="flex gap-4 items-center">
        <div className="w-full">
          <Select onValueChange={(value) => setSpot(value)} defaultValue={spot}>
            <SelectTrigger error={error}>
              <SelectValue placeholder="Selecione o serviço/estabelecimento" />
            </SelectTrigger>
            <SelectContent>
              {spots.map((item) => (
                <SelectItem value={item.id} key={item.id}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button onClick={onSubmit} loading={loading}>
          Adicionar
        </Button>
      </div>

      <ul className="mt-8 flex flex-col gap-2">
        {data.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between gap-2 border-b pb-2"
          >
            <strong className="text-sm font-medium">{item.spot.name}</strong>

            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(item.id)}
            >
              <TrashIcon size={14} />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

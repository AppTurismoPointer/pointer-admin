import { LocationByIdDTO, LocationService } from "@/services/location.service";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { FileService } from "@/services/file.service";
import { LocationForm, LocationInput } from "../LocationForm";
import { useEffect, useState } from "react";

export function UpdateLocation() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [file, setFile] = useState<File>();
  const [location, setLocation] = useState<LocationByIdDTO>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (payload: LocationInput) => {
    try {
      if (!location) return;

      let fileId = location?.file?.id;

      if (file) {
        const { id } = await FileService.create({
          file,
        });

        fileId = id;
      }

      await LocationService.update(id as string, {
        ...payload,
        file_id: fileId,
      });
      toast.success("Local Popular atualizado com sucesso!");
      navigate(-1);
    } catch (error) {
      toast.error((error as string) ?? "Ocorreu um erro ao atualizar.");
    }
  };

  const getLocation = async () => {
    setLoading(true);

    try {
      const { data } = await LocationService.getById(id as string);

      setLocation(data);
    } catch (error) {
      toast.error(
        (error as string) ?? "Ocorreu um erro ao buscar localização."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, [id]);

  return (
    <>
      {!loading && (
        <LocationForm
          onSubmit={onSubmit}
          location={location}
          file={file}
          setFile={setFile}
        />
      )}
    </>
  );
}

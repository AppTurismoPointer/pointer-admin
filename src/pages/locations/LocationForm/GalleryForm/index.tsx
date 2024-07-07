import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import {
  Gallery as GalleryType,
  LocationService,
} from "@/services/location.service";
import { validateFile } from "@/utils";
import { FileService } from "@/services/file.service";
import { Gallery } from "@/components";

interface GalleryFormProps {
  locationId: string;
}

export function GalleryForm({ locationId }: GalleryFormProps) {
  const [gallery, setGallery] = useState<GalleryType[]>([]);
  const [galleryError, setGalleryError] = useState("");

  const getGallery = async () => {
    try {
      const { data } = await LocationService.gallery.getAll(locationId);

      setGallery(data);
    } catch (error) {
      toast.error((error as string) ?? "Ocorreu um erro ao listar a galeria.");
    }
  };

  const onSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const currentFile = e.target?.files?.[0] as File;
      validateFile(currentFile);

      const { id } = await FileService.create({
        file: currentFile,
      });

      await LocationService.gallery.create({
        location_id: locationId,
        file_id: id,
      });

      setGalleryError("");

      toast.success("Imagem cadastrada com sucesso!");

      getGallery();
    } catch (error) {
      const err = error as unknown as { message: string };
      setGalleryError(err?.message);
    }
  };

  const deleteLocationGallery = async (galleryId: string) => {
    try {
      await LocationService.gallery.remove(galleryId);

      toast.success("Imagem deletada com sucesso!");
      getGallery();
    } catch (error) {
      toast.error((error as string) ?? "Ocorreu um erro ao deletar imagem.");
    }
  };

  useEffect(() => {
    getGallery();
  }, []);

  return (
    <Gallery
      gallery={gallery}
      error={galleryError}
      onSubmit={onSubmit}
      onDelete={deleteLocationGallery}
    />
  );
}

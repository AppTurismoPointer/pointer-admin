import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";
import { Gallery as LocationGallery } from "@/services/location.service";
import { Gallery as SpotGallery } from "@/services/spot.service";
import { InputFile } from "@/components/ui/input-file";
import { TrashIcon } from "lucide-react";

interface GalleryProps {
  gallery: (LocationGallery | SpotGallery)[];
  error: string;
  onSubmit: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: (id: string) => void;
}

export function Gallery({ gallery, error, onSubmit, onDelete }: GalleryProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label>Galeria de fotos</Label>

      <InputFile
        placeholder="Buscar imagem"
        name="file"
        error={error}
        onChange={(e) => onSubmit(e)}
      />

      <ul className="mt-8 flex flex-col gap-2">
        {gallery.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between gap-2 border-b pb-2"
          >
            <a
              href={item.preview}
              target="_blank"
              className="text-sm text-blue-600 font-medium"
            >
              {item.file.name}
            </a>

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

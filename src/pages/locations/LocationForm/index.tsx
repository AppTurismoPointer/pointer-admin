import { LocationByIdDTO } from "@/services/location.service";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form } from "./Form";
import { GalleryForm } from "./GalleryForm";
import { AssociatedSpotsForm } from "./AssociatedSpotsForm";

export type LocationInput = {
  name: string;
  state_id: string;
  city_id: string;
  preview: string;
  description: string;
};

interface LocationFormProps {
  onSubmit: (payload: LocationInput) => Promise<void>;
  location?: LocationByIdDTO;
  file: File | undefined;
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
}

export function LocationForm(props: LocationFormProps) {
  return (
    <Tabs defaultValue="form">
      <TabsList>
        <TabsTrigger value="form">Informações</TabsTrigger>
        <TabsTrigger value="gallery" disabled={!props.location?.id}>
          Galeria
        </TabsTrigger>
        <TabsTrigger value="associated" disabled={!props.location?.id}>
          Relacionados
        </TabsTrigger>
      </TabsList>
      <TabsContent value="form" className="p-1">
        <Form {...props} />
      </TabsContent>
      <TabsContent value="gallery" className="p-1">
        {props.location?.id && <GalleryForm locationId={props.location?.id} />}
      </TabsContent>
      <TabsContent value="associated" className="p-1">
        {props.location?.id && (
          <AssociatedSpotsForm locationId={props.location?.id} />
        )}
      </TabsContent>
    </Tabs>
  );
}

import { z } from "zod";
import { locationSchema } from "./schema";

import { useEffect, useState } from "react";
import { LocationDTO, LocationService } from "@/services/location.service";
import { DataTableRowActions } from "@/components/table/components/data-table-row-actions";
import { ColumnDef } from "@tanstack/react-table";
import { Table } from "@/components";

export const columns: ColumnDef<LocationDTO>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => {
      return (
        <span className="max-w-[500px] truncate font-medium">
          {row.getValue("name")}
        </span>
      );
    },
  },
  {
    accessorKey: "city",
    header: "Cidade",
    cell: ({ row }) => {
      return (
        <span className="max-w-[500px] truncate font-medium">
          {row.getValue("city")}
        </span>
      );
    },
  },
  {
    accessorKey: "state",
    header: "Estado",
    cell: ({ row }) => {
      return (
        <span className="max-w-[500px] truncate font-medium">
          {row.getValue("state")}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

export function Locations() {
  const [locations, setLocations] = useState<LocationDTO[]>([]);

  useEffect(() => {
    const getLocations = async () => {
      const data = await LocationService.getAll();

      setLocations(z.array(locationSchema).parse(data));
    };

    getLocations();
  }, []);

  return <Table data={locations} columns={columns} />;
}

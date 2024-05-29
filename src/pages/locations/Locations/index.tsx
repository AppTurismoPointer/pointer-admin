import { z } from "zod";
import { locationSchema } from "./schema";

import { useEffect, useState } from "react";
import { LocationDTO, LocationService } from "@/services/location.service";
import { DataTableRowActions } from "@/components/table/components/data-table-row-actions";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table } from "@/components";
import { usePagination } from "@/hooks";
import { MetaPagination } from "@/types/pagination";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function Locations() {
  const navigate = useNavigate();
  const { page, limit, pagination, onPaginationChange } = usePagination();

  const [locations, setLocations] = useState<LocationDTO[]>([]);
  const [meta, setMeta] = useState<MetaPagination>({
    page: 0,
    limit: 0,
    total: 0,
    totalPages: 0,
  });

  const columns: ColumnDef<LocationDTO>[] = [
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
      cell: ({ row }) => (
        <DataTableRowActions
          row={row}
          onEdit={(id: string) => navigate(`/locations/${id}`)}
          onDelete={handleDelete}
        />
      ),
    },
  ];

  const table = useReactTable({
    columns,
    data: locations,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    state: { pagination },
    onPaginationChange,
    pageCount: meta.totalPages,
  });

  const getLocations = async () => {
    const data = await LocationService.getAll({
      page: page + 1,
      limit,
    });

    setLocations(z.array(locationSchema).parse(data.data));
    setMeta(data.meta);
  };

  const handleDelete = async (id: string) => {
    try {
      await LocationService.remove(id);
      toast.success("Categoria deletada com sucesso!");

      getLocations();
    } catch (error) {
      toast.error((error as string) ?? "Ocorreu um erro ao deletar.");
    }
  };

  useEffect(() => {
    getLocations();
  }, [page, limit]);

  return (
    <Table
      table={table}
      columnsLength={columns.length}
      onCreate={() => navigate("/locations/add")}
    />
  );
}

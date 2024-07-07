import { z } from "zod";
import { spotSchema } from "./schema";

import { useEffect, useState } from "react";
import { SpotDTO, SpotService } from "@/services/spot.service";
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
import { useNavigate, useParams } from "react-router-dom";

export function Spots() {
  const { stateId, cityId } = useParams();
  const navigate = useNavigate();
  const { page, limit, pagination, onPaginationChange } = usePagination();

  const [spots, setSpots] = useState<SpotDTO[]>([]);
  const [meta, setMeta] = useState<MetaPagination>({
    page: 0,
    limit: 0,
    total: 0,
    totalPages: 0,
  });

  const columns: ColumnDef<SpotDTO>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <div className="truncate w-[80px]">{row.getValue("id")}</div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Nome",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <img
              src={row.original.preview}
              alt={row.getValue("name")}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("name")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "category",
      header: "Categoria",
      cell: ({ row }) => {
        return (
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("category")}
          </span>
        );
      },
    },
    {
      accessorKey: "city",
      header: "Cidade/localidade",
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
          onEdit={(id: string) => navigate(`/spots/${stateId}/${cityId}/${id}`)}
          onDelete={handleDelete}
        />
      ),
    },
  ];

  const table = useReactTable({
    columns,
    data: spots,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    state: { pagination },
    onPaginationChange,
    pageCount: meta.totalPages,
  });

  const getSpots = async () => {
    const data = await SpotService.getAll(cityId as string, {
      page: page + 1,
      limit,
    });

    setSpots(z.array(spotSchema).parse(data.data));
    setMeta(data.meta);
  };

  const handleDelete = async (id: string) => {
    try {
      await SpotService.remove(id);
      toast.success("Serviços / Estabelecimento deletado com sucesso!");

      getSpots();
    } catch (error) {
      toast.error((error as string) ?? "Ocorreu um erro ao deletar.");
    }
  };

  useEffect(() => {
    getSpots();
  }, [page, limit]);

  return (
    <Table
      table={table}
      columnsLength={columns.length}
      onCreate={() => navigate(`/spots/${stateId}/${cityId}/add`)}
    />
  );
}

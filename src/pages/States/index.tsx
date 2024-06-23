import { z } from "zod";
import { stateSchema } from "./schema";

import { useEffect, useState } from "react";
import { StateDTO, StateService } from "@/services/state.service";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table } from "@/components";
import { usePagination } from "@/hooks";
import { MetaPagination } from "@/types/pagination";
import { useNavigate } from "react-router-dom";

export function States() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { page, limit, pagination, onPaginationChange } = usePagination();

  const [states, setStates] = useState<StateDTO[]>([]);
  const [meta, setMeta] = useState<MetaPagination>({
    page: 0,
    limit: 0,
    total: 0,
    totalPages: 0,
  });

  const columns: ColumnDef<StateDTO>[] = [
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
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("name")}
          </span>
        );
      },
    },
    {
      id: "actions",
      cell: () => null,
    },
  ];

  const table = useReactTable({
    columns,
    data: states,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    state: { pagination },
    onPaginationChange,
    pageCount: meta.totalPages,
  });

  const getStates = async () => {
    setStates([]);

    const data = await StateService.getAll({
      page: page + 1,
      limit,
      search,
    });

    setStates(z.array(stateSchema).parse(data.data));
    setMeta(data.meta);
  };

  useEffect(() => {
    getStates();
  }, [page, limit, search]);

  return (
    <Table
      onClick={(id) => navigate(id)}
      table={table}
      columnsLength={columns.length}
      search={search}
      setSearch={setSearch}
    />
  );
}

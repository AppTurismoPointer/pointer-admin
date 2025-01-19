import { z } from "zod";
import { managerSchema } from "./schema";

import { useEffect, useState } from "react";
import { ManagerService } from "@/services/manager.service";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table } from "@/components";
import { usePagination } from "@/hooks";
import { MetaPagination } from "@/types/pagination";
import { DataTableRowActions } from "@/components/table/components";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function Managers() {
  const navigate = useNavigate();
  const { page, limit, pagination, onPaginationChange } = usePagination();

  const [managers, setManagers] = useState<Manager[]>([]);
  const [meta, setMeta] = useState<MetaPagination>({
    page: 0,
    limit: 0,
    total: 0,
    totalPages: 0,
  });

  const handleDelete = async (id: string) => {
    try {
      await ManagerService.remove(id);
      toast.success("Usuário Admnistrativo deletado com sucesso!");

      getUsersAdmin();
    } catch (error) {
      toast.error((error as string) ?? "Ocorreu um erro ao deletar.");
    }
  };

  const columns: ColumnDef<Manager>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <div className="truncate w-[80px]">{row.getValue("id")}</div>
      ),
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
      accessorKey: "email",
      header: "E-mail",
      cell: ({ row }) => {
        return (
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("email")}
          </span>
        );
      },
    },
    {
      accessorKey: "company",
      header: "Empresa",
      cell: ({ row }) => {
        const company = row.getValue("company") as Manager["company"];

        return (
          <span className="max-w-[500px] truncate font-medium">
            {company?.name}
          </span>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DataTableRowActions
          row={row}
          onEdit={(id: string) => navigate(`/admin/${id}`)}
          onDelete={handleDelete}
        />
      ),
    },
  ];

  const table = useReactTable({
    columns,
    data: managers,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    state: { pagination },
    onPaginationChange,
    pageCount: meta.totalPages,
  });

  const getUsersAdmin = async () => {
    const data = await ManagerService.getAll({
      page: page + 1,
      limit,
    });

    setManagers(z.array(managerSchema).parse(data.data));
    setMeta(data.meta);
  };

  useEffect(() => {
    getUsersAdmin();
  }, [page, limit]);

  return (
    <Table
      table={table}
      onClick={(id) => navigate(id)}
      columnsLength={columns.length}
      onCreate={() => navigate("/managers/add")}
    />
  );
}

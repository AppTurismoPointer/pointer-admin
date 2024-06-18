import { z } from "zod";
import { userAdminSchema } from "./schema";

import { useEffect, useState } from "react";
import { UserAdminDTO, UserAdminService } from "@/services/user-admin.service";
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

export function UsersAdmin() {
  const navigate = useNavigate();
  const { page, limit, pagination, onPaginationChange } = usePagination();

  const [usersAdmin, setUsersAdmin] = useState<UserAdminDTO[]>([]);
  const [meta, setMeta] = useState<MetaPagination>({
    page: 0,
    limit: 0,
    total: 0,
    totalPages: 0,
  });

  const handleDelete = async (id: string) => {
    try {
      await UserAdminService.remove(id);
      toast.success("Usuário Admnistrativo deletado com sucesso!");

      getUsersAdmin();
    } catch (error) {
      toast.error((error as string) ?? "Ocorreu um erro ao deletar.");
    }
  };

  const columns: ColumnDef<UserAdminDTO>[] = [
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
    data: usersAdmin,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    state: { pagination },
    onPaginationChange,
    pageCount: meta.totalPages,
  });

  const getUsersAdmin = async () => {
    const data = await UserAdminService.getAll({
      page: page + 1,
      limit,
    });

    setUsersAdmin(z.array(userAdminSchema).parse(data.data));
    setMeta(data.meta);
  };

  useEffect(() => {
    getUsersAdmin();
  }, [page, limit]);

  return (
    <Table
      table={table}
      columnsLength={columns.length}
      onCreate={() => navigate("/admin/add")}
    />
  );
}

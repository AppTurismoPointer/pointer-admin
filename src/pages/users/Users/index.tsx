import { z } from "zod";
import { userSchema } from "./schema";

import { useEffect, useState } from "react";
import { UserDTO, UserService } from "@/services/user.service";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table } from "@/components";
import { usePagination } from "@/hooks";
import { MetaPagination } from "@/types/pagination";
import { formatDate, formatPhone } from "@/utils";

export function Users() {
  const { page, limit, pagination, onPaginationChange } = usePagination();

  const [categories, setUsers] = useState<UserDTO[]>([]);
  const [meta, setMeta] = useState<MetaPagination>({
    page: 0,
    limit: 0,
    total: 0,
    totalPages: 0,
  });

  const columns: ColumnDef<UserDTO>[] = [
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
            {formatPhone(row.getValue("email"))}
          </span>
        );
      },
    },
    {
      accessorKey: "phone",
      header: "Telefone",
      cell: ({ row }) => {
        return (
          <span className="max-w-[500px] truncate font-medium">
            {formatPhone(row.getValue("phone"))}
          </span>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: "Data de criação",
      cell: ({ row }) => {
        return (
          <span className="max-w-[500px] truncate font-medium">
            {formatDate(row.getValue("created_at"))}
          </span>
        );
      },
    },
    {
      id: "actions",
    },
  ];

  const table = useReactTable({
    columns,
    data: categories,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    state: { pagination },
    onPaginationChange,
    pageCount: meta.totalPages,
  });

  const getUsers = async () => {
    const data = await UserService.getAll({
      page: page + 1,
      limit,
    });

    setUsers(z.array(userSchema).parse(data.data));
    setMeta(data.meta);
  };

  useEffect(() => {
    getUsers();
  }, [page, limit]);

  return <Table table={table} columnsLength={columns.length} />;
}

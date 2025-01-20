import { z } from "zod";
import { companySchema } from "./schema";

import { useEffect, useState } from "react";
import { CompanyDTO, CompanyService } from "@/services/company.service";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table } from "@/components";
import { usePagination } from "@/hooks";
import { MetaPagination } from "@/types/pagination";
import { formatPhone } from "@/utils";
import { DataTableRowActions } from "@/components/table/components";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function Companies() {
  const navigate = useNavigate();
  const { page, limit, pagination, onPaginationChange } = usePagination();

  const [companies, setCompanies] = useState<CompanyDTO[]>([]);
  const [meta, setMeta] = useState<MetaPagination>({
    page: 0,
    limit: 0,
    total: 0,
    totalPages: 0,
  });

  const handleDelete = async (id: string) => {
    try {
      await CompanyService.remove(id);
      toast.success("Empresa deletada com sucesso!");

      getCompanies();
    } catch (error) {
      toast.error((error as string) ?? "Ocorreu um erro ao deletar.");
    }
  };

  const columns: ColumnDef<CompanyDTO>[] = [
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
      accessorKey: "accept_reservation",
      header: "Reservas",
      cell: ({ row }) => {
        return (
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("accept_reservation") ? "Sim" : "Não"}
          </span>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DataTableRowActions
          row={row}
          onEdit={(id: string) => navigate(`/companies/${id}`)}
          onDelete={handleDelete}
        />
      ),
    },
  ];

  const table = useReactTable({
    columns,
    data: companies,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    state: { pagination },
    onPaginationChange,
    pageCount: meta.totalPages,
  });

  const getCompanies = async () => {
    const data = await CompanyService.getAll({
      page: page + 1,
      limit,
    });

    setCompanies(z.array(companySchema).parse(data.data));
    setMeta(data.meta);
  };

  useEffect(() => {
    getCompanies();
  }, [page, limit]);

  return (
    <Table
      table={table}
      onClick={(id) => navigate(`/companies/${id}`)}
      columnsLength={columns.length}
      onCreate={() => navigate("/companies/add")}
    />
  );
}

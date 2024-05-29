import { z } from "zod";
import { categorySchema } from "./schema";

import { useEffect, useState } from "react";
import { CategoryDTO, CategoryService } from "@/services/category.service";
import { DataTableRowActions } from "@/components/table/components/data-table-row-actions";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table } from "@/components";
import { usePagination } from "@/hooks";
import { MetaPagination } from "@/types/pagination";

const columns: ColumnDef<CategoryDTO>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
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
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

export function Categories() {
  const { page, limit, pagination, onPaginationChange } = usePagination();

  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const [meta, setMeta] = useState<MetaPagination>({
    page: 0,
    limit: 0,
    total: 0,
    totalPages: 0,
  });

  const table = useReactTable({
    columns,
    data: categories,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    state: { pagination },
    onPaginationChange,
    pageCount: meta.totalPages,
  });

  const getCategories = async () => {
    const data = await CategoryService.getAll({
      page: page + 1,
      limit,
    });

    setCategories(z.array(categorySchema).parse(data.data));
    setMeta(data.meta);
  };

  useEffect(() => {
    getCategories();
  }, [page, limit]);

  return <Table table={table} columnsLength={columns.length} />;
}

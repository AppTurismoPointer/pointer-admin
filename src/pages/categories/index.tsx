import { z } from "zod";
import { categorySchema } from "./schema";

import { useEffect, useState } from "react";
import { CategoryDTO, CategoryService } from "@/services/category.service";
import { DataTableRowActions } from "@/components/table/components/data-table-row-actions";
import { ColumnDef } from "@tanstack/react-table";
import { Table } from "@/components";

export const columns: ColumnDef<CategoryDTO>[] = [
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
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

export function Categories() {
  const [categories, setCategories] = useState<CategoryDTO[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      const data = await CategoryService.getAll();

      setCategories(z.array(categorySchema).parse(data));
    };

    getCategories();
  }, []);

  return <Table data={categories} columns={columns} />;
}

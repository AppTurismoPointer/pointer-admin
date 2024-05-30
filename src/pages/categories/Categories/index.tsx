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
import { toast } from "react-toastify";
import { CategoryFormModal } from "../CategoryFormModal";

export function Categories() {
  const [category, setCategory] = useState<CategoryDTO>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { page, limit, pagination, onPaginationChange } = usePagination();

  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const [meta, setMeta] = useState<MetaPagination>({
    page: 0,
    limit: 0,
    total: 0,
    totalPages: 0,
  });

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
      cell: ({ row }) => (
        <DataTableRowActions
          row={row}
          onEdit={() => {
            setIsModalOpen(true);
            setCategory(row.original);
          }}
          onDelete={handleDelete}
        />
      ),
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

  const getCategories = async () => {
    const data = await CategoryService.getAll({
      page: page + 1,
      limit,
    });

    setCategories(z.array(categorySchema).parse(data.data));
    setMeta(data.meta);
  };

  const handleDelete = async (id: string) => {
    try {
      await CategoryService.remove(id);
      toast.success("Categoria deletada com sucesso!");

      getCategories();
    } catch (error) {
      toast.error((error as string) ?? "Ocorreu um erro ao deletar.");
    }
  };

  useEffect(() => {
    getCategories();
  }, [page, limit]);

  return (
    <>
      <Table
        table={table}
        columnsLength={columns.length}
        onCreate={() => setIsModalOpen(true)}
      />
      <CategoryFormModal
        refreshData={getCategories}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCategory(undefined);
        }}
        category={category}
      />
    </>
  );
}

import { z } from "zod";
import { citySchema } from "./schema";

import { useEffect, useState } from "react";
import { CityDTO, CityService } from "@/services/city.service";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table } from "@/components";
import { usePagination } from "@/hooks";
import { MetaPagination } from "@/types/pagination";
import { useNavigate, useParams } from "react-router-dom";
import { CityFormModal } from "..";
import { DataTableRowActions } from "@/components/table/components";
import { toast } from "react-toastify";

export function Cities() {
  const navigate = useNavigate();
  const { stateId } = useParams();
  const { page, limit, pagination, onPaginationChange } = usePagination();

  const isStateRoutes = window.location.pathname.includes("states");
  const [city, setCity] = useState<CityDTO>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [cities, setCities] = useState<CityDTO[]>([]);
  const [meta, setMeta] = useState<MetaPagination>({
    page: 0,
    limit: 0,
    total: 0,
    totalPages: 0,
  });

  const columns: ColumnDef<CityDTO>[] = [
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
      cell: ({ row }) => {
        return isStateRoutes ? (
          <DataTableRowActions
            row={row}
            onEdit={() => {
              setIsModalOpen(true);
              setCity(row.original);
            }}
            onDelete={handleDelete}
          />
        ) : null;
      },
    },
  ];

  const table = useReactTable({
    columns,
    data: cities,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    state: { pagination },
    onPaginationChange,
    pageCount: meta.totalPages,
  });

  const getCities = async () => {
    setCities([]);
    const data = await CityService.getAll(stateId as string, {
      page: page + 1,
      limit,
      search,
    });

    setCities(z.array(citySchema).parse(data.data));
    setMeta(data.meta);
  };

  const handleDelete = async (id: string) => {
    try {
      await CityService.remove(id);
      toast.success("Cidade/localidade deletada com sucesso!");

      getCities();
      setSearch("");
    } catch (error) {
      toast.error((error as string) ?? "Ocorreu um erro ao deletar.");
    }
  };

  useEffect(() => {
    getCities();
  }, [page, limit, search]);

  return (
    <>
      <Table
        onClick={isStateRoutes ? undefined : (id) => navigate(id)}
        table={table}
        columnsLength={columns.length}
        search={search}
        setSearch={setSearch}
        onCreate={isStateRoutes ? () => setIsModalOpen(true) : undefined}
      />
      <CityFormModal
        refreshData={getCities}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCity(undefined);
        }}
        city={city}
        stateId={stateId as string}
      />
    </>
  );
}

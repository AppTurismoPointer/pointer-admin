import {
  Table as UiTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  DataTablePagination,
  DataTableToolbar,
} from "./components";
import { Table as ReactTable } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import { Button } from "../ui/button";

interface TableProps<TData> {
  table: ReactTable<TData>;
  columnsLength: number;
  handleCreate?: () => void;
}

export function Table<TData>({
  table,
  columnsLength,
  handleCreate,
}: TableProps<TData>) {
  return (
    <div className="space-y-4">
      <div className="flex gap-4 justify-between items-center">
        <DataTableToolbar table={table} />

        <Button onClick={handleCreate} disabled={!handleCreate}>
          Cadastrar
        </Button>
      </div>
      <div className="rounded-md border">
        <UiTable>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className={
                        index === headerGroup.headers.length - 1
                          ? "text-right"
                          : ""
                      }
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell
                      key={cell.id}
                      className={
                        index === row.getVisibleCells().length - 1
                          ? "flex justify-end text-right"
                          : ""
                      }
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columnsLength} className="h-24 text-center">
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </UiTable>
      </div>

      <DataTablePagination table={table} />
    </div>
  );
}

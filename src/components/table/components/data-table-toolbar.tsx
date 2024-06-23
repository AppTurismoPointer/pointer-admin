import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  disabled: boolean;
}

export function DataTableToolbar<TData>({
  table,
  value,
  onChange,
  disabled,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-1 items-center space-x-2">
      <Input
        placeholder="Pesquisar..."
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="h-8 w-[150px] lg:w-[250px]"
      />
      {isFiltered && (
        <Button
          variant="ghost"
          onClick={() => table.resetColumnFilters()}
          className="h-8 px-2 lg:px-3"
        >
          Limpar
          <Cross2Icon className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
}

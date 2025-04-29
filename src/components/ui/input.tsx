import * as React from "react";

import { cn } from "@/utils";
import { Label } from "./label";
import { LucideProps } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, name, error, className, icon: Icon, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && <Label htmlFor={name}>{label}</Label>}

        <div
          className={cn(
            "flex h-10 w-full items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent transition-all duration-150 file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:ring-2 focus-within:ring-brand focus-within:ring-offset-2 focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            error ? "border-destructive" : null,
            className
          )}
        >
          {Icon && <Icon className="size-4 text-zinc-500" />}
          <input
            className={cn(
              "flex-1 border-0 bg-transparent w-full p-0 text-zinc-900 placeholder-zinc-500 outline-none dark:text-zinc-100",
              className
            )}
            ref={ref}
            name={name}
            {...props}
          />
        </div>

        {error && (
          <span className="text-xs text-destructive font-semibold">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };

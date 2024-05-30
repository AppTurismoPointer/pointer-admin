import * as React from "react";

import { Label } from "./label";
import { buttonVariants } from "./button";
import { cn } from "@/lib/utils";
import { Input } from "./input";

export interface InputFileProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const InputFile = ({ label, name, error, ...props }: InputFileProps) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <Label htmlFor={name}>{label}</Label>}
      <div className="flex items-center gap-4 w-full">
        <div className="w-full">
          <Input disabled placeholder={props.placeholder} />
        </div>
        <label>
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            hidden
            name={name}
            {...props}
          />
          <div
            className={cn(
              buttonVariants({
                variant: "default",
                size: "default",
                className: "cursor-pointer",
              })
            )}
          >
            Fazer upload
          </div>
        </label>
      </div>

      {error && (
        <span className="text-sm text-destructive font-semibold">{error}</span>
      )}
    </div>
  );
};

InputFile.displayName = "InputFile";

export { InputFile };

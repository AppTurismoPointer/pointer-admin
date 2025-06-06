import * as React from "react";

import { cn } from "@/utils";
import { Label } from "./label";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, name, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && <Label htmlFor={name}>{label}</Label>}
        <textarea
          className={cn(
            "flex h-24 w-full resize-none rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground outline-0 disabled:cursor-not-allowed disabled:opacity-50",
            error ? "border-destructive" : null,
            className
          )}
          ref={ref}
          name={name}
          {...props}
        />

        {error && (
          <span className="text-sm text-destructive font-semibold">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };

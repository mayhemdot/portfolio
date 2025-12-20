import { forwardRef, InputHTMLAttributes } from "react";
import type { FieldError } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const InputField = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    fieldName?: string;
    error?: FieldError | undefined;
  }
>(({ fieldName, label, error, ...props }, ref) => (
  <div className="mb-2 space-y-1">
    <Label htmlFor={fieldName} className={"fsSmall text-zinc-500"}>
      {label}
    </Label>
    <Input
      ref={ref}
      className={cn("fsNormal h-12 rounded-2xl bg-beige-color", {
        "focus-visible:ring-red-500": error,
        hidden: props?.hidden ?? false,
      })}
      {...props}
    />
    {error ? <span className="fsSmall text-red-500">{error?.message}</span> : null}
  </div>
));
InputField.displayName = "InputField";

export default InputField;

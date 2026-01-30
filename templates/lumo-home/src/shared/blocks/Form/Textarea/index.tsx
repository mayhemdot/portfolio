import type React from "react";
import type { TextField } from "@/shared/blocks/Form/types";
import { Label } from "@/shared/components/ui/label";
import { Textarea as TextAreaComponent } from "@/shared/components/ui/textarea";
import { ErrorText } from "../Error";
import { Width } from "../Width";

export const Textarea: React.FC<
  TextField & {
    label: string;
    errors: Partial<any>;
    rows?: number;
  }
> = ({
  name,
  defaultValue,
  errors,
  label,
  required: requiredFromProps,
  rows = 3,
  width,
}) => {
  return (
    <Width width={width}>
      <Label htmlFor={name}>{label}</Label>
      <TextAreaComponent
        defaultValue={defaultValue}
        id={name}
        rows={rows}
        // {...register(name, { required: requiredFromProps })}
      />

      {name && requiredFromProps && errors?.[name] && <ErrorText />}
    </Width>
  );
};

import type React from "react";
import type { TextField } from "@/shared/blocks/Form/types";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { ErrorText } from "../Error";
import { Width } from "../Width";

export const NumberInput: React.FC<
  TextField & {
    errors?: Partial<any>;
    label?: string,
    register?: any;
  }
> = ({
  name,
  defaultValue,
  errors,
  label,
  register,
  required: requiredFromProps,
  width,
}) => {
  return (
    <Width width={width}>
      <Label htmlFor={name}>{label}</Label>
      <Input
        defaultValue={defaultValue}
        id={name}
        type="number"
        {...register(name, { required: requiredFromProps })}
      />
      {name && requiredFromProps && errors?.[name] && <ErrorText />}
    </Width>
  );
};

import type React from "react";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { inpVariants } from "@/widgets/Form/Text";
import type { TextField } from "@/widgets/Form/types";
import { ErrorText } from "../Error";


export const EmailInput: React.FC<
  Omit<TextField, 'size'> & {
    label?: string;
    errors?: Partial<any>;
    register?: any; //UseFormRegister<FieldValues>
    size?: "default" | "xl";
  }
> = ({
  name,
  defaultValue,
  errors,
  label,
  size,
  register,
  required: requiredFromProps,
  width,
  placeholder,
  className,
}) => {
  return (
    <div className={className}>
      <Label htmlFor={name}>{label}</Label>
      <Input
        defaultValue={defaultValue}
        id={name}
        type="text"
        placeholder={placeholder}
        className={inpVariants({
          size: size || "default",
        })}
        pattern={`/^S[^s@]*@S+$/`}
        // {...register(name, {
        //   pattern: /^\S[^\s@]*@\S+$/,
        //   required: requiredFromProps,
        // })}
      />

      {name && requiredFromProps && errors?.[name] && <ErrorText />}
    </div>
  );
};
// Width width={width}

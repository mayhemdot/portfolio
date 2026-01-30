import type React from "react";
import { inpVariants } from "@/shared/blocks/Form/Text";
import type { TextField } from "@/shared/blocks/Form/types";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { ErrorText } from "../Error";
import { Width } from "../Width";
// import {} from "@/"

export const EmailInput: React.FC<
  TextField & {
    label?: string,
    errors?: Partial<any>;
    register?: any; //UseFormRegister<FieldValues>
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
        type="text"
        placeholder={"Type your email"}
        className={inpVariants({})}
        // {...register(name, {
        //   pattern: /^\S[^\s@]*@\S+$/,
        //   required: requiredFromProps,
        // })}
      />

      {name && requiredFromProps && errors?.[name] && <ErrorText />}
    </Width>
  );
};

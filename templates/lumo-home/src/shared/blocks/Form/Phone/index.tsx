

import type React from "react";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { cn } from "@/shared/lib/utils";
import { ErrorText } from "../Error";
import { Width } from "../Width";

export const PhoneInput: React.FC<
  React.ComponentProps<"input"> & {
    label: string;
    errors: Partial<any>;
    register: any; //UseFormRegister<FieldValues>
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
  // const registerWithMask = useHookFormMask(register)

  return (
    <Width width={width}>
      <Label htmlFor={name}>{label}</Label>
      <Input
        defaultValue={defaultValue}
        id={name}
        type="text"
        className={cn("w-full! max-w-full! text-dark rounded-xl h-11")}
        // {...registerWithMask('phone', ['+7 (999) 999 99 99'], {
        //   required: requiredFromProps,
        // })}
      />
      {name && requiredFromProps && errors[name] && <ErrorText />}
    </Width>
  );
};

import type React from "react";
import { useState } from "react";
import type { SelectField } from "@/shared/blocks/Form/types";
import { Label } from "@/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { ErrorText } from "../Error";
import { Width } from "../Width";
import { stateOptions } from "./options";

export const State: React.FC<
  SelectField & {
    label: string;
    width: string | number;
    errors?: Partial<any>;
  }
> = ({ name, errors, label, required, width }) => {
  const controlledValue = stateOptions.find((t) => t.value === value);

  const [value, setValue] = useState<string | null>(null);

  const onChange = (v: string) => {
    setValue(v);
  };

  return (
    <Width width={width}>
      <Label htmlFor={name}>{label}</Label>
      <Select
        onValueChange={(val: any) => onChange(val)}
        value={controlledValue?.value}
      >
        <SelectTrigger className="w-full" id={name}>
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent>
          {stateOptions.map(({ label, value }) => {
            return (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      {name && required && errors?.[name] && <ErrorText />}
    </Width>
  );
};

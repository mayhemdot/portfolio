import type React from "react";
import type { CheckboxField } from "@/shared/blocks/Form/types";
import { Checkbox as CheckboxUi } from "@/shared/components/ui/checkbox";
import { Label } from "@/shared/components/ui/label";
import { ErrorText } from "../Error";
import { Width } from "../Width";

export const Checkbox: React.FC<
  CheckboxField & {
    errors: Partial<any>;
    control?: any;
    form?: any;
    label?: any;
    getValues: () => boolean;
    register: any; //UseFormRegister<FieldValues>;
    setValue: (field: string, value: boolean) => void;
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
  const props = register(name, { required: requiredFromProps });
  // const { setValue } = useFormContext();

  return (
    <Width width={width}>
      <div className="flex items-center gap-2">
        <CheckboxUi
          defaultChecked={defaultValue}
          id={name}
          {...props}
          onCheckedChange={(checked: boolean) => {
            // setValue(props.name, checked);
          }}
        />
        <Label htmlFor={name}>{label}</Label>
      </div>
      {name && requiredFromProps && errors?.[name] && <ErrorText />}
    </Width>
  );
};

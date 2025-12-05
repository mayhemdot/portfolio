import { Button } from "@heroui/button";
import type React from "react";
import type { StoreProductOption } from "../../types";

type OptionSelectProps = {
  option: StoreProductOption;
  current: string | undefined;
  updateOption: (title: string, value: string) => void;
  title: string;
  disabled: boolean;
  "data-testid"?: string;
};

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
}) => {
  const filteredOptions = (option.values ?? []).map((v) => v.value);

  return (
    <div className="flex flex-col gap-y-3">
      <span className="fsNormal2 font-medium">Select {title}</span>
      <div className="flex flex-wrap justify-between gap-1" data-testid={dataTestId}>
        {filteredOptions.map((v) => {
          return (
            <Button
              key={v}
              onPress={() => updateOption(option.id, v)}
              disabled={disabled}
              variant={v === current ? "solid" : "ghost"}
              data-testid="option-button"
              className="grow"
            >
              {v}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default OptionSelect;

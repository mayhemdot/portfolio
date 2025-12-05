import { Select, SelectItem } from "@heroui/select";

type FilterRadioGroupProps = {
  title: string;
  items: {
    value: string;
    label: string;
  }[];
  value: any;
  handleChange: (...args: any[]) => void;
  "data-testid"?: string;
};

export const FilterRadioGroup = ({
  title,
  items,
  value,
  handleChange,
  "data-testid": dataTestId,
}: FilterRadioGroupProps) => {
  return (
    <Select
      data-testid={dataTestId}
      label={title}
      selectedKeys={[value]}
      className="min-w-48 max-w-32"
      size={"sm"}
      onChange={(e) => handleChange(e.target.value)}
    >
      {items.map((metal) => (
        <SelectItem key={metal.value} textValue={metal.value}>
          {metal.label}
        </SelectItem>
      ))}
    </Select>
  );
};

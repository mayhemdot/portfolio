// import { Text } from "@/modules/common/components/Text";
import type { StoreProductVariant } from "@/modules/products/types";
import { Text } from "@/shared/components/Text";

type LineItemOptionsProps = {
  variant: StoreProductVariant | undefined;
  "data-testid"?: string;
  "data-value"?: StoreProductVariant;
};

const LineItemOptions = ({ variant, "data-testid": dataTestid, "data-value": dataValue }: LineItemOptionsProps) => {
  return (
    <Text
      comp="span"
      size="xxs"
      data-testid={dataTestid}
      data-value={dataValue}
      className="inline-block txt-medium fsSmall text-default-500 w-full overflow-hidden text-ellipsis"
    >
      Variant: {variant?.title}
    </Text>
  );
};

export default LineItemOptions;

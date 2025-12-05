import { getPercentageDiff } from "@/modules/products/utils/get-precentage-diff";
import { convertToLocale } from "@/modules/products/utils/money";
import { Text } from "@/shared/components/Text";
import { cn } from "@/shared/utils/cn";
import { useParams } from "next/navigation";
import { routing } from "@/i18n/routing";
import type { CartLineItem } from "../../store/cart";

type LineItemPriceProps = {
  item: CartLineItem; //| StoreOrderLineItem;
  style?: "default" | "tight";
  currencyCode: string;
};

const LineItemPrice = ({ item, style = "default", currencyCode }: LineItemPriceProps) => {
  const { total, original_total } = item;
  const { locale = routing.defaultLocale } = useParams() as { locale?: string };

  const adjustmentsSum = (item.adjustments || []).reduce((acc, adjustment) => adjustment.amount || 0 + acc, 0);

  const originalPrice = original_total;
  const currentPrice = total - adjustmentsSum;
  const hasReducedPrice = currentPrice < originalPrice;

  return (
    <div className="flex flex-col gap-x-1 items-end">
      <div className="text-left">
        {hasReducedPrice && (
          <>
            <p>
              {style === "default" && <span className="fsSmall">Original: </span>}
              <Text
                data-testid="product-original-price"
                comp="span"
                variant="secondary"
                size="xxs"
                className="line-through"
              >
                {convertToLocale({
                  amount: originalPrice,
                  currency_code: currencyCode,
                  locale,
                })}
              </Text>
              s
            </p>
            {style === "default" && (
              <Text
                data-testid="product-original-price"
                comp="span"
                variant="secondary"
                size="xxs"
                className="line-through"
              >
                -{getPercentageDiff(originalPrice, currentPrice || 0)}%
              </Text>
            )}
          </>
        )}
        <Text
          comp="span"
          variant="secondary"
          size="xxs"
          className={cn({
            "text-ui-fg-interactive": hasReducedPrice,
          })}
          data-testid="product-price"
        >
          {convertToLocale({
            amount: currentPrice,
            currency_code: currencyCode,
            locale,
            maximumFractionDigits: 0,
          })}
        </Text>
      </div>
    </div>
  );
};

export default LineItemPrice;

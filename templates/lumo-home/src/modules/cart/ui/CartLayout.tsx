import { useLocale, useTranslations } from "next-intl";
import type { PropsWithChildren } from "react";
import { Shell } from "@/shared/components/ui/shell";
import { formatPrice } from "@/shared/utils/formatPrice";

type Props = {
  title: string;
  totalShipping: number;
  totalItems: number;
  totalPrice: number;
  currencyCode: string;
  action: React.ReactNode;
};

export function CartAndCheckoutLayout(props: PropsWithChildren<Props>) {
  const {
    title,
    totalItems,
    totalShipping,
    totalPrice,
    children,
    action,
    currencyCode,
  } = props;

  const locale = useLocale();

  const subTotalPrice = totalPrice - totalShipping;
  const priceSettings = {
    locale: locale,
    currencyCode: currencyCode,
  };

  const t = useTranslations("checkoutPage");

  return (
    <section className="container max-w-7xl mx-auto mb-8">
      <h1 className="block fl-text-32/48 capitalize font-medium mb-4">
        {title}
      </h1>

      <div className="flex flex-col md:flex-row fl-gap-8/32">
        <div className="grow">{children}</div>

        <div className="shrink-0 h-fit w-full grow max-w-72 xl:max-w-80">
          <Shell variant="primary" className="mb-2 xl:mb-4">
            <div>
              <h2 className="fl-text-24/32 mb-2">{t("orderSummary.title")}</h2>
              <div className="flex justify-between gap-2 border-b border-dashed fl-text-16/20">
                <h3>{t("orderSummary.productItems")}</h3>
                <div>{totalItems > 0 && `(${totalItems})`}</div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center border-b border-dashed gap-2 py-1 fl-text-16/20">
                <h2 className="font-medium">
                  {t("orderSummary.subtotalPrice")}
                </h2>
                <div>{formatPrice(subTotalPrice, priceSettings)}</div>
              </div>
              <div className="flex justify-between gap-2 py-1 border-b border-dashed fl-text-16/20">
                <h2>{t("orderSummary.shippingPrice")}</h2>
                <div className="fl-text-16/20">
                  {formatPrice(totalShipping, priceSettings)}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center gap-2 fl-text-20/28">
              <h2 className="font-medium">{t("orderSummary.totalPrice")}</h2>
              <span className="fl-text-20/28">
                {formatPrice(totalPrice, priceSettings)}
              </span>
            </div>
          </Shell>
          {action}
        </div>
      </div>
    </section>
  );
}

import type { Locale } from "next-intl";
import { getLocale } from "next-intl/server";
import type { LocaleCode } from "@/i18n/localization";
import { PRODUCTS } from "@/modules/products/model/data";
import type { Product } from "@/modules/products/model/types";
import { SliderArchive } from "@/shared/components/SliderArchive";
import { Text } from "@/shared/components/Text";

type SliderBlockProps = {
  id?: string;
  name?: string;
  introContent: string;
  limit: number;
  populateBy: "collection";
  locale: Locale;
  selectedDocs?: Product[];
};

export async function SliderBlock(props: SliderBlockProps) {
  const { id, name, introContent, limit: limitFromProps } = props;

  const limit = limitFromProps || 3;

  const locale = await getLocale() as LocaleCode;

  return (
    <div id={`slider-block-${id}`} className="padding-default">
      {introContent && (
        <div className="container mb-4 md:mb-8">
          <Text className="ml-0 max-w-3xl">{introContent}</Text>
        </div>
      )}
      <SliderArchive
        name={name}
        relationTo="products"
        products={PRODUCTS}
        locale={locale}
      />
    </div>
  );
}

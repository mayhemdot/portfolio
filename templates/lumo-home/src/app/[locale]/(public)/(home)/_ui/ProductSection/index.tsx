import type { LocaleCode } from "@/i18n/localization";
import { SliderBlock } from "@/widgets/SliderBlock/Component";

export function ProductSection({ locale }: { locale: LocaleCode }) {
  return (
    <SliderBlock
      introContent={"Products"}
      limit={100}
      populateBy={"collection"}
      locale={locale}
    />
  );
}

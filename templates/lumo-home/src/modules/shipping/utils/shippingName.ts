import { Lang, LocaleCode } from "@/i18n/localization";
import { Shipping, ShippingRaw } from "@/modules/shipping/model/types";

export function shippingMethodName(
	shippingMethod: ShippingRaw | number,
	lang: Lang
) {
	if (typeof shippingMethod === "object") {
		return shippingMethod?.name[lang] || "Не указан";
	} else if (typeof shippingMethod === "number") {
		return "Проверьте relation depth";
	}
}

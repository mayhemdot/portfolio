import { ShippingRaw } from "@/modules/shipping/model/types";

export const SHIPPINGS: ShippingRaw[] = [
  {
    id: 1,
    name: {
      en: "Pickup",
      ru: "Самовывоз",
    },
    slug: "pickup",
    price: {
      rub: 0,
      usd: 0,
    },
  },
  {
    id: 2,
    name: {
      en: "Courier",
      ru: "Курьер",
    },
    slug: "courier",
    price: {
      rub: 500,
      usd: 20,
    },
  },
]
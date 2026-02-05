import { CurrencyCode, getCurrency, getLang, Lang, LocaleCode } from "@/i18n/localization";
import { routing } from "@/i18n/routing";
import { ProductRaw } from "@/modules/products/model/types";
import { formatPrice } from "@/shared/utils/formatPrice";

export type ShippingRaw = {
  id: number;
  name: {
    ru: string
    en: string
  };
  slug: string;
  price: {
    rub: number;
    usd: number;
  }
 meta?: {
    title: {
      en: string;
      ru: string;
    };
    description: {
      en: string;
      ru: string;
    };
  }
}



export class Shipping {
  private lang: Lang = getLang(routing.defaultLocale);
  private currency: CurrencyCode = getCurrency(routing.defaultLocale);

  constructor(
    public raw: ShippingRaw,
    public locale: LocaleCode,
  ) {
    this.lang = getLang(locale);
    this.currency = getCurrency(locale);
  }

  get id() {
    return this.raw.id;
  }

  get slug() {
    return this.raw.slug;
  }

  // get category() {
  //   return this.raw.category;
  // }

  get name() {
    return this.raw.name[this.lang];
  }

  // get description() {
  //   console.log("description", this.raw.description)
  //   return this.raw.description?.[this.lang];
  // }

  get price() {
    return this.raw.price[
      this.currency.toLowerCase() as keyof typeof this.raw.price
    ];
  }

  // get images() {
  //   return this.raw.images;
  // }

  // get updatedAt() {
  //   return this.raw.updatedAt;
  // }

  // get createdAt() {
  //   return this.raw.createdAt;
  // }

  get meta() {
    if(this.raw.meta === undefined) return {};

    return { 
       title: this.raw.meta?.title?.[this.lang],
       description: this.raw?.meta?.description?.[this.lang]
    };
  }


  prettyPrice(quantity?: number) {
    const currency = this.currency.toLowerCase() as keyof typeof this.raw.price;
    const amount = this.raw.price[currency] * (quantity || 1);
    return formatPrice(amount, {
      localeCode: this.locale,
      currencyCode: this.currency,
    });
  }

  toString() {
    return JSON.stringify(this.raw);
  }
}


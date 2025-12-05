"use server";

import { routing } from "@/i18n/routing";

// import type { HttpTypes } from "@medusajs/types";
// import { sdk } from "@/lib/config";
// import medusaError from "@/lib/util/medusa-error";
// import { getCacheOptions } from "./cookies";

const REGIONS = [
  {
    id: "reg_eu",
    name: "European Union",
    currency_code: "eur",
    tax_rate: 0.21,
    tax_code: "standard",
    gift_cards_taxable: true,
    automatic_taxes: true,
    tax_provider_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted_at: null,
    metadata: null,
    countries: [
      {
        iso_2: "fr",
        iso_3: "fra",
        name: "France",
        display_name: "France",
      },
      {
        iso_2: "de",
        iso_3: "deu",
        name: "Germany",
        display_name: "Germany",
      },
      {
        iso_2: "it",
        iso_3: "ita",
        name: "Italy",
        display_name: "Italy",
      },
      {
        iso_2: "es",
        iso_3: "esp",
        name: "Spain",
        display_name: "Spain",
      },
    ],
    payment_providers: [],
    fulfillment_providers: [],
  },
  {
    id: "reg_us",
    name: "United States",
    currency_code: "usd",
    tax_rate: 0.08,
    tax_code: "standard",
    gift_cards_taxable: true,
    automatic_taxes: true,
    tax_provider_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted_at: null,
    metadata: null,
    countries: [
      {
        iso_2: "us",
        iso_3: "usa",
        name: "United States",
        display_name: "United States",
      },
    ],
    payment_providers: [],
    fulfillment_providers: [],
  },
  {
    id: "reg_ru",
    name: "Russia",
    currency_code: "rub",
    tax_rate: 0.2,
    tax_code: "standard",
    gift_cards_taxable: true,
    automatic_taxes: true,
    tax_provider_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted_at: null,
    metadata: null,
    countries: [
      {
        iso_2: "ru",
        iso_3: "rus",
        name: "Russia",
        display_name: "Russia",
      },
    ],
    payment_providers: [],
    fulfillment_providers: [],
  },
];

export async function listRegions(): Promise<StoreRegion[]> {
  //   const next = {
  //     ...(await getCacheOptions("regions")),
  //   }
  //   return sdk.client
  //     .fetch<{ regions: HttpTypes.StoreRegion[] }>(`/store/regions`, {
  //       method: "GET",
  //       next,
  //       cache: "force-cache",
  //     })
  //     .then(({ regions }) => regions)
  //     .catch(medusaError)

  return REGIONS;
}

// export const retrieveRegion = async (id: string) => {
//   const next = {
//     ...(await getCacheOptions(["regions", id].join("-"))),
//   };

//   return sdk.client
//     .fetch<{ region: HttpTypes.StoreRegion }>(`/store/regions/${id}`, {
//       method: "GET",
//       next,
//       cache: "force-cache",
//     })
//     .then(({ region }) => region)
//     .catch(medusaError);
// };

const regionMap = new Map<string, StoreRegion>();

export const getRegion = async (countryCode: string) => {
  countryCode = countryCode.toLowerCase();

  console.log("countryCode", countryCode);
  try {
    if (regionMap.has(countryCode)) {
      return regionMap.get(countryCode);
    }

    const regions = await listRegions();

    if (!regions?.length) {
      return null;
    }

    regions.forEach((region) => {
      region.countries?.forEach((c) => {
        regionMap.set(c?.iso_2 ?? "", region);
      });
    });

    const region = countryCode ? regionMap.get(countryCode) : regionMap.get("us");

    return region;
  } catch (e: unknown) {
    console.log("error", e);
    return null;
  }
};

// export const getRegionById = async (regionById: string) => {
//   try {
//     if (regionMap.has(countryCode)) {
//       return regionMap.get(countryCode);
//     }

//     const regions = await listRegions();

//     if (!regions) {
//       return null;
//     }

//     regions.forEach((region) => {
//       region.countries?.forEach((c) => {
//         regionMap.set(c?.iso_2 ?? "", region);
//       });
//     });

//     const region = countryCode ? regionMap.get(countryCode) : regionMap.get("us");

//     return region;
//   } catch (e: unknown) {
//     return null;
//   }
// };

export interface StoreRegion {
  id: string;
  name: string;
  currency_code: string;
  tax_rate: number;
  tax_code: string | null;
  gift_cards_taxable: boolean;
  automatic_taxes: boolean;
  tax_provider_id: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  metadata: Record<string, unknown> | null;
  countries: ICountry[];
  payment_providers?: PaymentProvider[];
  fulfillment_providers?: FulfillmentProvider[];
}

interface PaymentProvider {
  id: string;
  is_installed: boolean;
  // Дополнительные поля которые могут быть в ответе:
  name?: string;
  enabled?: boolean;
  logo?: string | null;
  metadata?: Record<string, unknown> | null;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

interface FulfillmentProvider {
  id: string;
  is_installed: boolean;
  // Дополнительные поля:
  name?: string;
  enabled?: boolean;
  logo?: string | null;
  metadata?: Record<string, unknown> | null;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

interface ICountry {
  iso_2: string;
  iso_3: string;
  name: string;
  display_name: string;
  num_code?: number;
  region_id?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

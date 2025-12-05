"use client";
export const STRIPE_REGIONS = {
  eu: [
    "AT",
    "BE",
    "BG",
    "HR",
    "CY",
    "CZ",
    "DK",
    "EE",
    "FI",
    "FR",
    "DE",
    "GR",
    "HU",
    "IE",
    "IT",
    "LV",
    "LT",
    "LU",
    "MT",
    "NL",
    "PL",
    "PT",
    "RO",
    "SK",
    "SI",
    "ES",
    "SE",
  ],
  uk: ["GB"],
  us: ["US"],
  ca: ["CA"],
  ch: ["CH"],
  no: ["NO"],
  au: ["AU"],
  nz: ["NZ"],
  latam: ["BR", "MX", "AR", "CL", "CO", "PE"],
  apac: ["SG", "HK", "KR", "MY", "ID", "VN", "TH", "PH", "IN", "CN", "TW"],
};

export function detectStripeRegionFromCountryCode(countryCode: keyof typeof STRIPE_REGIONS) {
  const code = countryCode.toUpperCase();

  return Object.entries(STRIPE_REGIONS).find(([_, countries]) => countries.includes(code))?.[0] || "rest_of_world";
}

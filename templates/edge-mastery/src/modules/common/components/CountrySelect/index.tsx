"use client";
import { Select, SelectItem, type SelectProps } from "@heroui/select";
import { useParams } from "next/navigation";
import { useTransitionRouter } from "next-view-transitions";
import { parseAsString, useQueryState } from "nuqs";
import React, { forwardRef, useImperativeHandle, useMemo, useRef } from "react";
import ReactCountryFlag from "react-country-flag";
// import { useNavigation, useRouter } from 'next-intl/routing';
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/shared/utils/cn";
import { getCountryCodeFromLocale, getLanguageFromLocale } from "../../lib/get-region";
import type { StoreRegion } from "../../lib/get-region-action";

// import { routing } from "@/i18n/routing";
// import { useRegionStore } from "../../store/region";

const COUNTRY_TO_LOCALE: Record<string, string> = {
  de: "de-DE",
  it: "it-IT",
  fr: "fr-FR",
  es: "es-ES",
  gb: "en-GB",
  ru: "ru-RU",
};

export const CountrySelect = forwardRef<
  HTMLSelectElement,
  Omit<SelectProps, "children"> & {
    locale?: string;
    regions?: StoreRegion[];
    isShort?: boolean;
  }
>(({ placeholder = "Country", regions, className, isShort, ...props }, ref) => {
  const { locale = routing.defaultLocale, ...params } = useParams();
  const router = useRouter();
  const countryCode = getCountryCodeFromLocale(locale as string);
  const pathname = usePathname();
  // const [state, setState] = useQueryState(locale.toString(), parseAsString.withOptions({ history: "push" }));

  // const lang = getLanguageFromLocale(locale as string);
  // const currentPath = usePathname().split(`/${locale}`)[1];
  // const { region, setRegion } = useRegionStore();
  const innerRef = useRef<HTMLSelectElement>(null);
  // const [iso_2, setIso_2] = React.useState<string | undefined | null>(countryCode);

  useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(ref, () => innerRef.current);

  const countryOptions = useMemo(() => {
    return regions
      ?.flatMap((sr: StoreRegion) => {
        return sr.countries?.map((c) => ({
          region: sr.id,
          value: c.iso_2,
          label: c.display_name,
        }));
      })
      .sort((a, b) => (a?.label ?? "").localeCompare(b?.label ?? ""));
  }, [regions]);

  return (
    countryOptions && (
      <Select
        className={cn("h-12 w-full", className, {
          "w-24": isShort,
        })}
        aria-labelledby="country"
        ref={innerRef}
        placeholder={placeholder}
        onChange={(e) => {
          // if (!e.target.value) {
          //   setIso_2(null);
          //   return null;
          // }
          // setIso_2(e.target.value);

          // const region = regions?.find((r) => r.countries?.some((c) => c.iso_2 === e.target.value));
          // if (!region) return null;

          const nextLocale = COUNTRY_TO_LOCALE[e.target.value] || "en-US";
          // setRegion(region);
          // console.log("nextLocale", nextLocale);
          // router.push(`/${nextLocale}`);
          // router.refresh();
          router.replace(
            // @ts-expect-error -- TypeScript will validate that only known `params`
            // are used in combination with a given `pathname`. Since the two will
            // always match for the current route, we can skip runtime checks.
            { pathname, params },
            { locale: nextLocale },
          );
        }}
        defaultSelectedKeys={[countryCode]}
        startContent={
          countryCode && (
            <ReactCountryFlag svg style={{ width: "16px", height: "16px" }} countryCode={countryCode ?? ""} />
          )
        }
        {...props}
      >
        {countryOptions.map(({ value, label, region }: any, index) => (
          <SelectItem
            key={value}
            startContent={
              value && <ReactCountryFlag svg style={{ width: "16px", height: "16px" }} countryCode={value} />
            }
          >
            {isShort ? value : label}
          </SelectItem>
        ))}
      </Select>
    )
  );
});

CountrySelect.displayName = "CountrySelect";

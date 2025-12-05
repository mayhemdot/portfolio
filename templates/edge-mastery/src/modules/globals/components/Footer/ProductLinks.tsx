"use client";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Divider } from "@heroui/react";
import { useParams } from "next/navigation";
import { Link } from "next-view-transitions";
import { routing } from "@/i18n/routing";
import { getLanguageFromLocale } from "@/modules/common/lib/get-region";
import { CATEGORIES } from "@/modules/products/constants";
import { cn } from "@/shared/utils/cn";

export function ProductLinks() {
  const { locale = routing.defaultLocale } = useParams() as { locale: string };
  const countryCode = getLanguageFromLocale(locale) as keyof typeof CATEGORIES[0]["name"];
  const MENU_ITEMS = [
    {
      label: "By category",
      href: "#",
      submenu: CATEGORIES.map((category) => ({
        label: category.name[countryCode] || category.name.en,
        href: `/products?categories=${category.handle}`,
      })),
    },
    {
      label: "By material",
      href: "#",
      submenu: [
        {
          label: "M390",
          href: "/products?material=m390",
        },
        {
          label: "Elmax",
          href: "/products?material=elmax",
        },
      ],
    },
  ];
  return (
    <Accordion>
      {MENU_ITEMS.map((item) => (
        <AccordionItem key={item.label} aria-label={item.label} title={item.label}>
          {item.submenu.map((subitem, index: number) => (
            <div className="pl-4" key={subitem.label}>
              <Link href={subitem.href} className="ml-4 block py-2 hover:opacity-80">
                {subitem.label}
              </Link>
              {index !== item.submenu.length - 1 && <Divider />}
            </div>
          ))}
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function ProductLinksNav({ className }: { className?: string }) {
  const { locale = routing.defaultLocale } = useParams() as { locale: string };
  const countryCode = getLanguageFromLocale(locale) as keyof typeof CATEGORIES[0]["name"];
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {CATEGORIES.map((category) => (
        <Link
          key={category.handle}
          href={`/products?categories=${category.handle}`}
          className="hover:text-accent transition-color duration-200 font-extralight"
        >
          {category.name[countryCode] || category.name.en}
        </Link>
      ))}
    </div>
  );
}

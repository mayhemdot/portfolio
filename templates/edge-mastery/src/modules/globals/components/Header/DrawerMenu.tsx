"use client";

import { Accordion, AccordionItem } from "@heroui/accordion";
import { Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader } from "@heroui/drawer";
import { Button, Divider } from "@heroui/react";
import { useDisclosure } from "@heroui/use-disclosure";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "next-view-transitions";
import React from "react";
import { listCategories } from "@/modules/categories/actions";
import { CopyrightNotice } from "@/modules/common/components/CopyrightNotice";
import { CountrySelect } from "@/modules/common/components/CountrySelect";
import { getLanguageFromLocale } from "@/modules/common/lib/get-region";
import type { StoreRegion } from "@/modules/common/lib/get-region-action";
import { CATEGORIES } from "@/modules/products/constants";
import { Nav } from "./Nav";
import { SearchBar } from "./SearchBar";

// import { CATEGORIES } from "@/modules/categories/queries/categories";

type Props = {
  title: string;
  searchBarTitle: string;
  actions: React.ReactNode[];
  regions: StoreRegion[];
  locale: string;
};

export function DrawerMenu({ title, searchBarTitle, regions, locale, actions }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // const categories = await listCategories()
  const t = useTranslations();
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
  // const MENU_ITEMS = [
  //   {
  //     label: "Ножи",
  //     href: "#",
  //     submenu: [
  //       {
  //         label: "Хиты продаж",
  //         href: "#",
  //       },
  //       {
  //         label: "Для охоты",
  //         href: "#",
  //       },
  //       {
  //         label: "Для кухни",
  //         href: "#",
  //       },
  //     ],
  //   },
  //   {
  //     label: "Хранение",
  //     href: "#",
  //     submenu: [
  //       {
  //         label: "Ножны",
  //         href: "#",
  //       },
  //       {
  //         label: "Подставки",
  //         href: "#",
  //       },
  //     ],
  //   },
  //   {
  //     label: "Металл",
  //     href: "#",
  //     submenu: [
  //       {
  //         label: "Бланки/Заготовка",
  //         href: "#",
  //       },
  //       {
  //         label: "Ножны",
  //         href: "#",
  //       },
  //     ],
  //   },
  // ];
  return (
    <>
      <Button className="flex lg:hidden" onPress={onOpen} isIconOnly endContent={<Menu className="size-5" />} />
      <Drawer
        isOpen={isOpen}
        size="sm"
        onOpenChange={onOpenChange}
        backdrop="blur"
        className="greenGradient rounded-none border-zinc-700"
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="fl-text-20/32 font-mono! flex w-full pt-8 text-center font-extralight ">
                {title}
              </DrawerHeader>
              <DrawerBody>
                <SearchBar title={searchBarTitle || "Type to search"} actions={[]} inModal />
                <div className="fl-text-20/32 mt-20 px-8">
                  <Nav />
                </div>
                {/* Купить */}
                {/* <Accordion>
					{MENU_ITEMS.map(item => (
										<AccordionItem
											key={item.label}
											aria-label={item.label}
											title={item.label}
										>
											{item.submenu.map((subitem, index) => (
												<div className='pl-4' key={subitem.label}>
													<Link
														href={subitem.href}
														className='ml-4 block py-2 hover:opacity-80'
													>
														{subitem.label}
													</Link>
													{index !== item.submenu.length - 1 && <Divider />}
												</div>
											))}
										</AccordionItem>
									))}
								</Accordion> */}
              </DrawerBody>
              <DrawerFooter>
                <div className="flex grow flex-col items-stretch gap-4">
                  <CountrySelect regions={regions} locale={locale} />
                  {/* {[]} */}
                  {/* </CountrySelect> */}
                  <div className="flex items-center space-x-4 pt-4">
                    {actions?.map((action, index) => (
                      <React.Fragment key={index.toString()}>{action}</React.Fragment>
                    ))}
                    {/* <Link
                      href={"/work"}
                      showAnchorIcon
                      anchorIcon={<Calendar className="ml-2 size-4" />}
                    >
                      График работы
                    </Link>
                    <Link
                      isExternal
                      showAnchorIcon
                      anchorIcon={<MapPin className="ml-2 size-4" />}
                      href={"/contacts"}
                    >
                      Контакты
                    </Link> */}
                  </div>

                  <CopyrightNotice siteName={"Edge Mastery"} />
                </div>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}

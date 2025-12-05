"use client";

// import type { HttpTypes } from "@medusajs/types";
// import Back from "@modules/common/icons/back";
// import FastDelivery from "@modules/common/icons/fast-delivery";
// import Refresh from "@modules/common/icons/refresh";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { type LucideIcon, Truck, Undo2 } from "lucide-react";
import type { Locale } from "next-intl";
import type { JSX } from "react";
import { Text } from "@/shared/components/Text";
import type { StoreProduct } from "../../types";

type ProductTabsProps = {
  product: StoreProduct;
};

export type ShippingInfoItem = {
  id: number;
  icon: LucideIcon;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
};

const SHIPPING_INFO: ShippingInfoItem[] = [
  {
    id: 1,
    icon: Truck,
    title: {
      en: "Fast Delivery",
      es: "Entrega Rapida",
      ru: "Быстрая доставка",
      de: "Schnelle Lieferung",
    },
    description: {
      en: "Your package will arrive in 3-5 business days at your pick up location or in the comfort of your home.",
      es: "Tu paquete llegará en 3-5 días laborables en tu ubicación de recogida o en la comodidad de tu casa.",
      ru: "Ваш товар будет доставлен в течение 3-5 рабочих дней в выбранном вами месте.",
      de: "Dein Paket wird in 3-5 Arbeitstage an deiner Abholstelle oder zu Hause geliefert.",
    },
  },
  {
    id: 2,
    icon: Undo2,
    title: {
      en: "Easy returns",
      es: "Devoluciones faciles",
      ru: "Легкие возвраты",
      de: "Einfache Retouren",
    },
    description: {
      en: "If your product is defective, we will refund you or exchange it for a new one.",
      es: "Si tu producto tiene un defecto, te devolveremos el dinero o lo cambiaremos por uno nuevo.",
      ru: "Если ваш товар бракован, мы вернём деньги или обменяем его на новый.",
      de: "Wenn dein Produkt einen Defekt hat, erstatten wir dir das Geld oder tauschen es gegen ein neues aus.",
    },
  },
];

const ProductTabs = ({ lang, product }: ProductTabsProps & { lang: Locale }) => {
  const TABS: {
    label: Record<Locale, string>;
    component: JSX.Element;
  }[] = [
    {
      // label: "Product Information",
      label: {
        en: "Product Information",
        es: "Información del producto",
        ru: "Информация о товаре",
        de: "Produktinformation",
      } as Record<Locale, string>,
      component: <ProductInfoTab product={product} lang={lang} />,
    },
    {
      label: {
        en: "Shipping Information",
        es: "Información de envío",
        ru: "Информация о доставке",
        de: "Versandinformationen",
      },
      component: <ShippingInfoTab lang={lang} infoRows={SHIPPING_INFO} />,
    },
  ];

  return (
    <Accordion selectionMode="multiple" className="px-0">
      {TABS.map((tab) => (
        <AccordionItem
          key={tab.label[lang] || "Product Iformation"}
          title={
            <Text comp="span" className="text-gray-color font-extralight" size="xs" variant="secondary">
              {tab.label[lang]}
            </Text>
          }
          value={tab.label[lang] || "Product Iformation"}
        >
          {tab.component}
        </AccordionItem>
      ))}
    </Accordion>
  );
};

const ProductInfoTab = ({ lang, product }: ProductTabsProps & { lang: Locale }) => {
  const PRODUCT_INFO: { id: number; title: Record<Locale, string>; description: string }[] = [
    {
      id: 1,
      title: {
        en: "Weight",
        es: "Peso",
        ru: "Вес",
        de: "Gewicht",
      },
      description: product.weight ? `${product.weight} g` : "-",
    },
    {
      id: 2,
      title: {
        en: "Dimensions (LxWxH)",
        es: "Dimensiones (LxWxH)",
        ru: "Размеры (LxWxH)",
        de: "Dimensionen (LxWxH)",
      },
      description:
        product.length && product.width && product.height
          ? `${product.length}L x ${product.width}W x ${product.height}H`
          : "-",
    },
    {
      id: 3,
      title: {
        en: "Type",
        es: "Tipo",
        ru: "Тип",
        de: "Typ",
      },
      description: product.type ? product.type.value : "-",
    },
    {
      id: 4,
      title: {
        en: "Steel",
        es: "Acero",
        ru: "Сталь",
        de: "Stahl",
      },
      description: "Elmax", //product?.steel ? product.steel : "-",
    },
    {
      id: 5,
      title: {
        en: "Material",
        es: "Material",
        ru: "Материал",
        de: "Material",
      },
      description: product.material ? product.material : "-",
    },
    {
      id: 6,
      title: {
        en: "Country of origin",
        es: "País de origen",
        ru: "Страна происхождения",
        de: "Land der Herstellung",
      },
      description: product.origin_country ? product.origin_country : "-",
    },
  ];
  return (
    <div className="grid grid-cols-2 gap-4">
      {PRODUCT_INFO.map((info) => (
        <div key={info.id}>
          <ProductInfoTitle text={info.title[lang]} />
          <ProductInfoDesc text={info.description} />
        </div>
      ))}
    </div>
  );
};

const ShippingInfoTab = ({ lang, infoRows }: { lang: Locale; infoRows: ShippingInfoItem[] }) => {
  return (
    <div className="grid grid-cols-1 gap-y-8">
      {infoRows.map((info) => (
        <div className="flex items-start gap-x-2" key={info.id}>
          <info.icon className="size-6 shrink-0 m-2" />
          <div className="space-y-2">
            <ProductInfoTitle text={info.title[lang]} />
            <ProductInfoDesc text={info.description[lang]} />
          </div>
        </div>
      ))}
    </div>
  );
};

function ProductInfoTitle({ text }: { text: string }) {
  return (
    <Text comp="h3" size={"xxs"} variant="secondary" className="text-gray-color">
      {text}
    </Text>
  );
}
function ProductInfoDesc({ text }: { text: string }) {
  return (
    <Text comp="p" size={"xxs"} variant="gray" className="text-gray-color">
      {text}
    </Text>
  );
}

export default ProductTabs;

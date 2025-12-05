"use client";

import { Chip, getKeyValue, Select, SelectItem, TableCell, TableRow, Tooltip } from "@heroui/react";
import { range } from "lodash";
import { DeleteIcon, EditIcon, EyeIcon, Table, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { LocalizedClientLink } from "@/modules/common/components/LocalizedClientLink";
import DeleteButton from "@/modules/products/components/DeleteButton";
import Thumbnail from "@/modules/products/components/ProductThumbnail";
import { Text } from "@/shared/components/Text";
import { cn } from "@/shared/utils/cn";
import { type StoreCart, useCartStore } from "../../store/cart";
import LineItemOptions from "../LineItemOptions";
import LineItemPrice from "../LineItemPrice";

type ProductTitle = {
  title: string;
  variant?: string;
};

type Thumbnail = {
  product_handle: string;
  src: string;
  images?: string[];
};

type PriceInfo = {
  currency_code: string;
  total: number;
  original_total: number;
  unit_price: number;
};

type CartItem = {
  id: string ;
  product_title: ProductTitle;
  thumbnail: Thumbnail;
  title: string;
  product_type: string;
  quantity: PriceInfo & { quantity: number };
  price: PriceInfo;
  variant:any;
};

type Props = {
  item: CartItem; // StoreCart["items"][0];
  type?: "full" | "preview";
  columnKey: any; //"name" | "role" | "status" | "actions";
  cellValue: any;
};

export const CellVariant = ({ item, columnKey, cellValue, type = "full" }: Props) => {
  // const maxQuantity = 20
  // console.log(">> fkg ---", columnKey, cellValue)
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { updateQuantity, items } = useCartStore();
  const changeQuantity = async (quantity: number) => {
    // setError(null);
    setUpdating(true);
    updateQuantity(item.id, item.quantity.currency_code, quantity);
    //     await updateLineItem({
    //       lineId: item.id,
    //       quantity,
    //     })
    //       .catch((err) => {
    //         setError(err.message);
    //       })
    //       .finally(() => {
    //         setUpdating(false);
    //       });
    setUpdating(false);
  };
  console.log("items>>>", items);

  // TODO: Update this to grab the actual max inventory
  const maxQtyFromInventory = 10;
  const maxQuantity = item.variant?.manage_inventory ? 10 : maxQtyFromInventory;
  console.log("[[[cellValue]]]", cellValue);
  switch (columnKey) {
    case "thumbnail":
      return (
        <div className="relative min-h-full h-full grow">
          <LocalizedClientLink
            href={`/products/${cellValue.product_handle}`}
            className={cn("flex h-full min-h-full", {
              "w-16": type === "preview",
              "lg:w-18 xl:w-24 w-16": type === "full",
            })}
          >
            <Thumbnail thumbnail={cellValue?.src} images={cellValue?.images} size="square" />
          </LocalizedClientLink>
          <Chip variant="shadow" size="sm" color="danger" className="absolute -top-3 w-fit px-0 left-0 md:hidden">
            <DeleteButton
              id={item.id}
              data-testid="product-delete-button"
              className="p-1! w-fit size-4 justify-center"
            />
          </Chip>
        </div>
      );
    case "product_title":
      //   console.log("[cellValue: product_title]", cellValue);
      return (
        <>
          <Text variant="secondary" size="xs">
            {cellValue.title}
          </Text>
          <LineItemOptions variant={cellValue.variant} data-testid="product-variant" />
        </>
      );

    case "quantity":
      return (
        <div className="flex items-start justify-start flex-col gap-1">
          <div className="block md:hidden">
            {type === "preview" && (
              <span className="flex items-center gap-x-1">
                <span className="text-default-500">{cellValue.quantity} x </span>
                <LineItemPrice item={cellValue} style="tight" currencyCode={cellValue.currency_code} />
                {/* <LineItemUnitPrice item={cellValue} style="tight" currencyCode={cellValue.currency_code} /> */}
              </span>
            )}
            <LineItemPrice item={cellValue} style="tight" currencyCode={cellValue.currency_code} />
          </div>
          <Select
            size={"sm"}
            className="min-w-[75px] max-w-[110px]"
            label="Quant"
            variant="underlined"
            selectorIcon={undefined}
            
            required
            isRequired
            onChange={(e) => changeQuantity(Number(e.target.value || "1"))}
            defaultSelectedKeys={[String(Math.min(cellValue.quantity, 1))]}
          >
            {range(0, maxQuantity).map((i) => (
              <SelectItem textValue={String(i + 1)} key={String(i + 1)}>
                {String(i + 1)}
              </SelectItem>
            ))}
          </Select>
        </div>
      );

    case "price":
      return (
        <div
          className={cn("pr-0 flex flex-col items-start", {
            "items-end h-full justify-center": type === "preview",
          })}
        >
          {type === "preview" && (
            <span className="flex items-center gap-x-1">
              <span className="text-default-500">{item.quantity.quantity} x </span>
              <LineItemPrice item={cellValue} style="tight" currencyCode={cellValue.currency_code} />
              {/* <LineItemUnitPrice item={cellValue} style="tight" currencyCode={cellValue.currency_code} /> */}
            </span>
          )}
          <LineItemPrice item={cellValue} style="tight" currencyCode={cellValue.currency_code} />
        </div>
      );
    case "actions":
      return (
        <Tooltip color="danger" content="Delete user">
          <DeleteButton id={item.id} data-testid="product-delete-button" className="self-end" />
        </Tooltip>
      );
    default:
      return cellValue;
  }
};

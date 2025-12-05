"use client";
import { getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/table";
import { EditIcon, ImageIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import { cn } from "@/shared/utils/cn";
import { CellVariant } from "../components/CellVariant/CellVariant";
import type { StoreCart } from "../store/cart";

type ItemsTemplateProps = {
  cart?: StoreCart | null;
};

const ItemsTemplate = ({ cart }: ItemsTemplateProps) => {
  const renderCell = React.useCallback((item: any, columnKey: any) => {
    const cellValue = item[columnKey];
    // console.log("columnKey", columnKey, cellValue);
    return <CellVariant item={item} columnKey={columnKey} cellValue={cellValue} />;
  }, []);
  const t = useTranslations();
  return (
    <div>
      <Table removeWrapper className="col-span-9 " aria-label="Example static collection table">
        <TableHeader>
          <TableColumn key={"thumbnail"} className="px-1">
            <ImageIcon className="size-4 md:size-5" />
          </TableColumn>
          <TableColumn key={"product_title"} className="px-1 fsSmall">
            {t("cart.productTable.header.name")}
          </TableColumn>
          {/* <TableColumn
            key={"product.product_type"}
            className="hidden md:table-cell px-2 fsSmall"
          >
            Твердость
          </TableColumn> */}
          <TableColumn key={"quantity"} className={"px-1 fsSmall rounded-r-md md:rounded-none"}>
            {t("cart.productTable.header.quantity")}
          </TableColumn>
          <TableColumn key={"price"} className={"px-1 fsSmall w-1/5  hidden md:table-cell"}>
            {t("cart.productTable.header.price")}
          </TableColumn>
          <TableColumn key={"actions"} className={"px-1 fsSmall hidden md:table-cell"}>
            <EditIcon className={"size-4 mx-auto md:size-5"} />
          </TableColumn>
        </TableHeader>
        <TableBody
          items={cart?.items
            ?.sort((a, b) => ((a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1))
            .map((item) => {
              return {
                id: item.id,
                product_title: {
                  title: item.name,
                  variant: item.variant,
                },
                thumbnail: {
                  product_handle: item.product_handle,
                  src: item.thumbnail,
                  images: item.variant?.product?.images,
                },
                title: item.title,
                product_type: "knife", //item.product_type,
                quantity: {
                  quantity: item.quantity,
                  currency_code: item.currency_code,
                  original_total: item.original_total,
                  total: item.total,
                  unit_price: item.unit_price,
                },
                price: {
                  currency_code: item.currency_code,
                  total: item.total,
                  original_total: item.original_total,
                  unit_price: item.unit_price,
                },
              };
            })}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => {
                return (
                  <TableCell
                    className={cn("px-1", {
                      "hidden md:table-cell": columnKey === "actions" || columnKey === "price",
                    })}
                  >
                    {renderCell(item, columnKey)}
                  </TableCell>
                );
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ItemsTemplate;

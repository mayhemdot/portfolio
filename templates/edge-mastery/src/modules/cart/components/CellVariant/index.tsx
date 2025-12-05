"use client";
import { Chip } from "@heroui/chip";
import { TableCell, TableRow } from "@heroui/table";
import { Tooltip } from "@heroui/tooltip";
import { DeleteIcon, EditIcon, EyeIcon, Trash2Icon } from "lucide-react";
import { type FC, useState } from "react";
import InputIncrement from "@/modules/common/components/InputIncrement";
import { LocalizedClientLink } from "@/modules/common/components/LocalizedClientLink";
import Thumbnail from "@/modules/products/components/ProductThumbnail";
import { cn } from "@/shared/utils/cn";
import type { StoreCart } from "../../store/cart";

type Props = {
  item: StoreCart["items"][0];
  type?: "full" | "preview";
  columnKey: "name" | "role" | "status" | "actions";
  cellValue: any;
};

export const CellVariant = ({ item, type, user, columnKey, cellValue }: Props & any) => {
  switch (columnKey) {
    case "name":
      return (
        <LocalizedClientLink
          href={`/products/${item.product_handle}`}
          className={cn("flex", {
            "w-16": type === "preview",
            "small:w-24 w-12": type === "full",
          })}
        >
          <Thumbnail thumbnail={item.thumbnail} images={item.variant?.product?.images} size="square" />
        </LocalizedClientLink>
      );
    case "role":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-sm capitalize">{cellValue}</p>
          <p className="text-bold text-sm capitalize text-default-400">{user.team}</p>
        </div>
      );
    case "status":
      return (
        <Chip className="capitalize" color={cellValue === "active" ? "success" : "danger"} size="sm" variant="flat">
          {cellValue}
        </Chip>
      );
    case "actions":
      return (
        <div className="relative flex items-center gap-2">
          <Tooltip content="Details">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <EyeIcon />
            </span>
          </Tooltip>
          <Tooltip content="Edit user">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <EditIcon />
            </span>
          </Tooltip>
          <Tooltip color="danger" content="Delete user">
            <span className="text-lg text-danger cursor-pointer active:opacity-50">
              <DeleteIcon />
            </span>
          </Tooltip>
        </div>
      );
    default:
      return cellValue;
  }
};

// const Item: FC<Props> = ({ item, type = "full" }) => {
//   const [updating, setUpdating] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // const changeQuantity = async (quantity: number) => {
//   //   setError(null)
//   //   setUpdating(true)

//   //   await updateLineItem({
//   //     lineId: item.id,
//   //     quantity,
//   //   })
//   //     .catch((err) => {
//   //       setError(err.message)
//   //     })
//   //     .finally(() => {
//   //       setUpdating(false)
//   //     })
//   // }

//   // TODO: Update this to grab the actual max inventory
//   const maxQtyFromInventory = 10;
//   const maxQuantity = item.variant?.manage_inventory ? 10 : maxQtyFromInventory;
//   return (
//     <TableRow key={item.id} className="text-white">
//       {/* {(columnKey) => <TableCell>{getKeyValue(item.id, columnKey)}</TableCell>} */}
//       <TableCell className="px-2">
//         <LocalizedClientLink
//           href={`/products/${item.product_handle}`}
//           className={cn("flex", {
//             "w-16": type === "preview",
//             "sm:w-24 w-12": type === "full",
//           })}
//         >
//           <Thumbnail thumbnail={item.thumbnail} images={item.variant?.product?.images} size="square" />
//         </LocalizedClientLink>
//       </TableCell>
//       <TableCell className="capitalize px-2">Klinok-01</TableCell>
//       <TableCell className="hidden md:table-cell px-2">61-63HRC</TableCell>
//       <TableCell className="px-2">
//         <InputIncrement item={item} />
//       </TableCell>
//       <TableCell className="px-2">12000</TableCell>
//       <TableCell className="px-2">
//         <Tooltip color="danger" content="Удалить товар">
//           <span className="text-lg text-danger cursor-pointer active:opacity-50">
//             <Trash2Icon />
//           </span>
//         </Tooltip>
//       </TableCell>
//     </TableRow>
//   );
// };

// export default Item;

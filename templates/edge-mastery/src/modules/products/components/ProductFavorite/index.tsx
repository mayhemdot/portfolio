"use client";
import { Button } from "@heroui/button";
import { type HTMLProps, useEffect, useState, useTransition } from "react";
import { retrieveWishlist, toggleItemInWishlist } from "@/modules/cart/queries/wishlist";
// import { retrieveWishlist, toggleItemInWishlist } from "@/lib/data/wishlist";

export function ProductFavoriteButton({
  productVariantId,
  defaultIsWishlisted,
  className,
}: HTMLProps<HTMLButtonElement> & {
  productVariantId?: string;
  defaultIsWishlisted?: boolean;
}) {
  console.log("[[[[[[defaultIsWishlisted]]]]]]", defaultIsWishlisted);
  const [isFavorite, setFavorite] = useState<boolean>(defaultIsWishlisted || false);
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    const fetchFavorite = async () => {
      const wishlist = await retrieveWishlist();
      setFavorite(wishlist?.items.some((item) => item.product_variant_id === productVariantId));
    };
    fetchFavorite();
  }, [productVariantId]);
  return (
    <Button
      type={"submit"}
      className={className}
      isIconOnly
      aria-label="Like"
      color="danger"
      isDisabled={isPending}
      onPress={(e) => {
        startTransition(async () => {
          const wishlistUpdated = await toggleItemInWishlist({
            productVariantId,
          });

          setFavorite(wishlistUpdated?.items.some((item) => item.product_variant_id === productVariantId));
        });
      }}
    >
      <StartIcon filled={isFavorite} className="transition-colors" />
    </Button>
  );
}

export const HeartIcon = ({ fill = "currentColor", filled, size, height, width, ...props }: any) => {
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
    <svg
      fill={filled ? fill : "none"}
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

// export const StartIcon = ({}) => {
//   return (
//     <svg
//       aria-hidden="true"
//       fill="none"
//       focusable="false"
//       height="20"
//       role="presentation"
//       viewBox="0 0 24 24"
//       width="20"
//     >
//       <path
//         d="M13.73 3.51001L15.49 7.03001C15.73 7.52002 16.37 7.99001 16.91 8.08001L20.1 8.61001C22.14 8.95001 22.62 10.43 21.15 11.89L18.67 14.37C18.25 14.79 18.02 15.6 18.15 16.18L18.86 19.25C19.42 21.68 18.13 22.62 15.98 21.35L12.99 19.58C12.45 19.26 11.56 19.26 11.01 19.58L8.01997 21.35C5.87997 22.62 4.57997 21.67 5.13997 19.25L5.84997 16.18C5.97997 15.6 5.74997 14.79 5.32997 14.37L2.84997 11.89C1.38997 10.43 1.85997 8.95001 3.89997 8.61001L7.08997 8.08001C7.61997 7.99001 8.25997 7.52002 8.49997 7.03001L10.26 3.51001C11.22 1.60001 12.78 1.60001 13.73 3.51001Z"
//         stroke="currentColor"
//         stroke-linecap="round"
//         stroke-linejoin="round"
//         stroke-width="1.5"
//       ></path>
//     </svg>
//   )
// }
export const StartIcon = ({ fill = "currentColor", filled, size, height, width, ...props }: any) => (
  <svg
    fill={filled ? fill : "none"}
    height={size || height || 24}
    viewBox="0 0 24 24"
    width={size || width || 24}
    aria-hidden={"true"}
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="m13.73 3.51 1.76 3.52c.24.49.88.96 1.42 1.05l3.19.53c2.04.34 2.52 1.82 1.05 3.28l-2.48 2.48c-.42.42-.65 1.23-.52 1.81l.71 3.07c.56 2.43-.73 3.37-2.88 2.1l-2.99-1.77c-.54-.32-1.43-.32-1.98 0l-2.99 1.77c-2.14 1.27-3.44.32-2.88-2.1l.71-3.07c.13-.58-.1-1.39-.52-1.81l-2.48-2.48c-1.46-1.46-.99-2.94 1.05-3.28l3.19-.53c.53-.09 1.17-.56 1.41-1.05l1.76-3.52c.96-1.91 2.52-1.91 3.47 0"
    ></path>
  </svg>
);

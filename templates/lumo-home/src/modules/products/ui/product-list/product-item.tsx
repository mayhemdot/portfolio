/** biome-ignore-all lint/style/noNonNullAssertion: <explanation> */
import { Heart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/modules/cart/ui/AddToCartButton";
import { Price } from "@/modules/products/ui/product-price";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/shared/components/ui/card";
import { formatPrice } from "@/shared/utils/formatPrice";
import type { Product } from "../../model/types";

export function ProductItem({ product }: { product: Product }) {
  // const { addItem } = useCartStore(store => store)
  // const handleAddToCart = useDebouncedCallback(addItem, 500)
  return (
    <Card
      key={product.id}
      className="group bg-secondary hover:shadow-lg transition-shadow duration-300 py-0 gap-1 md:gap-2"
    >
      <CardHeader className="p-0 relative">
        <Link href={`/products/${product.slug}`}>
          <div className="relative overflow-hidden rounded-t-lg">
            <Image
              src={product.images?.[0].url || "/placeholder.svg"}
              alt={product.title || "Product"}
              className="w-full h-52 object-contain group-hover:scale-105 transition-transform duration-300"
              width={300}
              height={300}
            />

            <Badge className="absolute top-3 left-3">
              Sale
              {/* {product.badge} */}
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 bg-white/80 hover:bg-white"
            >
              <Heart className="size-4" />
            </Button>
          </div>
        </Link>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <h3 className="font-semibold text-md mb-1 md:mb-2 line-clamp-1">
          {product.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-2 md:mb-3 line-clamp-2">
          {/* {product?.description} */}
          Best product in the world
        </p>

        <div className="flex items-center gap-2 mb-2 md:mb-3">
          <div className="flex items-center gap-1">{renderStars(5)}</div>
          <span className="text-sm text-muted-foreground">5.0 ({0})</span>
        </div>

        <div className="flex items-center gap-2">
          <Price size="sm" weight={"bold"} amount={product.price} className={""}/>
          {product.price && (
             <Price size="sm" variant={"mutedForeground"} amount={product.price}  className={"line-through"}></Price>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <AddToCartButton product={product} size="default" />
      </CardFooter>
    </Card>
  );
}
const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={String(i)}
      className={`size-4 ${
        i < Math.floor(rating)
          ? "fill-yellow-400 text-yellow-400"
          : i < rating
            ? "fill-yellow-400/50 text-yellow-400"
            : "fill-gray-200 text-gray-200"
      }`}
    />
  ));
};

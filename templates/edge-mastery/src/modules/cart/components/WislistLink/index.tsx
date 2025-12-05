import { Badge } from "@heroui/badge";
import { Button } from "@heroui/button";
import { Link as NextLink } from "next-view-transitions";
import { StartIcon } from "@/modules/products/components/ProductFavorite";
import { ROUTES } from "@/shared/utils/routes";

export function WishlistLink({ countryCode, count = 0 }: { countryCode: string; count: number }) {
  return (
    <Badge color="primary" shape="rectangle" content={count} showOutline={false}>
      <Button
        isIconOnly
        as={NextLink}
        href={ROUTES.wishlist(countryCode)}
        color="default"
        endContent={<StartIcon filled={true} className="transition-colors" />}
      />
    </Badge>
  );
}

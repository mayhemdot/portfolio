"use client";
import { Divider } from "@heroui/divider";
import dynamic from "next/dynamic";
import { Gutter } from "@/modules/common/components/Gutter";
import EmptyCartMessage from "../components/EmptyCartMessage";
import SignInPrompt from "../components/SignInPromt";
import SkeletonCartPage from "../skeletons/SkeletonCartPage";
import { useCartStore } from "../store/cart";
import ItemsTemplate from "./CartItemsTemplate";
import Summary from "./CartSummary";

const CartTemplateDynamic = ({ customer, locale }: { customer: any | null; locale: string }) => {
  const { getCartForCurrentRegion } = useCartStore();
  // const cart = getCartForCurrentRegion?.();
  // const [cart, setCart] = useState<StoreCart | null>(null);

  // useEffect(() => {
  //   setCart(getCartForCurrentRegion?.());
  // }, [getCartForCurrentRegion]);
  // const {getCartForCurrentRegion} = useCartStore();
  const cart = getCartForCurrentRegion?.();

  return (
    <section className="min-h-svh pt-8">
      {cart?.items && cart.items?.length > 0 ? (
        <Gutter gap-horizontal="sm" gap-vertical="md" className="grid grid-cols-1 lg:grid-cols-[1fr_360px]">
          <div className="flex flex-col gap-y-3">
            {!customer && (
              <>
                <SignInPrompt />
                <Divider className="my-2" />
              </>
            )}
            <ItemsTemplate cart={cart} />
          </div>
          <div className="relative h-full min-h-svh">
            <div className="flex flex-col gap-y-3 sticky top-20">
              {cart?.region && <Summary cart={{ ...cart, promotions: [] }} />}
            </div>
          </div>
        </Gutter>
      ) : null}
      {cart?.items?.length === undefined && <SkeletonCartPage />}
      {cart?.items && cart.items?.length === 0 && <EmptyCartMessage />}
    </section>
  );
};

const CartTemplate = dynamic(() => Promise.resolve(CartTemplateDynamic), {
  ssr: false,
});

export default CartTemplate;

// import type { HttpTypes } from "@medusajs/types";
// import { Gutter } from "@modules/common/components/gutter";
// import EmptyCartMessage from "../components/empty-cart-message";
// import SignInPrompt from "../components/sign-in-prompt";
// import ItemsTemplate from "./items";
// import Summary from "./summary";

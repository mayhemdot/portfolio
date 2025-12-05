"use client";

import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Trash } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import { routing } from "@/i18n/routing";
import type { StoreCart } from "@/modules/cart/store/cart";
import ErrorMessage from "@/modules/common/components/Form/ErrorMessage";
import Input from "@/modules/common/components/Input";
import { SubmitButton } from "@/modules/common/components/SubmitButton";
import { convertToLocale } from "@/modules/products/utils/money";

// import { applyPromotions, submitPromotionForm } from "@/lib/data/cart";

type DiscountCodeProps = {
  cart: StoreCart & {
    promotions: any[];
  };
};

const DiscountCode: React.FC<DiscountCodeProps> = ({ cart: cartF }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { locale = routing.defaultLocale } = useParams() as { locale?: string };

  const { items = [], promotions = [] } = cartF;
  const removePromotionCode = async (code: string) => {
    const validPromotions = promotions.filter((promotion) => promotion.code !== code);

    // await applyPromotions(validPromotions.filter((p) => p.code === undefined).map((p) => p.code!));
  };

  const addPromotionCode = async (formData: FormData) => {
    const code = formData.get("code");
    console.log("[code]", code);
    if (!code) {
      return;
    }
    const input = document.getElementById("promotion-input") as HTMLInputElement;
    const codes = promotions.filter((p) => p.code === undefined).map((p) => p.code!);
    codes.push(code.toString());

    // const applied = await applyPromotions(codes);

    if (input) {
      input.value = "";
    }
  };
  const messege = "success";
  //   const [message, formAction] = useActionState(submitPromotionForm, null);

  return (
    <div className="w-full flex flex-col">
      <div className="fsNormal">
        <form action={(a) => addPromotionCode(a)} className="w-full">
          <div className="flex gap-x-1 my-2 items-center">
            <Button
              variant="ghost"
              onPress={() => setIsOpen(!isOpen)}
              type="button"
              className="fsSmall"
              data-testid="add-discount-button"
            >
              Add Promotion Code(s)
            </Button>

            {/* <Tooltip content="You can add multiple promotion codes">
              <InformationCircleSolid color="var(--fg-muted)" />
            </Tooltip> */}
          </div>

          {isOpen && (
            <>
              <div className="flex w-full gap-x-2">
                <Input
                  className="size-full"
                  id="promotion-input"
                  name="code"
                  type="text"
                  autoFocus={false}
                  data-testid="discount-input"
                  label={""}
                />
                <SubmitButton size="md" color={"secondary"} data-testid="discount-apply-button">
                  Apply
                </SubmitButton>
              </div>

              {/* <ErrorMessage error={message} data-testid="discount-error-message" /> */}
            </>
          )}
        </form>

        {promotions.length > 0 && (
          <div className="w-full flex items-center">
            <div className="flex flex-col w-full">
              <h4 className="fsSmall mb-2">Promotion(s) applied:</h4>

              {promotions.map((promotion) => {
                return (
                  <div
                    key={promotion.id}
                    className="flex items-center justify-between w-full max-w-full mb-2"
                    data-testid="discount-row"
                  >
                    <span className="flex gap-x-1 items-baseline txt-small-plus w-4/5 pr-1">
                      <span className="truncate" data-testid="discount-code">
                        <Chip color={promotion.is_automatic ? "success" : "default"} size="sm">
                          {promotion.code}
                        </Chip>{" "}
                        (
                        {promotion.application_method?.value !== undefined &&
                          promotion.application_method.currency_code !== undefined &&
                          (promotion.application_method.type === "percentage"
                            ? `${promotion.application_method.value}%`
                            : convertToLocale({
                                amount: promotion.application_method.value,
                                currency_code: promotion.application_method.currency_code,
                                locale,
                              }))}
                        )
                        {/* {promotion.is_automatic && (
                          <Tooltip content="This promotion is automatically applied">
                            <InformationCircleSolid className="inline text-zinc-400" />
                          </Tooltip>
                        )} */}
                      </span>
                    </span>
                    {!promotion.is_automatic && (
                      <button
                        type="button"
                        className="flex items-center"
                        onClick={() => {
                          if (!promotion.code) {
                            return;
                          }

                          removePromotionCode(promotion.code);
                        }}
                        data-testid="remove-discount-button"
                      >
                        <Trash size={14} />
                        <span className="sr-only">Remove discount code from order</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscountCode;

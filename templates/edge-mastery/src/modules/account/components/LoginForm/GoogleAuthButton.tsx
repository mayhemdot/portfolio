"use client";

import { addToast } from "@heroui/react";
import { useTranslations } from "next-intl";
import { LocalizedClientLink } from "@/modules/common/components/LocalizedClientLink";
import { Button, btnVariants } from "@/shared/components/ui/Button";
import { ROUTES } from "@/shared/utils/routes";
// import { Button } from "@nextui-org/react";
// import { loginGoogle } from "@/lib/data/customer";
// import { ROUTES } from "@/lib/util/routes";
// import LocalizedClientLink from "@/modules/common/components/localized-client-link";

export function GoogleAuthButton() {
  const t = useTranslations();
  const loginGoogle = async () => {};
  return (
    <div className="space-y-4 w-full grow xl:space-y-6 mt-6">
      <div>
        <h3 className="pb-3 text-gray-color">{t("login.form.links.or_sign_in") || "Or sign in with"}</h3>
        <div className="flex flex-row gap-3">
          <button
            type="button"
            data-testid="checkout-button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToast({
                title: t("messages.demo.login"),
                color: "warning",
                variant: "bordered",
              });
            }}
            className={btnVariants({ size: "md", variant: "glow", className: "grow w-full" })}
          >
            {" "}
            <svg
              className="mr-2 -ml-1 w-4 h-4"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="google"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              ></path>
            </svg>
            Google
            {/* {isLoading ? t("login.form.submit.loading") : t("login.form.submit")} */}
            {/* {t("cart.summary.checkoutBtn")} */}
          </button>
          {/* <Button size={"md"} className="w-full" onClick={() => loginGoogle()}>
            <svg
              className="mr-2 -ml-1 w-4 h-4"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="google"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              ></path>
            </svg>
            Google
          </Button> */}
        </div>
      </div>

      <div className="text-center">
        {t("login.form.links.register_not_a_member")}
        {"  "}
        <LocalizedClientLink
          href={ROUTES.signup()}
          className="hover:underline cursor-pointer text-primary/80"
          data-testid="register-button"
        >
          {/* Create account */}
          {t("login.form.links.register_link")}
        </LocalizedClientLink>
        .
      </div>
    </div>
  );
}

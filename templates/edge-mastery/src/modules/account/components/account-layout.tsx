// import UnderlineLink from "@modules/common/components/interactive-link";
import { Divider } from "@heroui/divider";
import type React from "react";
import InteractiveLink from "@/modules/common/components/InteractiveLink";
import { LocalizedClientLink } from "@/modules/common/components/LocalizedClientLink";
import { cn } from "@/shared/utils/cn";
import AccountNav from "./account-nav";

interface AccountLayoutProps {
  template?: "login" | "dashboard" | "check-email";
  customer: any | null;
  children: React.ReactNode;
}

async function AccountLayout({ customer, template, children }: AccountLayoutProps) {
  return (
    <>
      <div
        className={cn("grid grid-cols-1 mx-auto grow w-full relative", {
          "small:grid-cols-[240px_1fr] max-w-7xl": template === "dashboard",
        })}
      >
        {customer && <AccountNav customer={customer} />}
        <div
          className={cn("mx-auto mb-32 sm:min-h-96 w-full", {
            "flex justify-center": template === "login",
            "max-w-7xl": template === "dashboard",
          })}
        >
          {children}
        </div>
      </div>

      <div className="container mx-auto max-w-7xl">
        <Divider />
        <div className="flex flex-col small:flex-row items-end justify-between py-12 gap-8">
          <div>
            <h3 className="text-xl-semi mb-4">Got questions?</h3>
            <span className="txt-medium">
              You can find frequently asked questions and answers on our customer service page.
            </span>
          </div>
          <div>
            <InteractiveLink href="/contact">Contact us</InteractiveLink>
            <LocalizedClientLink href="/customer-service">Customer Service</LocalizedClientLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountLayout;

// const lastSegment = {
//   login: {
//     label: "Log in/Sign up",
//     link: "/account",
//   },
//   dashboard: {
//     label: "Dashboard",
//     link: "/dashboard",
//   },
//   "check-email": {
//     label: "Check your email",
//     link: "/account/login",
//   },
// }[template]

"use client";

import { ArrowRightIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { Link as NextLink } from "next-view-transitions";
import type React from "react";
import type { AnchorHTMLAttributes, PropsWithChildren } from "react";
import { routing } from "@/i18n/routing";
import { Button } from "@/shared/components/ui/Button";
import { cn } from "@/shared/utils/cn";

/**
 * Use this component to create a Next.js `<Link />` that persists the current country code in the url,
 * without having to explicitly pass it as a prop.
 */
export const LocalizedClientLink = ({
  children,
  href,
  passhref,
  onClick,
  ...props
}: {
  children?: React.ReactNode;
  href: string;
  className?: string;
  onClick?: (e: any) => void;
  passhref?: true;
  [x: string]: any;
} & any) => {
  const { locale = routing.defaultLocale } = useParams();
  return (
    <NextLink href={`/${locale}${href}`} {...props}>
      {children}
    </NextLink>
  );
};

// export function LocalizedClientButton({
//   children,
//   // href,
//   passhref,
//   onClick,
//   className,
//   ...props
// }: PropsWithChildren<
//   {
//     onClick?: (e: any) => void;
//     passhref?: true;
//   } & AnchorHTMLAttributes<HTMLAnchorElement>
// >) {
//   const { countryCode = "us" } = useParams();

//   return (
//     <Button  {...props}>{}</Button>
//   )
//   // return (
//   //   <NextLink
//   //     href={`/${countryCode}${href}`}
//   //     {...props}
//   //     className={cn("overflow-clip relative block max-w-xl", className)}
//   //   >
//   //     <span>Подобрать Нож</span> <ArrowRightIcon className="size-4" />
//   //   </NextLink>
//   // );
// }

// export const LocalizedClientButton = ({
//   children,
//   href,
//   ...props
// }: {
//   children?: React.ReactNode
//   href: string
//   className?: string
//   onClick?: () => void
//   // passhref?: true
//   [x: string]: any
// } & any) => {
//   const { countryCode } = useParams()

//   return (
//     <Button href={`/${countryCode}${href}`} as={NextLink} {...props}>
//       {children}
//     </Button>
//   )
// }

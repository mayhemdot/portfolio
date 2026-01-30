import Link from "next/link";
import type React from "react";
import { forwardRef } from "react";
import type { Product } from "@/modules/products/model/types";
import { type ButtonProps, btnVariants } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";

type CMSLinkType = {
  appearance?: "inline" | ButtonProps["variant"];
  children?: React.ReactNode;
  className?: string;
  label?: string | null;
  newTab?: boolean | null;
  icon?: any;
  variant?: ButtonProps["variant"];
  reference?: {
    relationTo: "pages" | "products" | "categories";
    value: any | Product | string | number; //| Post
  } | null;
  size?: ButtonProps["size"] | null;
  type?: "custom" | "reference" | null;
  url?: string | null;
};

export const CMSLink = forwardRef<HTMLAnchorElement, CMSLinkType>(
  ({ ...props }, ref) => {
    const {
      type,
      appearance = "inline",
      children,
      className,
      label,
      newTab,
      reference,
      size: sizeFromProps,
      url,
    } = props;

    const href =
      type === "reference" &&
      typeof reference?.value === "object" &&
      reference.value.slug
        ? `${reference?.relationTo !== "pages" ? `/${reference?.relationTo}` : ""}/${
            reference.value.slug
          }`
        : url;

    if (!href) return null;

    const size = appearance === "link" ? "default" : sizeFromProps;

    const newTabProps = newTab
      ? { rel: "noopener noreferrer", target: "_blank" }
      : {};

    /* Ensure we don't break any styles set by richText */
    // Убедитесь, что мы не нарушаем никаких стилей, установленных RichText
    if (appearance === "inline") {
      return (
        <Link
          ref={ref}
          className={btnVariants({
            variant: appearance && appearance === "inline" ? "link" : "default",
            size,
            className: cn("relative", className),
          })}
          href={href || url || ""}
          {...newTabProps}
        >
          {label && label}
          {children && children}
          {props?.icon && (
            <props.icon className={"ml-auto size-5 bg-secondary"} />
          )}
        </Link>
      );
    }

    // <Button asChild className={className} size={size} variant={appearance}>
    return (
      <Link
        ref={ref}
        className={btnVariants({
          variant: appearance,
          size,
          className: cn("relative", className),
        })}
        href={href || url || ""}
        {...newTabProps}
      >
        {label && (
          <span className="link-text" style={{ fontSize: "inherit" }}>
            {label}
          </span>
        )}
        {children && children}
        {props?.icon && (
          <div className="link-icon size-8 lg:size-10 xl:size-12 absolute right-2 rounded-full bg-secondary justify-center flex items-center">
            <props.icon className={"text-primary size-5 xl:size-6"} />
          </div>
        )}
      </Link>
      // </Button>
    );
  },
);

// export const CMSLink: React.FC<CMSLinkType> = ({
// 	type,
// 	url,
// 	newTab,
// 	reference,
// 	children,
// 	className,
// 	size = "xs",
//   variant = "default",
// 	...props
// }) => {
// 	const href = type && url && fetchUrl(type, reference, url);

// 	if (!href) return null;

// 	const newTabProps = newTab
// 		? { target: "_blank", rel: "noopener noreferrer" }
// 		: {};

// 	if (href || url) {
// 		return (
// 			<Link
// 				{...newTabProps}
// 				href={href || url}
// 				className={buttonVariants({
// 					variant,
// 					size: size as any,
// 					className,
// 				})}
// 			>
// 				{children && children}
// 			</Link>
// 		);
// 	}

// 	// return (
// 	//   <Button
// 	//     className={buttonVariants({
// 	//       variant: appearance,
// 	//       size: size,
// 	//       className,
// 	//     })}
// 	//   >
// 	//     {children}
// 	//   </Button>
// 	// )
// };

export const fetchUrl = (
  type: "custom" | "reference",
  reference?: {
    value: string | number | any;
    relationTo: "pages";
  },
  url?: string,
) => {
  return type === "reference" &&
    typeof reference?.value === "object" &&
    reference.value.slug
    ? `${
        reference?.relationTo !== "pages" ? `/${reference?.relationTo}` : ""
      }/${reference.value.slug}`
    : url;
};

// <Button
//   className={className}
//   newTab={newTab}
//   href={href}
//   appearance={appearance}
//   label={label}
//   invert={invert}
// />

// import Link from "next/link";
// import type React from "react";
// import { forwardRef, Ref } from "react";
// import type { Page, Product } from "@/payload-types";
// import {
//   Button,
//   type ButtonProps,
//   btnVariants,
//   buttonVariants,
// } from "@/shared/components/ui/button";
// import { cn } from "@/shared/lib/utils";

// // import { cn } from '@/utilities/ui'

// type CMSLinkType = {
//   appearance?: "inline" | ButtonProps["variant"];
//   children?: React.ReactNode;
//   className?: string;
//   label?: string | null;
//   newTab?: boolean | null;
//   icon?: any;
//   reference?: {
//     relationTo: "pages" | "products" | "categories";
//     value: Page | Product | string | number; //| Post
//   } | null;
//   size?: ButtonProps["size"] | null;
//   type?: "custom" | "reference" | null;
//   url?: string | null;
// };

// export const CMSLink = forwardRef<HTMLAnchorElement, CMSLinkType>(
//   ({ ...props }, ref) => {
//     const {
//       type,
//       appearance = "inline",
//       children,
//       className,
//       label,
//       newTab,
//       reference,
//       size: sizeFromProps,
//       url,
//     } = props;

//     const href =
//       type === "reference" &&
//       typeof reference?.value === "object" &&
//       reference.value.slug
//         ? `${reference?.relationTo !== "pages" ? `/${reference?.relationTo}` : ""}/${
//             reference.value.slug
//           }`
//         : url;

//     if (!href) return null;

//     const size = appearance === "link" ? "default" : sizeFromProps;

//     const newTabProps = newTab
//       ? { rel: "noopener noreferrer", target: "_blank" }
//       : {};

//     /* Ensure we don't break any styles set by Text */
//     // Убедитесь, что мы не нарушаем никаких стилей, установленных Text
//     if (appearance === "inline") {
//       return (
//         <Link
//           ref={ref}
//           className={btnVariants({
//             variant: appearance && appearance === "inline" ? "link" : "default",
//             size,
//             className: cn("relative", className),
//           })}
//           href={href || url || ""}
//           {...newTabProps}
//         >
//           {label && label}
//           {children && children}
//           {props?.icon && (
//             <props.icon className={"ml-auto size-5 bg-secondary"} />
//           )}
//         </Link>
//       );
//     }

//     return (
//       // <Button asChild className={className} size={size} variant={appearance}>
//       <Link
//         ref={ref}
//         className={btnVariants({
//           variant: appearance,
//           size,
//           className: cn("relative", className),
//         })}
//         href={href || url || ""}
//         {...newTabProps}
//       >
//         {label && (
//           <span className="link-text" style={{ fontSize: "inherit" }}>
//             {label}
//           </span>
//         )}
//         {children && children}
//         {props?.icon && (
//           <div className="link-icon size-8 lg:size-10 xl:size-12 absolute right-2 rounded-full bg-secondary justify-center flex items-center">
//             <props.icon className={"text-primary size-5 xl:size-6"} />
//           </div>
//         )}
//       </Link>
//       // </Button>
//     );
//   },
// );

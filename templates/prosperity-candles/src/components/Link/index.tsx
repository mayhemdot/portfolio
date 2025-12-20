import Link from "next/link";
import type React from "react";
import { type ButtonProps, buttonVariants } from "@/components/ui/button";
import type { Props } from "../Button";

type CMSLinkType = {
	type?: "custom" | "reference" | null;
	url?: string;
	newTab?: boolean;
	reference?: {
		value: string | number | any;
		relationTo: "pages";
	};
	size?: ButtonProps["size"];
	appearance?: Props["appearance"];
	children?: React.ReactNode;
	className?: string;
	invert?: Props["invert"];
};

export const CMSLink: React.FC<CMSLinkType> = ({
	type,
	url,
	newTab,
	reference,
	appearance,
	size,
	children,
	className,
	invert,
	...props
}) => {
	const href = type && url && fetchUrl(type, reference, url);

	if (!href) return null;

	const newTabProps = newTab
		? { target: "_blank", rel: "noopener noreferrer" }
		: {};

	if (href || url) {
		return (
			<Link
				{...newTabProps}
				href={href || url}
				className={buttonVariants({
					variant: appearance,
					size: size,
					className,
				})}
			>
				{children && children}
			</Link>
		);
	}

	// return (
	//   <Button
	//     className={buttonVariants({
	//       variant: appearance,
	//       size: size,
	//       className,
	//     })}
	//   >
	//     {children}
	//   </Button>
	// )
};

export const fetchUrl = (
	type: "custom" | "reference",
	reference?: {
		value: string | number | any;
		relationTo: "pages";
	},
	url?: string
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

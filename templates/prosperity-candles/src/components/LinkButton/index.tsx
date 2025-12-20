import { ReloadIcon } from "@radix-ui/react-icons";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { PropsWithChildren } from "react";
import {
	Button,
	type ButtonProps,
	buttonVariants,
} from "@/components/ui/button";
import { cn } from "@/lib/utils";

type LinkButtonType = {
	href?: string;
	newTab?: boolean;
	ariaLabel?: string;
	icon?: boolean;
};

export function LinkButton(
	props: PropsWithChildren<LinkButtonType & ButtonProps>
) {
	const {
		size,
		href,
		disabled,
		ariaLabel,
		className,
		icon = true,
		children,
		type,
		variant,
		...rest
	} = props;

	if (href)
		return (
			<Link
				aria-label={ariaLabel}
				href={`${href}`}
				className={buttonVariants({
					variant: variant || "link",
					size: size || "lg",
					className: cn(
						"color-blue-100 fsSmall group underline hover:text-sky-700",
						className
					),
				})}
			>
				{children}
				{icon && (
					<ArrowRight className='size-3.5 ml-1 transition-transform group-hover:translate-x-1' />
				)}
			</Link>
		);
	return (
		<Button
			aria-label={ariaLabel}
			aria-disabled={disabled}
			type={type}
			className={buttonVariants({
				variant: variant || "default",
				size: size || "lg",
				className: cn("fsNormal ml-auto basis-1/3", className),
			})}
			disabled={disabled}
			{...rest}
		>
			{children}
			{disabled && icon && <ReloadIcon className='size-4 ml-1 animate-spin' />}
		</Button>
	);
}

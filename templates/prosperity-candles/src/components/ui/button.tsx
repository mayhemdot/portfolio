import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center cursor-pointer justify-center rounded-md text-sm rounded-xl font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				none: "",
				default:
					"bg-primary text-primary-foreground hover:bg-primary/90 border border-primary",
				primary:
					"bg-primary text-primary-foreground hover:bg-primary/90 border border-primary",
				round: "text-primary-foreground !rounded-full",
				destructive:
					"bg-destructive text-destructive-foreground hover:bg-destructive/90",
				outline:
					"border border-input text-primary bg-background hover:bg-transparent/5 hover:text-accent-foreground", //hover:bg-accent
				"destructive-ghost":
					"text-destructive bg-transparent hover:text-destructive/80",
				secondary:
					"bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-secondary",
				ghost: "hover:bg-transparent/5 hover:text-accent-foreground",
				link: "text-primary underline-offset-4 hover:underline",
			},
			size: {
				none: "",
				default: "h-10 px-4 py-2",
				primary: "h-10 px-4 py-2",
				sm: "h-9 rounded-md px-3",
				lg: "h-12 rounded-md !rounded-2xl px-8",
				xl: "h-14 !rounded-2xl px-10",
				icon: "size-10",
				cube: "size-12",
				cubeMini: "size-8",
				rectangleMini: "w-16 h-9 disabled:line-through",
				dynamicBig:
					"w-[clamp(120px,20vw,180px)] h-[clamp(120px,20vw,180px)] text-[clamp(14px,4vw,20px)] [&>*]:max-w-[10ch] [&>*]:text-wrap [&>*]:text-center",
				dynamicMini:
					"w-[clamp(64px,10vw,80px)] h-[clamp(64px,10vw,80px)] text-[clamp(14px,4vw,20px)]",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	}
);
Button.displayName = "Button";

export { Button, buttonVariants };

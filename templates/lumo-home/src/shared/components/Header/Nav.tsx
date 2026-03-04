"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import { Badge } from "@/shared/components/ui/badge";
import { btnVariants } from "@/shared/components/ui/button";
import { ScrollArea, ScrollBar } from "@/shared/components/ui/scroll-area";
import { Text } from "@/shared/components/Text";
import { cn } from "@/shared/lib/utils";

type Props = {
	navigationItems: {
		label: string;
		href: string;
		badge?: string;
		icon: any;
	}[];
	className?: string;
	afterItems?: React.ReactNode;
};

export function Nav({ navigationItems, afterItems, className }: Props) {
	const pathname = usePathname();

	return (
		<ScrollArea className='w-full max-w-full'>
			<nav
				className={cn(
					"fl-px-12/24 fl-py-12/24 flex flex-col items-start gap-2 lg:items-start ",
					className,
				)}
			>
				{/* <ScrollArea className="w-full max-w-full !h-full"> */}
				{navigationItems?.map(item => (
					<Link
						key={item.href}
						href={item.href}
						className={btnVariants({
							variant: "ghost",
							size: "lg",
							className: cn(
								"!fl-px-4/8 hover:bg-secondary hover:text-secondary-foreground relative w-fit grow items-center justify-start text-left lg:w-full",
								{
									"bg-secondary text-secondary-foreground":
										pathname === item.href, // grow-0 lg:grow-1 lg:w-full
								},
							),
						})}
					>
						<span className='bg-secondary mr-1 w-fit rounded-full p-2 lg:mr-3 lg:p-2'>
							<item.icon className='icon-size' />
						</span>
						<Text variant='secondary' comp='p' className={"text-left"}>
							{item.label}
						</Text>
						{item.badge && (
							<Badge variant='secondary' className='size-5'>
								{item.badge}
							</Badge>
						)}
					</Link>
				))}
				{afterItems}
				{/* </ScrollArea> */}
			</nav>
			<ScrollBar orientation='horizontal' />
		</ScrollArea>
	);
}

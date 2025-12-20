import type { LucideProps } from "lucide-react";
import Link from "next/link";
import type { ForwardRefExoticComponent, JSX, RefAttributes } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

export type Icon = ForwardRefExoticComponent<
	Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>;
export type NavItem = {
	href: string;
	icon: (props: LucideProps) => JSX.Element;
	label: string;
};

export const NavItem = (
	props: NavItem & {
		badgeValue: number | undefined;
	}
) => {
	return (
		<Link
			href={props.href}
			className={buttonVariants({
				variant: "ghost",
				size: "icon",
				className: "relative hover:bg-beige-color",
			})}
		>
			<Avatar className='size-8' style={{ borderRadius: "0" }}>
				<props.icon
					className='cursor h-full w-full flex-shrink-0'
					aria-hidden={"true"}
				/>
				<div
					className='sr-only'
					role='alert'
					aria-live='polite'
					aria-atomic='true'
				>
					{props.label}
				</div>
				<AvatarFallback></AvatarFallback>
			</Avatar>
			{props.badgeValue !== undefined && (
				<Badge className='absolute left-[60%] top-[-5%] h-4 p-1 text-xs'>
					{props.badgeValue}
				</Badge>
			)}
		</Link>
	);
};

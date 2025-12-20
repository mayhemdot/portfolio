"use client";
import { DashboardIcon } from "@radix-ui/react-icons";
import { Menu, Package, ShoppingCart, User2, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Icons } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
} from "@/components/ui/sheet";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { User } from "@/modules/users/types";
import classes from "./index.module.scss";

export const LINKS = [
	{
		label: "Dashboard",
		link: "/account/dashboard",
		icon: DashboardIcon,
	},

	{
		label: "Orders",
		link: "/account/orders",
		icon: Package,
	},
	{
		label: "Purchases",
		link: "/account/purchases",
		icon: ShoppingCart,
	},
	{
		label: "User settings",
		link: "/account/settings",
		icon: User2,
	},
];

export type LinkType = (typeof LINKS)[0];

export type LinkIconType = LinkType["icon"];

export function SideBarMenu() {
	return (
		<TooltipProvider>
			{LINKS.map(item => (
				<SideBarLinkItem key={item.label} item={item} />
			))}
		</TooltipProvider>
	);
}

export function SideBarLinkItem({ item }: { item: LinkType }) {
	const pathname = usePathname();
	return (
		<Link
			href={item.link}
			className={cn(classes.accountMenuLink, "hover:bg-dark-beige-color/40", {
				[classes.accountMenuLinkActive]: pathname.includes(item.link),
			})}
		>
			<span className='size-10 bg-dark-beige-color flex items-center justify-center rounded-full'>
				{<item.icon className='size-4' />}
			</span>
			<span>{item.label}</span>
		</Link>
	);
}

export function AccountMenuMobile({ user }: { user?: User }) {
	const [open, setOpen] = React.useState(false);
	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button
					aria-label='Меню аккаунта'
					variant={"primary"}
					size={"icon"}
					aria-haspopup={true}
				>
					{open ? <X className='size-5' /> : <Menu className='size-5' />}
					<span className='sr-only'>Toggle menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent className='min-w-64 bg-gradient-color backdrop-blur-xl!'>
				<div className='border-dark-color my-4 flex items-center justify-start gap-2 border-b py-4'>
					<div className='fsNormal flex flex-col space-y-0.5 leading-none'>
						{user?.name && (
							<p className='font-medium text-black'>{user?.name}</p>
						)}
						{user?.email && (
							<p className='fsSmall truncate text-zinc-700'>{user?.email}</p>
						)}
					</div>
				</div>
				<div className='flex flex-col'>
					{LINKS.map(link => (
						<React.Fragment key={link.label}>
							<SheetClose asChild>
								<Link
									href={link.link}
									className='fsNormal group flex w-full cursor-pointer items-center gap-4 py-1'
								>
									<span
										className='group-hover:bg-dark-beige-color rounded-full p-1 transition-colors'
										aria-hidden={true}
									>
										{<link.icon className='size-6 text-dark-color' />}
									</span>
									<span className='group-hover:text-dark-color/95 transition-colors'>
										{link.label}
									</span>
								</Link>
							</SheetClose>
						</React.Fragment>
					))}

					<SheetClose asChild>
						<button
							type='button'
							className='fsSmall group flex w-full items-center gap-4 py-1'
							onClick={() => console.log("logout")}
						>
							<span
								className='group-hover:bg-dark-beige-color rounded-full p-1'
								aria-hidden={true}
							>
								<Icons.logout className='size-6 text-dark-color' />
							</span>
							<span className='fsNormal group-hover:text-dark-color/95 rounded-full p-1'>
								Выйти
							</span>
						</button>
					</SheetClose>
				</div>
			</SheetContent>
		</Sheet>
	);
}

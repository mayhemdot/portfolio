import Link from "next/link";
import React from "react";
import { Icons } from "@/components/icons/Icons";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import type { User } from "@/modules/users/types";
import type { NavItem } from "../old/header/NavItem";

type Props = {
	user: User;
	LINKS: NavItem[];
	logOut: () => void;
};

function MobileNav({ user, LINKS, logOut }: Props) {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					aria-label='Меню аккаунта'
					variant={"secondary"}
					size={"icon"}
					aria-haspopup={true}
				>
					<Avatar className='relative'>
						{user?.email?.length > 0 ? (
							<div className='relative flex aspect-square h-full w-full items-center justify-center rounded-full uppercase'>
								{/* <img src={user?.image?.src as string} alt="" referrerPolicy="no-referrer" /> */}
								{user?.email[0]}
							</div>
						) : (
							<AvatarFallback className='bg-transparent'>
								<Icons.avatar
									className='cursor size-8 flex-shrink-0'
									aria-hidden={true}
								/>
								<div className='sr-only' role='alert'>
									Профиль
								</div>
							</AvatarFallback>
						)}
					</Avatar>
				</Button>
			</SheetTrigger>
			<SheetContent className='min-w-64 bg-gradient-color !backdrop-blur-xl'>
				<SheetHeader>
					<SheetTitle className='sr-only'>Profile navigation</SheetTitle>
					<div className='border-dark-color border-b py-4'>
						<div className='fsNormal flex flex-col space-y-0.5 leading-none'>
							{user?.name && (
								<p className='font-medium text-black'>{user?.name}</p>
							)}
							{user?.email && (
								<p className='fsSmall truncate text-zinc-700'>{user?.email}</p>
							)}
						</div>
					</div>
				</SheetHeader>
				<div className='my-4 flex flex-col'>
					{LINKS.map(link => (
						<React.Fragment key={link.label}>
							<SheetClose asChild>
								<Link
									href={link.href}
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
							onClick={() => logOut()}
						>
							<span
								className='group-hover:bg-dark-beige-color rounded-full p-1'
								aria-hidden={true}
							>
								<Icons.logout className='size-6 text-dark-color' />
							</span>
							<span className='fsNormal group-hover:text-dark-color/95 rounded-full'>
								Выйти
							</span>
						</button>
					</SheetClose>
				</div>
			</SheetContent>
		</Sheet>
	);
}

export default MobileNav;

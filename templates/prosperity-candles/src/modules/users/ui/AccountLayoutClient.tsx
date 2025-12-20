"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AccountMenuMobile } from "@/app/(pages)/(private)/account/ui/account-menu/AccountMenu";
import { Text } from "@/components/Text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useAuth } from "@/modules/users/queries";

export function AccountLayoutClient() {
	const { user } = useAuth();
	const router = useRouter();
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (user === null) {
			router.push("/");
		}
	}, [user]);
	return (
		<>
			<Text comp='h1' size={"md"} variant={"primary"} className='px-6'>
				Аккаунт
			</Text>
			<div className={cn("fsNormal flex hidden gap-4 lg:flex")}>
				<Avatar>
					<AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
					<AvatarFallback className='bg-beige-color leading-tight'>
						{user?.name?.slice(0, 1) || user?.email.slice(0, 1)}
					</AvatarFallback>
				</Avatar>
				<div className={"space-y-2"}>
					<div className='leading-tight'>{user?.name}</div>
					<div className='fsSmall leading-tight text-gray-500'>
						{user?.email}
					</div>
				</div>
			</div>
			<div className='block lg:hidden'>
				{user ? <AccountMenuMobile user={user} /> : null}
			</div>
		</>
	);
}

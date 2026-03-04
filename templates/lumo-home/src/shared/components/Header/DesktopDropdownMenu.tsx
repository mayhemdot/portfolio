import { Package, Settings, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { LogoutButton } from "@/modules/auth/ui/auth/LogoutButton";
import type { User } from "@/modules/users/model/types";
import { AvatarUser } from "@/shared/components/Avatar";
import { Button } from "@/shared/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { getTranslations } from "next-intl/server";
import { generateNavItems } from "@/modules/common/nav/model/nav-items";
import { Text } from "@/shared/components/Text";

type Props = {
	user?: User | null;
};

export async function DesktopDropdownMenu({ user }: Props) {
	const t = await getTranslations("Global");

	const navItems = generateNavItems(t);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' size='icon' className='relative hidden lg:flex'>
					<AvatarUser user={user} size={40} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56' align='end'>
				<div className='flex flex-col p-2 leading-none'>
					<Text
						comp='p'
						size={"xsm"}
						variant='secondary'
						className='font-medium'
					>
						{user?.firstName || "Аноним"}
					</Text>
					{user?.email && (
						<p className='w-50 text-muted-foreground truncate text-sm'>
							{user?.email}
						</p>
					)}
				</div>

				<DropdownMenuSeparator />

				{navItems?.map(item => (
					<DropdownMenuItem key={item.label}>
						<Link href={item.href} className='flex grow items-center py-1'>
							<item.icon className='icon-size-important shrink-0! mr-2' />{" "}
							{item.label}
						</Link>
					</DropdownMenuItem>
				))}

				<DropdownMenuSeparator />
				<DropdownMenuItem
					asChild
					className='[*]:hover:bg-none! cursor-pointer rounded-full'
				>
					<LogoutButton
						disabled={false}
						variant={"secondary"}
						className='w-full grow'
						size={"lg"}
					/>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

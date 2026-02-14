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
import { ROUTES } from "@/shared/utils/constants";

type Props = {
	user?: User | null;
};

export function DesktopDropdownMenu({ user }: Props) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' size='icon' className='relative hidden lg:flex'>
					<AvatarUser user={user} size={40} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56' align='end'>
				<div className='flex flex-col space-y-1 p-2 leading-none'>
					<p className='font-medium'>{user?.firstName || "Аноним"}</p>
					{user?.email && (
						<p className='w-50 text-muted-foreground truncate text-sm'>
							{user?.email || "email"}
						</p>
					)}
				</div>

				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Link href={ROUTES.PROFILE} className='flex grow items-center py-1'>
						<UserIcon className='size-4 mr-2' /> Аккаунт
					</Link>
				</DropdownMenuItem>

				<DropdownMenuItem>
					<Link href={ROUTES.ORDERS} className='flex grow items-center py-1'>
						<Package className='size-4 mr-2' /> Заказы
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Link
						href={ROUTES.PROFILE_EDIT}
						className='flex grow items-center py-1'
					>
						<Settings className='size-4 mr-2' /> Настройки
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem className='[*]:hover:bg-none! text-red-600'>
					<LogoutButton disabled={false} className='w-full grow' size={"lg"} />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

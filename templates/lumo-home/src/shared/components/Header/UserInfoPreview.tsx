import { User } from "@/modules/users/model/types";
import { AvatarUser } from "@/shared/components/Avatar";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";

export function UserInfoPreview({
	user,
	className,
}: {
	user: User | null | undefined;
	className?: string;
}) {
	return (
		<Link
			className={cn("bg-primary flex items-center gap-2 lg:gap-4", className)}
			href={"/account"}
		>
			{user && (
				<AvatarUser user={user} size={70} className='size-16 xl:size-[70px]' />
			)}
			{user && (
				<div className='flex flex-col space-y-1 leading-none'>
					<p className='text-background fl-text-24/32 font-medium'>
						{user?.first_name || "Аноним"}
					</p>
					{user?.email && (
						<p className='fl-text-16/20 text-muted-foreground w-[200px] truncate'>
							{user?.email || "email"}
						</p>
					)}
				</div>
			)}
		</Link>
	);
}

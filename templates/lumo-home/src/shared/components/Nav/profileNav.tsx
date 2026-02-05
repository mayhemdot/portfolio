"use client";

import {
	CrownIcon,
	Info,
	MessageCircleQuestion,
	Package2,
	UserRound,
} from "lucide-react";
import { useTranslations } from "next-intl";
// import { LogoutButton } from "@/modules/auth/ui/better-auth/LogoutButton";
import { Nav } from "@/shared/components/Header/Nav";
import { Separator } from "@/shared/components/ui/separator";
import { Shell } from "@/shared/components/ui/shell";
import { LogoutButton } from "@/modules/auth/ui/auth/LogoutButton";

export function ProfileNav() {
	const t = useTranslations("AccountPage.nav");
	return (
		<Shell variant='ghost' className='w-full grow overflow-clip'>
			<Nav
				className='p-0! flex flex-row lg:flex-col'
				navigationItems={[
					{
						label: t("statistic"),
						href: "/account",
						icon: CrownIcon,
					},
					{
						label: t("orders"),
						href: "/account/orders",
						icon: Package2,
					},
					{
						label: t("helpSupport"),
						href: "/help",
						icon: MessageCircleQuestion,
					},
					{
						label: t("faq"),
						href: "/faq",
						icon: Info,
					},
					{
						label: t("settings"),
						href: "/account/profile-edit",
						icon: UserRound,
					},
				]}
				afterItems={
					<>
						<Separator
							className='my-2 hidden border lg:block'
							orientation='horizontal'
						/>
						<LogoutButton
							className='w-fit lg:w-full'
							size='lg'
							variant='secondary'
						/>
					</>
				}
			/>
		</Shell>
	);
}

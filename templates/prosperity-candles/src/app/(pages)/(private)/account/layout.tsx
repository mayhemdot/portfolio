import { LogOutIcon } from "lucide-react";
import type { ReactNode } from "react";
import Logo from "@/components/elements/Logo";
import { cn } from "@/lib/utils";
import { AccountLayoutClient } from "@/modules/users/ui/AccountLayoutClient";
import { LogoutButton } from "@/modules/users/ui/LogoutButton";
import classes from "./index.module.scss";
import { AccountMenuMobile, SideBarMenu } from "./ui/account-menu/AccountMenu";

async function AccountLayout({ children }: { children: ReactNode }) {
	// const { user } = await getMeUser({
	// 	nullUserRedirect: `/login?error=${encodeURIComponent(
	// 		"You must be logged in to access your account."
	// 	)}&redirect=${encodeURIComponent("/account")}`,
	// });
	// const {user} = await getMeUser()
	return (
		<section className='container flex min-h-screen w-full flex-col'>
			<div className={"mb-4 mt-8 flex h-16 items-center gap-4 lg:h-20"}>
				<div
					className={cn(
						"bg-beige-color inline-flex h-full items-center justify-start rounded-xl px-3 lg:w-80 lg:px-6"
					)}
				>
					<Logo className={"headerLogoAnimation"} />
				</div>
				<div className='flex grow items-center justify-between'>
					<AccountLayoutClient />
				</div>
			</div>
			<div className='flex grow flex-col items-start justify-start gap-4 md:flex-row'>
				<aside
					className={cn("min-w-80 h-auto grow-0 space-y-4", "hidden lg:block")}
				>
					<div className='bg-beige-color rounded-xl py-6'>
						<SideBarMenu />
					</div>
					<div className='bg-beige-color flex h-20 grow items-center justify-start rounded-xl'>
						<LogoutButton
							className={cn(
								classes.accountMenuLink,
								"hover:bg-dark-beige-color/40 w-full cursor-pointer"
							)}
						>
							<span className='size-10 bg-dark-beige-color flex items-center justify-center rounded-full'>
								<LogOutIcon className='size-4 text-dark-color' />
							</span>
							<span>{"Logout"}</span>
						</LogoutButton>
					</div>
				</aside>
				{children}
			</div>
		</section>
	);
}

export default AccountLayout;

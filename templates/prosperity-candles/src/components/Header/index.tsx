import Link from "next/link";
import Logo from "@/components/elements/Logo";
import { Icons } from "@/components/icons/Icons";
import { cn } from "@/lib/utils";
import s from "./Header.module.scss";
import HeaderLayout from "./HeaderLayout";
import { HeaderNav } from "./Nav";

export async function HeaderCmp() {
	// let header: Header | null = null;

	// try {
	// 	header = await fetchHeader();
	// } catch (error) {}

	const navItems = [];

	return (
		<HeaderLayout>
			<div className={cn("container", s.header__bottom)}>
				<div className={s.header_bottom__wrapper}>
					<div className={cn(s.header_bottom__left, "grow")}>
						<Logo className={"headerLogoAnimation"} />
					</div>
					<nav
						aria-label='Главное меню'
						className={cn(s.nav, "headerNavAnimation")}
					>
						<Link className={"headerLinkAnimation hidden"} href={"/"}>
							<Icons.home className='size-10 text-dark-color' />
						</Link>
						{/* TODO: replace with CMSLink */}
						{/* {navItems.map(({ link }, i) => {
							return <CMSLink key={i} {...link} appearance='none' />;
						})} */}
						<HeaderNav />
					</nav>
				</div>
			</div>
		</HeaderLayout>
	);
}

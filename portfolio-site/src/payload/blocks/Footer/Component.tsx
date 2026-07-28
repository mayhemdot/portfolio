import Link from "next/link";
import React from "react";
import { ThemeSelector } from "@/app/[locale]/_providers/Theme/ThemeSelector";

import type { Footer as FooterType } from "@/payload/payload-types";
import { CMSLink } from "@/shared/components/Link";
import { Logo } from "@/shared/components/Logo/Logo";
import { getCachedGlobal } from "@/utilities/getGlobals";

export async function Footer() {
	const footerData: FooterType = await getCachedGlobal("footer", 1)();

	const navItems = footerData?.navItems || [];

	return (
		<footer className="mt-auto border-t heightWithoutHeader border-border bg-black dark:bg-card text-white">
			<div className="container py-8 gap-8 flex flex-col md:flex-row md:justify-between">
				<Link className="flex items-center" href="/">
					<Logo />
				</Link>

				<div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
					<ThemeSelector />
					<nav className="flex flex-col md:flex-row gap-4">
						{navItems.map(({ link }, i) => {
							return (
								<CMSLink className="text-white" key={String(i)} {...link} />
							);
						})}
					</nav>
				</div>
			</div>
		</footer>
	);
}

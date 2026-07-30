"use client";

"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useHeaderTheme } from "@/app/[locale]/_providers/HeaderTheme";
import type { Header } from "@/payload/payload-types";
import { LogoIcon } from "@/shared/components/Logo/LogoIcon";

if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger);
}

const NAV_ITEMS: { key: keyof IntlMessages["nav"]; href: string; id: string }[] = [
	{ key: "home", href: "#home", id: "home" },
	{ key: "about", href: "#about", id: "about" },
	{ key: "works", href: "#works", id: "works" },
	{ key: "approach", href: "#approach", id: "approach" },
	{ key: "contact", href: "#lets-talk", id: "lets-talk" },
];

function getSectionBounds(id: string) {
	const el = document.getElementById(id);

	if (!el) {
		return {
			start: 0,
			end: 0,
		};
	}

	const scrollTop = window.scrollY || document.documentElement.scrollTop;

	const rect = el.getBoundingClientRect();

	const start = rect.top + scrollTop;

	return {
		start,
		end: start + el.offsetHeight,
	};
}

interface HeaderClientProps {
	data: Header;
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
	const tNav = useTranslations("nav");
	const tButtons = useTranslations("buttons");
	const [theme, setTheme] = useState<string | null>(null);

	const { headerTheme, setHeaderTheme } = useHeaderTheme();
	const pathname = usePathname();

	const headerRef = useRef<HTMLElement | null>(null);
	const progressRefs = useRef<(HTMLDivElement | null)[]>([]);

	const handleNavClick = (
		e: React.MouseEvent<HTMLAnchorElement>,
		id: string,
	) => {
		e.preventDefault();

		const target = document.getElementById(id);

		if (target) {
			target.scrollIntoView({
				behavior: "smooth",
			});
		}
	};

	useGSAP(
		() => {
			if (!headerRef.current) return;

			const updateAllProgress = () => {
				const scrollY = window.scrollY || document.documentElement.scrollTop;

				NAV_ITEMS.forEach((item, index) => {
					const fillEl = progressRefs.current[index];

					if (!fillEl) return;

					const { start, end } = getSectionBounds(item.id);

					if (end <= start) {
						fillEl.style.transform = "scaleX(0)";
						return;
					}

					let progress = 0;

					if (scrollY <= start) {
						progress = 0;
					} else if (scrollY >= end) {
						progress = 1;
					} else {
						progress = (scrollY - start) / (end - start);
					}

					fillEl.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
				});
			};

			const onRefresh = () => {
				requestAnimationFrame(updateAllProgress);
			};

			window.addEventListener("scroll", updateAllProgress, {
				passive: true,
			});

			ScrollTrigger.addEventListener("refresh", onRefresh);

			const resizeObserver = new ResizeObserver(() => {
				updateAllProgress();
			});

			NAV_ITEMS.forEach((item) => {
				const el = document.getElementById(item.id);

				if (el) {
					resizeObserver.observe(el);
				}
			});

			requestAnimationFrame(() => {
				ScrollTrigger.refresh();
				updateAllProgress();
			});

			return () => {
				window.removeEventListener("scroll", updateAllProgress);

				ScrollTrigger.removeEventListener("refresh", onRefresh);

				resizeObserver.disconnect();
			};
		},
		{
			scope: headerRef,
		},
	);

	useEffect(() => {
		setHeaderTheme(null);
	}, [pathname]);

	useEffect(() => {
		if (headerTheme && headerTheme !== theme) {
			setTheme(headerTheme);
		}
	}, [headerTheme, theme]);

	return (
		<header
			ref={headerRef}
			className="fl-px-8/16 fl-pt-8/16 pb-0 h-16 xl:h-20 sticky top-0 w-full z-100"
			{...(theme ? { "data-theme": theme } : {})}
		>
			<div className="flex justify-between items-end gap-8 h-full text-inherit">
				<Link href="/">
					<LogoIcon className="size-10! 2xl:w-16! 2xl:h-16!" />
				</Link>

				<nav className="w-2/3 md:w-1/2 bg-foreground text-background! lg:w-1/3 fl-text-8/16 mt-auto self-end rounded-lg overflow-hidden shadow-lg">
					<div className="z-20 w-full pt-3 px-3 md:px-4 justify-between flex gap-3">
						{NAV_ITEMS.map((item, index) => (
							<a
								key={item.id}
								href={item.href}
								onClick={(e) => handleNavClick(e, item.id)}
								className="relative group flex flex-col grow items-center text-nowrap pb-2 text-inherit cursor-pointer select-none"
							>
								<span className="font-sans font-medium tracking-wider">
									{item.key === "contact" ? tButtons("contact") : tNav(item.key)}
								</span>

								<div className="w-full h-[2px] bg-background/20 mt-1.5 relative overflow-hidden rounded-full">
									<div
										ref={(el) => {
											progressRefs.current[index] = el;
										}}
										className="h-full bg-accent w-full origin-left transition-transform duration-75 ease-out"
										style={{
											transform: "scaleX(0)",
										}}
									/>
								</div>
							</a>
						))}
					</div>
				</nav>
			</div>
		</header>
	);
};

// import { useGSAP } from "@gsap/react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import type React from "react";
// import { useEffect, useRef, useState } from "react";
// import { useHeaderTheme } from "@/app/[locale]/_providers/HeaderTheme";
// import type { Header } from "@/payload/payload-types";
// import { LogoIcon } from "@/shared/components/Logo/LogoIcon";

// if (typeof window !== "undefined") {
// 	gsap.registerPlugin(ScrollTrigger);
// }

// const NAV_ITEMS = [
// 	{ label: "HOME", href: "#home", id: "home" },
// 	{ label: "ABOUT", href: "#about", id: "about" },
// 	{ label: "WORKS", href: "#works", id: "works" },
// 	{ label: "LET'S TALK", href: "#lets-talk", id: "lets-talk" },
// ];

// function getSectionBounds(id: string) {
// 	const el = document.getElementById(id);

// 	if (!el) {
// 		return {
// 			start: 0,
// 			end: 0,
// 		};
// 	}

// 	const scrollTop = window.scrollY || document.documentElement.scrollTop;

// 	const rect = el.getBoundingClientRect();

// 	const start = rect.top + scrollTop;

// 	return {
// 		start,
// 		end: start + el.offsetHeight,
// 	};
// }

// interface HeaderClientProps {
// 	data: Header;
// }

// export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
// 	const [theme, setTheme] = useState<string | null>(null);

// 	const { headerTheme, setHeaderTheme } = useHeaderTheme();
// 	const pathname = usePathname();

// 	const headerRef = useRef<HTMLElement | null>(null);
// 	const progressRefs = useRef<(HTMLDivElement | null)[]>([]);

// 	const handleNavClick = (
// 		e: React.MouseEvent<HTMLAnchorElement>,
// 		id: string,
// 	) => {
// 		e.preventDefault();

// 		const target = document.getElementById(id);

// 		if (target) {
// 			target.scrollIntoView({
// 				behavior: "smooth",
// 			});
// 		}
// 	};

// 	useGSAP(
// 		() => {
// 			if (!headerRef.current) return;

// 			const updateAllProgress = () => {
// 				const scrollY = window.scrollY || document.documentElement.scrollTop;

// 				NAV_ITEMS.forEach((item, index) => {
// 					const fillEl = progressRefs.current[index];

// 					if (!fillEl) return;

// 					const { start, end } = getSectionBounds(item.id);

// 					if (end <= start) {
// 						fillEl.style.transform = "scaleX(0)";
// 						return;
// 					}

// 					let progress = 0;

// 					if (scrollY <= start) {
// 						progress = 0;
// 					} else if (scrollY >= end) {
// 						progress = 1;
// 					} else {
// 						progress = (scrollY - start) / (end - start);
// 					}

// 					fillEl.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
// 				});
// 			};

// 			const onRefresh = () => {
// 				requestAnimationFrame(updateAllProgress);
// 			};

// 			window.addEventListener("scroll", updateAllProgress, {
// 				passive: true,
// 			});

// 			ScrollTrigger.addEventListener("refresh", onRefresh);

// 			const resizeObserver = new ResizeObserver(() => {
// 				updateAllProgress();
// 			});

// 			NAV_ITEMS.forEach((item) => {
// 				const el = document.getElementById(item.id);

// 				if (el) {
// 					resizeObserver.observe(el);
// 				}
// 			});

// 			requestAnimationFrame(() => {
// 				ScrollTrigger.refresh();
// 				updateAllProgress();
// 			});

// 			return () => {
// 				window.removeEventListener("scroll", updateAllProgress);

// 				ScrollTrigger.removeEventListener("refresh", onRefresh);

// 				resizeObserver.disconnect();
// 			};
// 		},
// 		{
// 			scope: headerRef,
// 		},
// 	);

// 	useEffect(() => {
// 		setHeaderTheme(null);
// 	}, [pathname]);

// 	useEffect(() => {
// 		if (headerTheme && headerTheme !== theme) {
// 			setTheme(headerTheme);
// 		}
// 	}, [headerTheme, theme]);

// 	return (
// 		<header
// 			ref={headerRef}
// 			className="fl-px-8/16 fl-pt-8/16 pb-0 h-16 xl:h-20 sticky top-0 w-full z-100"
// 			{...(theme ? { "data-theme": theme } : {})}
// 		>
// 			<div className="flex justify-between items-end gap-8 text-inherit">
// 				<Link href="/">
// 					<LogoIcon className="size-10! 2xl:w-16! 2xl:h-16!" />
// 				</Link>

// 				<nav className="w-2/3 md:w-1/2 bg-foreground text-background! lg:w-1/3 fl-text-8/12 mt-auto self-end rounded-lg overflow-hidden shadow-lg">
// 					<div className="z-20 w-full pt-3 px-3 md:px-4 justify-between flex gap-3">
// 						{NAV_ITEMS.map((item, index) => (
// 							<a
// 								key={item.id}
// 								href={item.href}
// 								onClick={(e) => handleNavClick(e, item.id)}
// 								className="relative group flex flex-col grow items-center text-nowrap pb-2 text-inherit cursor-pointer select-none"
// 							>
// 								<span className="font-sans font-medium tracking-wider">
// 									{item.label}
// 								</span>

// 								<div className="w-full h-[2px] bg-background/20 mt-1.5 relative overflow-hidden rounded-full">
// 									<div
// 										ref={(el) => {
// 											progressRefs.current[index] = el;
// 										}}
// 										className="h-full bg-accent w-full origin-left transition-transform duration-75 ease-out"
// 										style={{
// 											transform: "scaleX(0)",
// 										}}
// 									/>
// 								</div>
// 							</a>
// 						))}
// 					</div>
// 				</nav>
// 			</div>
// 		</header>
// 	);
// };

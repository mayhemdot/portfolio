import { useTranslations } from "next-intl";
import React from "react";
import { Link } from "@/i18n/routing";
import { Button } from "@/shared/components/ui/button";

export const NotFoundHero: React.FC = () => {
	const t = useTranslations("notFound");

	return (
		<section
		
			className="hero-wrapper relative min-h-[calc(100vh-120px)] flex flex-col items-center justify-center df-px df-py overflow-x-clip select-none"
		>
			{/* Ambient background visual 404 text */}
			<div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
				<span className="font-heading fl-text-120/200 font-extrabold tracking-tighter text-foreground/5 dark:text-foreground/10 uppercase scale-125 md:scale-150">
					{t("code")}
				</span>
			</div>

			<div
				
				className="z-10 flex flex-col items-center text-center max-w-2xl df-gap-y-3-8"
			>
				{/* Code Eyebrow Badge */}

					<span className="df-px-xs df-py-xxs bg-accent/10 fl-text-12/16 uppercase tracking-widest font-mono text-accent font-semibold">
						{t("code")}
					</span>
	
				{/* Headline */}

					<h1 className="fl-text-46/90 font-heading leading-tight prose text-foreground tracking-tight m-0">
						{t("title")}
					</h1>


				{/* Supporting Description */}
	
					<p className="fl-text-12/20 font-sans font-normal text-foreground max-w-md m-0">
						{t("description")}
					</p>

				{/* CTA Button */}
					<Button
						asChild
						className="rounded-none grow w-full sm:w-auto df-px df-py-xs font-sans tracking-wide cursor-pointer"
					>
						<Link href="/">{t("backToHome")}</Link>
					</Button>
				
			</div>
		</section>
	);
};

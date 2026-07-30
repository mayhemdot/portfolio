import { useTranslations } from "next-intl";
import { CMSLink } from "@/shared/components/Link";
import { cn } from "@/shared/lib/utils";

export function GetInTouch({ className }: { className?: string }) {
	const t = useTranslations("buttons");

	return (
		<CMSLink
			url="/contact"
			size="lg"
			appearance="default"
			className={cn(
				"px-8 py-3 rounded-none uppercase backdrop-blur-3xl font-sans font-light fl-text-14/18 transition-opacity",
				className,
			)}
		>
			{t("getInTouch")}

			<span className="relative flex size-2 ml-3">
				{/* Пульсирующий внешний ореол */}
				<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75 blur-[1px]" />

				{/* Основная точка со свечением */}
				<span className="relative inline-flex size-2 rounded-full bg-accent shadow-[0_0_6px_#f97316]" />
			</span>
		</CMSLink>
	);
}

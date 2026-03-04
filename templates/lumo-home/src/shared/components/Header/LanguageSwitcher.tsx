"use client";
import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import { useTransition } from "react";
import type { LocaleCode } from "@/i18n/localization";
import { usePathname, useRouter } from "@/i18n/routing";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/shared/components/ui/select";
import { cn } from "@/shared/lib/utils";

export function LanguageSwitcher({ isMobile = false }: { isMobile?: boolean }) {
	const defaultLocale = useLocale() as LocaleCode;
	const router = useRouter();
	const pathname = usePathname();
	const [isPending, startTransition] = useTransition();
	const params = useParams();

	function onSelectChange(nextLocale: LocaleCode) {
		startTransition(() => {
			// const pathname = router.pathname;
			router.replace(
				// @ts-expect-error -- TypeScript will validate that only known `params`
				// are used in combination with a given `pathname`. Since the two will
				// always match for the current route, we can skip runtime checks.
				{ pathname, params },
				{ locale: nextLocale },
			);
		});
	}
	return (
		<Select
			defaultValue={defaultLocale}
			disabled={isPending}
			onValueChange={nextLocale => onSelectChange(nextLocale as LocaleCode)}
		>
			<SelectTrigger
				className={cn("text-center! bg-background! w-full", {
					"justify-center! [&_svg]:hidden! p-0! icon-size-btn-important cursor-pointer":
						!isMobile,
				})}
			>
				<SelectValue className='text-secondary' />
			</SelectTrigger>
			<SelectContent align='center'>
				<SelectGroup>
					<SelectItem value='ru-RU'>{isMobile ? "Russian" : "RU"}</SelectItem>
					<SelectItem value='en-US'>{isMobile ? "English" : "EN"}</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}

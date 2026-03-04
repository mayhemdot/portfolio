import { Text } from "@/shared/components/Text";
import { cn } from "@/shared/lib/utils";
import { formatDate } from "@/shared/utils/formatDate";

export function OrderStatusItem({
	isActive,
	title,
	icon,
	updatedAt,
	locale,
}: {
	isActive: boolean;
	icon: React.ReactNode;
	title: string;
	updatedAt?: string;
	locale?: string;
}) {
	const formattedLocale = locale === "ru-RU" ? "ru-RU" : "en-US";
	return (
		<div className='z-10 flex items-center'>
			<OrderStatusIcon
				variant={isActive ? "accent" : "secondary"}
				className='z-10'
			>
				{icon}
			</OrderStatusIcon>
			<div className='bg-secondary -ml-1 flex flex-col px-3'>
				<Text
					comp='span'
					variant={"secondary"}
					weight={"bold"}
					className={"capitalize"}
				>
					{title}
				</Text>
				{updatedAt && (
					<Text comp='span' variant={"mutedForeground"} size='xxs'>
						{formatDate(updatedAt, formattedLocale)}
					</Text>
				)}
			</div>
		</div>
	);
}

export function OrderStatusIcon({
	className,
	children,
	variant = "default",
}: {
	className?: string;
	children: React.ReactNode;
	variant?: "default" | "secondary" | "accent";
}) {
	return (
		<div
			className={cn(
				"icon-size-btn-important bg-background inline-flex items-center justify-center rounded-full",
				className,
			)}
		>
			<span
				className={cn("bg-primary rounded-full p-1", {
					"bg-yellow-400": variant === "accent",
					"bg-secondary": variant === "secondary",
					"text-background": variant === "default",
				})}
			>
				{children}
			</span>
		</div>
	);
}

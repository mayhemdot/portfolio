import { SettingsIcon, ShoppingBag, UserIcon } from "lucide-react";
import { ROUTES } from "@/shared/utils/constants";

export function generateNavItems(t: any) {
	return [
		{
			icon: UserIcon,
			label: t("Headers.Mobile.AccountLink"),
			href: ROUTES.PROFILE,
			active: true,
		},
		{
			icon: ShoppingBag,
			label: t("Headers.Mobile.OrderLink"),
			href: ROUTES.ORDERS,
			badge: "3",
			active: false,
		},
		{
			icon: SettingsIcon,
			label: t("Headers.Mobile.SettingsLink"),
			href: ROUTES.PROFILE_EDIT,
			badge: "",
		},
		// { icon: Heart, label: 'Избранное', href: '/account/wishlist', badge: '12' },
		// { icon: CreditCard, label: 'Способы оплаты', href: '/account/payment' },
		// { icon: MapPin, label: 'Адреса', href: '/account/addresses' },
		// { icon: Star, label: 'Отзывы', href: '/account/reviews' },
		// { icon: Bell, label: 'Уведомления', href: '/account/notifications' },
		// { icon: Gift, label: 'Бонусы', href: '/account/rewards', badge: '250' },
	];
}

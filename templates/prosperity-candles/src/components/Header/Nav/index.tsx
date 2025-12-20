"use client";

import * as qs from "qs-esm";
import toast from "react-hot-toast";
import { NavItem } from "@/components/Header/Nav/NavItem";
import { Icons } from "@/components/icons/Icons";
import { ACCOUNT_LINKS } from "@/modules/common/data/urls";
import { useAuth } from "@/modules/users/queries";
import type { User } from "@/modules/users/types";
import type { Order } from "@/payload/payload-types";
import CartLink from "./CartLink";
import MobileNav from "./MobileNav";
import { OrdersLink } from "./OrdersLink";

export const HeaderNav = () => {
	const { user, logout } = useAuth();

	const query = qs.stringify(
		{
			where: {
				...(user?.id
					? {
							orderedBy: {
								equals: user.id,
							},
							status: {
								in: ["pending"],
							},
					  }
					: {}),
			},
		},
		{ addQueryPrefix: true }
	);
	// const { data: orders } = useQuery({
	//   queryKey: ['orders-pending', user?.id],
	//   queryFn: () => restApi<{ docs: Order[] }>(`/api/orders${query}`, { method: 'GET' }),
	//   enabled: user?.id !== undefined,
	// })
	const orders = [] as Order[];

	const LINKS = [
		{
			label: "Профиль",
			icon: Icons.avatar,
			href: user?.id ? ACCOUNT_LINKS.PROFILE : "!",
		},
		{
			label: "Заказы",
			icon: Icons.package,
			href: user?.id ? `account/${ACCOUNT_LINKS.ORDERS}` : "!",
		},
	];
	return (
		<>
			{user ? (
				<MobileNav user={user} LINKS={LINKS} logOut={logout} />
			) : (
				<NavItem
					label='Войти'
					icon={Icons.avatar}
					href={"/login"}
					badgeValue={undefined}
				/>
			)}
			<OrdersLink user={user} count={orders?.length || 0} />
			<CartLink />
		</>
	);
};

// fade the nav in on user load to avoid flash of content and layout shift
// Vercel also does this in their own website header, see https://vercel.com

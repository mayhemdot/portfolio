import { NavItem } from "@/components/Header/Nav/NavItem";
import { Icons } from "@/components/icons/Icons";
import { ROOT_DIR } from "@/modules/common/data/constants";
import type { User } from "@/modules/users/types";

export const OrdersLink = ({
	user,
	count,
}: {
	user?: User | null;
	count: number;
}) => {
	return (
		<NavItem
			href={user?.id ? `${ROOT_DIR}/account/orders` : "#"}
			icon={Icons.package}
			label='Заказы'
			badgeValue={count}
		/>
	);
};

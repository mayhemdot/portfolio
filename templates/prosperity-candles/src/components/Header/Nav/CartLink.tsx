import { NavItem } from "@/components/Header/Nav/NavItem";
import { Icons } from "@/components/icons/Icons";
import { useCartStore } from "@/modules/cart/store";
import { BASE_LINKS } from "@/modules/common/data/urls";

function CartLink() {
	const { items } = useCartStore();
	return (
		<NavItem
			href={BASE_LINKS.CART}
			icon={Icons.cart}
			label='Корзина'
			badgeValue={items?.length || 0}
		/>
	);
}

export default CartLink;

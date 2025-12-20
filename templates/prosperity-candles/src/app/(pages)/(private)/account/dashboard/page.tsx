import { notFound } from "next/navigation";
import { ORDERS } from "@/modules/orders/queries";
import { getMeUser } from "@/utilities/getMeUser";

async function DashboardPage() {
	// const { token } = await getMeUser({
	// 	nullUserRedirect: `/login?error=${encodeURIComponent(
	// 		"You must be logged in to view your orders."
	// 	)}&redirect=${encodeURIComponent("/orders")}`,
	// });

	// let orders: Order[] | null = null;

	// try {
	// 	orders = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders`, {
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 			Authorization: `JWT ${token}`,
	// 		},
	// 		cache: "no-store",
	// 	})
	// 		?.then(async res => {
	// 			if (!res.ok) notFound();
	// 			const json = await res.json();
	// 			if ("error" in json && json.error) notFound();
	// 			if ("errors" in json && json.errors) notFound();
	// 			return json;
	// 		})
	// 		?.then(json => json.docs);
	// } catch (error) {
	// 	// when deploying this template on Payload Cloud, this page needs to build before the APIs are live
	// 	// so swallow the error here and simply render the page with fallback data where necessary
	// 	// in production you may want to redirect to a 404  page or at least log the error somewhere
	// 	// console.error(error)
	// }

	const orders = ORDERS;

	return <div className='grow'>Dashboard...</div>;
}

export default DashboardPage;

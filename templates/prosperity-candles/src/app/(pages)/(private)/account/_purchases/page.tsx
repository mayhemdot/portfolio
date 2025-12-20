// import { getMeUser } from "@/app/_utilities/getMeUser";
// import type { ProductVariation } from "@/payload/payload-types";
// import PurchaseTable from "./PurchaseTable";

// async function PurchasesPage(props: { searchParams: { orderBy: string } }) {
// 	const { user } = await getMeUser({
// 		nullUserRedirect: `/login?error=${encodeURIComponent(
// 			"You must be logged in to access your account."
// 		)}&redirect=${encodeURIComponent("/account")}`,
// 	});
// 	const purchasedProductVariations =
// 		(user?.purchases as ProductVariation[]) || ([] as ProductVariation[]);

// 	return (
// 		<PurchaseTable
// 			purchasedProductVariations={purchasedProductVariations}
// 			orderBy={props?.searchParams?.orderBy}
// 		/>
// 	);
// }

// export default PurchasesPage;

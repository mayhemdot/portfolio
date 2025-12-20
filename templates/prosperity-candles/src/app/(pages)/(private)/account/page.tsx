import type { Metadata } from "next";
import { Gutter } from "@/components/Gutter";
import { RenderParams } from "@/components/RenderParams";
import { getMeUser } from "@/utilities/getMeUser";
import { mergeOpenGraph } from "@/utilities/mergeOpenGraph";
import classes from "./index.module.scss";

export default async function AccountPage() {
	// const { user } = await getMeUser({
	// 	nullUserRedirect: `/login?error=${encodeURIComponent(
	// 		"You must be logged in to access your account."
	// 	)}&redirect=${encodeURIComponent("/account")}`,
	// });

	return (
		<div className='container'>
			<Gutter>
				<RenderParams className={classes.params} />
			</Gutter>
			{/* {!user && (
				<LowImpactHero
					type='lowImpact'
					media={null}
					richText={[
						{
							type: "h1",
							children: [
								{
									text: "",
								},
							],
						},
						{
							type: "paragraph",
							children: [
								{
									text: "This is your account dashboard. Here you can update your account information, view your purchased products, and browse your order history. To manage all users, ",
								},
								{
									type: "link",
									url: "/admin/collections/users",
									children: [
										{
											text: "login to the admin dashboard.",
										},
									],
								},
							],
						},
					]}
				/>
			)} */}
		</div>
	);
}
export const metadata: Metadata = {
	title: "Account",
	description: "Create an account or log in to your existing account.",
	openGraph: mergeOpenGraph({
		title: "Account",
		url: "/account",
	}),
};

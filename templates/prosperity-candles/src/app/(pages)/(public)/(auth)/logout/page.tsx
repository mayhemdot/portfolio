import type { Metadata } from "next";
import { Gutter } from "@/components/Gutter";
import { mergeOpenGraph } from "@/utilities/mergeOpenGraph";
import { LogoutPage } from "./page.client";

export default async function Logout() {
	return (
		<Gutter className={"min-h-screen-minus-header mt-32"}>
			<LogoutPage />
		</Gutter>
	);
}

export const metadata: Metadata = {
	title: "Logout",
	description: "You have been logged out.",
	openGraph: mergeOpenGraph({
		title: "Logout",
		url: "/logout",
	}),
};

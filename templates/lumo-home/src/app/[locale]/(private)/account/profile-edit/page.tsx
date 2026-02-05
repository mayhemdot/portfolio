import ProfileEditPageClient from "./page.client";
import React from "react";
import { Metadata } from "next";
import { constructMetadata } from "@/shared/utils/meta";
import { retrieveCustomer } from "@/modules/users/actions/getUser";

export const metadata: Metadata = constructMetadata({
	title: "Личная информация",
	url: "/",
	description: "Личная информация.",
});

export default async function Page() {
	const userProfile = await retrieveCustomer();

	return (
		<>
			{/* <DynamicBreadcrumb
        breadcrumbs={[
          { label: 'Главная', url: '/' },
          { label: 'Аккаунт', url: '/account' },
          { label: 'Личная информация' },
        ]}
      /> */}

			<ProfileEditPageClient userProfile={userProfile!} />
		</>
	);
}

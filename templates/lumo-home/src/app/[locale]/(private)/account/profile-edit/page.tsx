import { constructMetadata } from "@/shared/utils/meta";
import { retrieveCustomer } from "@/modules/users/actions/getUser";
import { getTranslations } from "next-intl/server";
import { ROUTES } from "@/shared/utils/constants";
import { Text } from "@/shared/components/Text";
import ProfileEditPageClient from "./page.client";

export async function generateMetadata() {
	const t = await getTranslations("AccountPage");

	return constructMetadata({
		title: t("breadcrumbs.account"),
		url: ROUTES.PROFILE,
		description: t("breadcrumbs.account"),
	});
}

export default async function Page() {
	const userProfile = await retrieveCustomer();
	const t = await getTranslations("AccountSettingsPage");

	return (
		<section className='grow space-y-4'>
			<Text comp='h1' variant='secondary' size='md' className='font-semibold'>
				{t("title")}
			</Text>
			<ProfileEditPageClient userProfile={userProfile} />
		</section>
	);
}

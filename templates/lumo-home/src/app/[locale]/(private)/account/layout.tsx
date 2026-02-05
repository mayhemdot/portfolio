import { UserInfoPreview } from "@/shared/components/Header/UserInfoPreview";
import { PropsWithChildren } from "react";
import { ProfileNav } from "@/shared/components/Nav/profileNav";
import { DynamicBreadcrumb } from "@/shared/components/Breadcrumbs";
import { Shell } from "@/shared/components/ui/shell";
import { getTranslations } from "next-intl/server";
import { retrieveCustomer } from "@/modules/users/actions/getUser";

export default async function Layout({ children }: PropsWithChildren) {
	// const userProfile = await getCurrentUserAction({ depth: 3 })
	const userProfile = await retrieveCustomer();

	const t = await getTranslations("AccountPage");
	const breadcrumbs = [
		{ label: t("breadcrumbs.home"), url: "/" },
		{ label: t("breadcrumbs.account") },
	];
	return (
		<>
			<DynamicBreadcrumb breadcrumbs={breadcrumbs} />

			<div className='mx-auto'>
				<h1 className='fl-text-32/48 mb-4 block font-medium capitalize'>
					{t("title")}
				</h1>
				<div className='fl-gap-8/32 flex flex-col lg:flex-row'>
					<div className='lg:max-w-64 xl:max-w-80 h-fit w-full shrink grow'>
						<Shell variant='primary' className='grow'>
							<UserInfoPreview user={userProfile} />
							<ProfileNav />
						</Shell>
					</div>

					{children}
				</div>
			</div>
		</>
	);
}

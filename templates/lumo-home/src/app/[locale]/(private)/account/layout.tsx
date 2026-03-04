import { getTranslations } from "next-intl/server";
import type { PropsWithChildren } from "react";
import { retrieveCustomer } from "@/modules/users/actions/getUser";
import { DynamicBreadcrumb } from "@/shared/components/Breadcrumbs";
import { UserInfoPreview } from "@/shared/components/Header/UserInfoPreview";
import { ProfileNav } from "@/shared/components/Nav/profileNav";
import { Text } from "@/shared/components/Text";
import { Shell } from "@/shared/components/ui/shell";

export default async function Layout({ children }: PropsWithChildren) {
	const userProfile = await retrieveCustomer();

	const t = await getTranslations("AccountPage");

	const breadcrumbs = [
		{ label: t("breadcrumbs.home"), url: "/" },
		{ label: t("breadcrumbs.account"), url: "!" },
	];

	return (
		<>
			<DynamicBreadcrumb breadcrumbs={breadcrumbs} padding={false} />
			<div className='mx-auto'>
				<Text
					comp='h1'
					size='md'
					variant='secondary'
					className='mb-4 font-semibold capitalize'
				>
					{t("title")}
				</Text>
				<div className='fl-gap-8/32 flex flex-col lg:flex-row'>
					<div className='lg:max-w-64 xl:max-w-80 h-fit w-full shrink grow'>
						<Shell variant='primary' className='grow'>
							<UserInfoPreview
								user={userProfile}
								className='bg-primary'
								nameTextProps={{ variant: "primary" }}
							/>
							<ProfileNav />
						</Shell>
					</div>

					{children}
				</div>
			</div>
		</>
	);
}

"use client";
import type React from "react";
import { useState } from "react";
import { btnVariants, Button } from "@/shared/components/ui/button";
// import { Media, User } from '@/payload-types'
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import AvatarUpload from "./AvatarUpload";
import { UserUpdateForm } from "@/modules/users/ui/UserUpdateForm";
import { Shell } from "@/shared/components/ui/shell";
import { ChevronsUpDown } from "lucide-react";
import { useTranslations } from "next-intl";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/shared/components/ui/collapsible";
import Link from "next/link";
import { User } from "@/modules/users/model/types";
import { MediaType } from "@/shared/components/Media/types";
import { Text } from "@/shared/components/Text";

type Props = {
	userProfile: User;
};

export default function ProfileEditPageClient({ userProfile }: Props) {
	const [avatarUrl, setAvatarUrl] = useState("");
	const t = useTranslations("AccountSettingsPage");

	return (
		<section className='grow space-y-4'>
			<Text comp='h1' variant='secondary' size='smd'>
				{t("title")}
			</Text>
			<Shell>
				<AvatarAndInfo
					user={userProfile}
					avatarUrl={avatarUrl}
					setAvatarUrl={setAvatarUrl}
				/>
				<Collapsible defaultValue='open'>
					<CollapsibleContent>
						{/* Объединенная секция аватара и информации о пользователе */}
						<UserUpdateForm user={userProfile} avatarUrl={avatarUrl} />
					</CollapsibleContent>
					<CollapsibleTrigger asChild>
						<Button variant='ghost' size='lg' className='w-full grow'>
							{t("collapsible.button")} <ChevronsUpDown />
							<span className='sr-only'>{t("collapsible.srOnly")}</span>
						</Button>
					</CollapsibleTrigger>
				</Collapsible>
			</Shell>
		</section>
	);
}

function AvatarAndInfo({
	user,
	avatarUrl,
	setAvatarUrl,
}: {
	user: User;
	avatarUrl: string;
	setAvatarUrl: React.Dispatch<React.SetStateAction<string>>;
}) {
	const t = useTranslations("AccountSettingsPage.avatarSection");
	return (
		<div className='mb-6 flex w-full flex-col gap-8 border-b border-gray-200 md:items-start'>
			<h3 className='fl-text-24/32 text-nowrap'>{t("title")}</h3>

			<div className='flex flex-col gap-8 md:flex-row'>
				{/* Колонка аватара */}
				<div className='shrink-0'>
					<AvatarUpload
						userId={String(user.id)}
						url={avatarUrl || (user.avatar as MediaType)?.url || ""}
						size={180}
						onUpload={url => {
							setAvatarUrl(url);
						}}
					/>
				</div>

				{/* Колонка информации о пользователе */}
				<div className='md:w-3xl mb-6 grow space-y-4'>
					<div className='flex flex-col gap-4 md:flex-row md:items-start'>
						<div className='hidden space-y-2'>
							<Label htmlFor='userId' className='text-gray-700'>
								ID
							</Label>
							<Input
								id='userId'
								name='userId'
								type='text'
								readOnly={true}
								defaultValue={user.id}
								disabled
							/>
						</div>

						<div className='flex grow justify-between'>
							<div className='flex grow flex-col space-y-2'>
								<div className='fl-text-20/24'>
									<span className='text-muted-foreground'>
										{t("fields.name")}{" "}
									</span>
									{user.firstName}
								</div>
								<div className='fl-text-20/24'>
									<span className='text-muted-foreground'>
										{t("fields.email")}{" "}
									</span>
									{user.email}
								</div>
								<div className='fl-text-20/24'>
									<span className='text-muted-foreground'>
										{t("fields.phone")}{" "}
									</span>
									{user.phone || t("noPhone")}
								</div>
							</div>
							<div>
								<Link
									href={"/forgot-password"}
									className={btnVariants({
										variant: "ghost",
										className: "w-fit!",
									})}
								>
									{t("changePassword")}
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

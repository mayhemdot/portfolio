"use client";

import type React from "react";
import { useState, useTransition } from "react";
import { EmailInput } from "@/shared/blocks/Form/Email";
import { FormProvider } from "@/shared/blocks/Form/providers";
import { Text } from "@/shared/components/Text";
import { Button } from "@/shared/components/ui/button";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { Checkbox } from "@/shared/blocks/Form/Checkbox";
import Link from "next/link";

export type Value = unknown;

export interface Property {
	[key: string]: Value;
}

export interface Data {
	[key: string]: Property | Property[];
}

export type FormBlockType = {
	blockName?: string;
	blockType?: "formBlock";
	enableIntro: boolean;
	form?: any;
	introContent?: string;
	width: number;
};

export const FormBlock: React.FC<
	{
		id?: string;
	} & FormBlockType
> = props => {
	const { enableIntro, introContent } = props;

	const [hasSubmitted, setHasSubmitted] = useState(false);
	const tGlob = useTranslations("Global");
	const t = useTranslations("HomePage.FormSection");
	const [isCanSend, setCanSend] = useState(false);

	const handleSubmit = (e: any) => {
		e.preventDefault();
		toast.error(tGlob("Messages.demo.subscription"));
	};
	const formID = "formId";

	return (
		<section className='xl:min-w-2xl mx-auto flex h-[70vh] w-fit max-w-full flex-col items-center justify-center xl:h-screen'>
			{enableIntro && introContent && !hasSubmitted && (
				<Text
					variant={"secondary"}
					font='sans'
					comp={"p"}
					size={"xs"}
					className='fl-text-36/80 mb-6 text-center font-semibold leading-tight md:mb-8 lg:mb-12'
				>
					{introContent}
				</Text>
			)}
			<div className='w-full max-w-3xl'>
				<FormProvider>
					{!hasSubmitted && (
						<form
							id={formID}
							onSubmit={handleSubmit}
							className='fl-px-16/32 fl-py-16/32 bg-secondary 2xl:rounded-4xl grid grid-cols-1 items-start gap-3 rounded-2xl md:rounded-3xl lg:grid-cols-3 xl:gap-4'
						>
							<div className='col-span-2 w-full grow space-y-4 last:mb-0'>
								<EmailInput
									label={""}
									name={"email"}
									placeholder={t("form.emailPlaceholder")}
									className='base-2/3'
									errors={undefined}
									register={undefined}
								/>
								<Checkbox
									name={"policy"}
									label={
										<div>
											{t("form.policyLabel")}
											{
												<Link
													className='hover:underline'
													href='/terms-and-conditions'
												>
													{t("form.policyAgreement")}
												</Link>
											}
											{t("form.and")}
											{
												<Link
													className='hover:underline'
													href='/privacy-policy'
												>
													{t("form.policyLink")}
												</Link>
											}
										</div>
									}
									classNameWrapper='base-2/3'
									className={"bg-white"}
									errors={undefined}
									getValues={() => {
										throw new Error("Function not implemented.");
									}}
									setValue={checked => setCanSend(!checked)}
								/>
							</div>

							<Button
								aria-label='Заказать обратный звонок'
								form={formID}
								type='submit'
								size={"lg"}
								disabled={isCanSend}
								variant={"default"}
								className={"w-full rounded-3xl uppercase"}
							>
								{t("form.submit")}
							</Button>
						</form>
					)}
				</FormProvider>
			</div>
		</section>
	);
};

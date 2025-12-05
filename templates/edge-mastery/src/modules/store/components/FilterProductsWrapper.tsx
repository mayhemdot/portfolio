"use client";

import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import {
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerHeader,
} from "@heroui/drawer";
import { useDisclosure } from "@heroui/use-disclosure";
import { FilterIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import type { PropsWithChildren } from "react";
import { cn } from "@/shared/utils/cn";

export function FilterProductsDrawerWrapper({ children }: PropsWithChildren) {
	const t = useTranslations();
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	return (
		<>
			<Button
				onPress={onOpen}
				className='fl-text-16/20 xl:hidden'
				variant='faded'
				isIconOnly
				size={"lg"}
			>
				<FilterIcon className='size-4 lg:size-5' />
			</Button>
			<Drawer
				isOpen={isOpen}
				size='sm'
				onOpenChange={onOpenChange}
				backdrop='blur'
				className='greenGradient border-zinc-700 dark'
			>
				<DrawerContent>
					{onClose => (
						<>
							<DrawerHeader className='flex pt-8'>
								{t("filterProductComponent.filterTitle")}
							</DrawerHeader>
							<DrawerBody>{children}</DrawerBody>
						</>
					)}
				</DrawerContent>
			</Drawer>
		</>
	);
}

export function FilterProductCardWrapper({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	const t = useTranslations();
	return (
		<Card className={cn("mx-auto w-full p-4", className)} shadow={"none"}>
			<CardHeader className='fl-text-20/32 font-semibold'>
				{t("filterProductComponent.filterTitle")}
			</CardHeader>
			<CardBody>{children}</CardBody>
		</Card>
	);
}

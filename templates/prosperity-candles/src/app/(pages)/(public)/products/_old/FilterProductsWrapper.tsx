"use client";

import { FilterIcon } from "lucide-react";

import type { PropsWithChildren } from "react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

export function FilterProductsDrawerWrapper({ children }: PropsWithChildren) {
	const [isOpen, onOpen] = React.useState(false);
	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button
					className='fl-text-16/20 xl:hidden'
					variant={"default"}
					size={"lg"}
				>
					<FilterIcon className='size-4 lg:size-5' />
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className='flex pt-8'>{"FilterTitle"}</DrawerHeader>
				{children}
			</DrawerContent>
		</Drawer>
	);
}

export function FilterProductCardWrapper({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	// const t = useTranslations();
	return (
		<Card className={cn("mx-auto w-full p-4", className)}>
			<CardHeader className='fl-text-20/32 font-semibold'>
				{"FilterTitle"}
			</CardHeader>
			<CardContent>{children}</CardContent>
		</Card>
	);
}

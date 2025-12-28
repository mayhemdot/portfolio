"use client";

import type { Column } from "@/app/(pages)/(public)/(info)/delivery";
import YandexMap from "@/components/elements/yandex-map/YandexMap";
import { CMSLink } from "@/components/Link";
import { Text } from "@/components/Text";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import classes from "./index.module.scss";

export default function ContactPage({
	layout,
}: {
	layout: {
		columns: Column[];
	};
}) {
	// console.log(layout[0].columns)
	// const LINKS = [
	//   {
	//     name: 'Составить маршрут',
	//     link: SERVICE_LINKS.YANDEX,
	//   },
	//   { name: 'Схема проезда', link: '#yamap' },
	// ]
	return (
		<div className={cn(classes.gridContent, "content-section")}>
			{layout.columns?.map((col, index: number) => {
				const { title, link, enableLink, size } = col;
				return (
					<Card
						key={title}
						className={cn(
							classes.column,
							"h-fit  min-w-full xl:min-w-[540px]",
							classes[`column--${size}`]
						)}
					>
						<CardHeader>
							<Text comp='h3' font='romile' size={"lg"}>
								{col?.title || "No title"}
							</Text>
						</CardHeader>
						<CardContent className='fsNormal space-y-4'>
							{col?.rows?.map((address, index) => (
								<div key={`${address.title}-${index}`} className='space-y-3'>
									<Text comp='h3' size='md'>
										{address.title}
									</Text>
									<Text comp='p' size='smd'>
										{address.description}
									</Text>
									<Separator />
									<Text comp='p' size='smd'>
										{address.phone}
									</Text>
									<Text comp='p' size='smd'>
										{address.address}
									</Text>
									<Text comp='p' size='smd'>
										{address.email}
									</Text>
								</div>
							))}
							{index === 0 && (
								<div className='aspect-square h-full w-2/3 '>
									{/* <Separator className='b-8' /> */}
									<YandexMap id={"yamap"} />
								</div>
							)}
							{enableLink && <CMSLink className={classes.link} {...link} />}
						</CardContent>
					</Card>
				);
			})}
		</div>
	);
}

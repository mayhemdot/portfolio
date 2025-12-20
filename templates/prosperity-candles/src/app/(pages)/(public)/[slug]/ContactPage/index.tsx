"use client";

import YandexMap from "@/components/elements/yandex-map/YandexMap";
import { CMSLink } from "@/components/Link";
import { Text } from "@/components/Text";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import classes from "./index.module.scss";

export default function ContactPage({
	layout,
}: {
	layout: {
		columns: {
			title: string;
			description: string;
			link: any;
			enableLink: boolean;
			size: string;
		}[];
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
		<div className={classes.gridContent}>
			{layout.columns?.map((col: any, index: number) => {
				const { title, link, enableLink, size } = col;
				return (
					<Card
						key={title}
						className={cn(classes.column, "h-fit", classes[`column--${size}`])}
					>
						<CardHeader>
							<Text comp='h3' className='font-bold'>
								{col?.title || "No title"}
							</Text>
						</CardHeader>
						<CardContent className='fsNormal space-y-4'>
							<Text comp='p'>{col.description}</Text>
							{enableLink && <CMSLink className={classes.link} {...link} />}
							{index === 0 && <YandexMap id={"yamap"} />}
						</CardContent>
					</Card>
				);
			})}
		</div>
	);
}

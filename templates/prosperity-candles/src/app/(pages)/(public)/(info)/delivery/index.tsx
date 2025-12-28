"use client";

import YandexMap from "@/components/elements/yandex-map/YandexMap";
import { CMSLink } from "@/components/Link";
import { Text } from "@/components/Text";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import classes from "./index.module.scss";

export type Column = {
	title: string;
	description: string;
	link: {
		url: "/";
		label: "Доставка";
	};
	rows: {
		title: string;
		description?: string;
		phone?: string;
		email?: string;
		address?: string;
	}[];
	enableLink: boolean;
	size: string;
};

export default function DeliveryPage({
	layout,
}: {
	layout: { columns: Column[] };
}) {
	return (
		<div className={classes.gridContent}>
			{layout?.columns?.map((col, index) => {
				const { title, description, link, enableLink, size } = col;
				return (
					<Card
						key={title}
						className={cn(classes.column, "h-fit", classes[`column--${size}`])}
					>
						<CardHeader>
							<Text comp='h3' variant={"primary"} font='romile' size={"lg"}>
								{col?.title || "No title"}
							</Text>
						</CardHeader>
						<CardContent className='fsNormal space-y-4'>
							<Text comp='p' variant={"primary"}>
								{description || "No text"}
							</Text>
							{enableLink && <CMSLink className={classes.link} {...link} />}

							{index === 0 && <YandexMap id={"yamap"} />}
						</CardContent>
					</Card>
				);
			})}
		</div>
	);
}

"use client";

import YandexMap from "@/components/elements/yandex-map/YandexMap";
import Heading from "@/components/Heading";
import { CMSLink } from "@/components/Link";
import RichText from "@/components/RichText";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import classes from "./index.module.scss";

export default function DeliveryPage({ layout }: { layout: any }) {
	return (
		<div className={classes.gridContent}>
			{layout[0].columns?.map((col: any, index: number) => {
				const { title, richText, link, enableLink, size } = col;
				return (
					<Card
						key={title}
						className={cn(classes.column, "h-fit", classes[`column--${size}`])}
					>
						<CardHeader>
							<Heading
								content={col?.title || "No title"}
								type={"richText"}
								className='font-bold'
							/>
						</CardHeader>
						<CardContent className='fsNormal space-y-4'>
							{<RichText content={richText} />}
							{enableLink && <CMSLink className={classes.link} {...link} />}

							{index === 0 && <YandexMap id={"yamap"} />}
						</CardContent>
					</Card>
				);
			})}
		</div>
	);
}

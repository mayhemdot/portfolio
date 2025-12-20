import type React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Gutter } from "../../../components/Gutter";
import { Text } from "../../../components/Text";
import classes from "./index.module.scss";
// type Props = Extract<Page["layout"][0], { blockType: "content" }>;

export const ContentBlock: React.FC<
	{
		columns: any[];
		isTabs?: boolean;
	} & {
		id?: string;
	}
> = props => {
	const { columns, isTabs } = props;

	if (!columns?.length) return <span>No content [ContentBlock]</span>;

	return (
		<Gutter className={classes.content}>
			{isTabs ? (
				<Tabs defaultValue={"0"} className='w-full'>
					<TabsList className='bg-beige-color border'>
						{columns.map((col, index) => (
							<TabsTrigger
								key={`tab-trigger-${index.toString()}`}
								value={String(index)}
							>
								<Text comp={"p"} variant={"primary"}>
									{col?.title?.toString() || "No title"}
								</Text>
								{/* <RichText content={} /> */}
							</TabsTrigger>
						))}
					</TabsList>

					{columns.map((col, index) => (
						<TabsContent
							key={`tab-content-${index.toString()}`}
							value={String(index)}
							className={cn(classes.column, classes[`column--${col.size}`])}
						>
							{/* <RichText content={col.richText} /> */}
							<Text comp={"p"} variant={"primary"}>
								{col.richText?.toString() || "No title"}
							</Text>
						</TabsContent>
					))}
				</Tabs>
			) : (
				<div className={classes.gridContent}>
					{columns.map((col, index) => {
						const { enableLink, richText, link, size } = col;
						return (
							<div
								key={index.toString()}
								className={[classes.column, classes[`column--${size}`]].join(
									" "
								)}
							>
								{/* <RichText content={richText} /> */}
								<Text comp={"p"} variant={"primary"}>
									{col?.title?.toString() || "No title"}
								</Text>
								{/* TODO: enableLink */}
								{/* {enableLink && <CMSLink className={classes.link} {...link} />} */}
							</div>
						);
					})}
				</div>
			)}
		</Gutter>
	);
};

import Link from "next/link";
import { Text } from "@/components/Text";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PRODUCTS } from "@/modules/products/data";
import { CollectionArchive } from "../../../components/CollectionArchive";
import classes from "./index.module.scss";

type Props = {
	id?: string;
	blockType: "archive";
	introContent?: string;
	relationTo: "products" | "categories";
	slider?: boolean;
	limit?: number;
	moreLink?: {
		label: string;
		url?: string;
		reference?: { value: { slug: string } };
	};
};

export function ArchiveBlock(props: Props) {
	const { introContent, relationTo, slider, limit, moreLink } = props;

	const href =
		moreLink?.url || (moreLink?.reference?.value as { slug: string })?.slug;

	return (
		<section
			id={`${relationTo}-block`}
			className={cn(classes.content, "content-section")}
		>
			{introContent && (
				<Text
					comp='h3'
					size={"md"}
					variant={"primary"}
					className={"mb-4 md:mb-8 lg:mb-12"}
				>
					{introContent}
				</Text>
			)}
			<CollectionArchive
				docs={PRODUCTS}
				relationTo={relationTo}
				limit={limit}
				sort='-publishedOn'
				slider={slider}
			/>

			{href && (
				<Link
					href={href}
					className={buttonVariants({
						variant: "none",
						size: "none",
						className: cn(classes.longButton, "fsNormal", {
							hidden: moreLink?.label === "''",
						}),
					})}
				>
					{moreLink?.label || "View all"}
				</Link>
			)}
		</section>
	);
}

// populatedDocs={populatedDocs}
// populatedDocsTotal={populatedDocsTotal}
// selectedDocs={selectedDocs}
// populateBy={populateBy || "collection"}
// categories={categories}

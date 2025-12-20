import type React from "react";
import { Gutter } from "@/components/Gutter";
import { CMSLink } from "@/components/Link";
import RichText from "@/components/RichText";
import { VerticalPadding } from "@/components/VerticalPadding";
import classes from "./index.module.scss";

export const CallToActionBlock: React.FC<{
	id?: string;
	blockType: "cta";
	invertBackground?: boolean;
	richText: any;
	links: { link: any }[];
}> = ({ links, richText, invertBackground }) => {
	return (
		<Gutter>
			<VerticalPadding
				className={[classes.callToAction, invertBackground && classes.invert]
					.filter(Boolean)
					.join(" ")}
			>
				<div className={classes.wrap}>
					<div className={classes.content}>
						<RichText className={classes.richText} content={richText} />
					</div>
					<div className={classes.linkGroup}>
						{(links || []).map(({ link }, i) => {
							return (
								<CMSLink
									key={i.toString()}
									{...link}
									invert={invertBackground}
								/>
							);
						})}
					</div>
				</div>
			</VerticalPadding>
		</Gutter>
	);
};

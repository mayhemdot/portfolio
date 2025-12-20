// import type React from "react";
// import { Text } from "@/components/Text";
// import { Gutter } from "../../../components/Gutter";
// import { CMSLink } from "../../../components/Link";
// import { Media } from "../../../components/Media";

// import classes from "./index.module.scss";

// export function MediumImpactHero(props: any) {
// 	const { richText, media, links } = props;

// 	return (
// 		<Gutter className={classes.hero}>
// 			<div className={classes.background}>
// 				<Text className={classes.richText} comp={"h3"} variant={"primary"}>
// 					{richText}
// 				</Text>
// 				{Array.isArray(links) && (
// 					<ul className={classes.links}>
// 						{links.map(({ link }, i) => {
// 							return (
// 								<li key={i.toString()}>
// 									<CMSLink className={classes.link} {...link} />
// 								</li>
// 							);
// 						})}
// 					</ul>
// 				)}
// 			</div>
// 			<div className={classes.media}>
// 				{typeof media === "object" && (
// 					<Media className={classes.media} resource={media} />
// 				)}
// 			</div>
// 		</Gutter>
// 	);
// }

import React, { Fragment } from "react";
import { AboutUsBlock } from "@/payload/blocks/AboutUs";
import { ArchiveBlock } from "@/payload/blocks/ArchiveBlock/Component";
import { CallToActionBlock } from "@/payload/blocks/CallToAction/Component";
import { ContentBlock } from "@/payload/blocks/Content/Component";
import { FormBlock } from "@/payload/blocks/Form/Component";
import Marquee from "@/payload/blocks/Marquee";
import { MediaBlock } from "@/payload/blocks/MediaBlock/Component";
import { ProjectsBlock } from "@/payload/blocks/ProjectsBlock";
import type { Page } from "@/payload/payload-types";

const blockComponents = {
	archive: ArchiveBlock,
	content: ContentBlock,
	cta: CallToActionBlock,
	formBlock: FormBlock,
	mediaBlock: MediaBlock,
	marquee: Marquee,
	projects: ProjectsBlock,
	aboutUs: AboutUsBlock,
};

export const RenderBlocks: React.FC<{
	blocks: Page["layout"][0][];
}> = (props) => {
	const { blocks } = props;

	const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

	if (hasBlocks) {
		return (
			<Fragment>
				{blocks.map((block, index) => {
					const { blockType } = block;

					if (blockType && blockType in blockComponents) {
						const Block = blockComponents[blockType];

						if (Block) {
							return (
								<React.Fragment key={String(index)}>
									<Block
										{...(block as unknown as Record<string, unknown>)}
										disableInnerContainer
									/>
								</React.Fragment>
							);
						}
					}
					return null;
				})}
			</Fragment>
		);
	}

	return null;
};

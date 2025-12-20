// import type React from "react";
// import { Fragment } from "react";
// // import type { Page } from "@/payload/payload-types.js";
// import { BackgroundColor } from "../_components/BackgroundColor";
// import {
// 	VerticalPadding,
// 	type VerticalPaddingOptions,
// } from "../_components/VerticalPadding";
// import { toKebabCase } from "../_utilities/toKebabCase";
// import { AdvantagesBlock } from "./AdvantagesBlock";
// import { ArchiveBlock } from "./ArchiveBlock";
// import { BesidesBlock } from "./BesidesBlock";
// import { CallToActionBlock } from "./CallToAction";
// import { ContentBlock } from "./Content";
// import { MediaBlock } from "./MediaBlock";
// import {
// 	RelatedProducts,
// 	type RelatedProductsProps,
// } from "./RelatedProducts/index";
// import { WorkflowBlock } from "./WorkflowBlock";

// const blockComponents = {
// 	cta: CallToActionBlock,
// 	content: ContentBlock,
// 	mediaBlock: MediaBlock,
// 	archive: ArchiveBlock,
// 	relatedProducts: RelatedProducts,
// 	workflow: WorkflowBlock,
// 	advantages: AdvantagesBlock,
// 	besides: BesidesBlock,
// };

// export const Blocks: React.FC<{
// 	blocks: (Page["layout"][0] | RelatedProductsProps)[];
// 	disableTopPadding?: boolean;
// 	disableBottomPadding?: boolean;
// }> = props => {
// 	const { disableTopPadding, disableBottomPadding, blocks } = props;
// 	const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

// 	if (hasBlocks) {
// 		return (
// 			<Fragment>
// 				{blocks.map((block, index) => {
// 					const { blockName, blockType } = block;

// 					if (blockType && blockType in blockComponents) {
// 						const Block = blockComponents[blockType];

// 						// the cta block is containerized, so we don't consider it to be inverted at the block-level
// 						const blockIsInverted =
// 							"invertBackground" in block && blockType !== "cta"
// 								? block.invertBackground
// 								: false;
// 						const prevBlock = blocks[index - 1];

// 						const prevBlockInverted =
// 							prevBlock &&
// 							"invertBackground" in prevBlock &&
// 							prevBlock?.invertBackground;

// 						const isPrevSame =
// 							Boolean(blockIsInverted) === Boolean(prevBlockInverted);

// 						let paddingTop: VerticalPaddingOptions = "large";
// 						let paddingBottom: VerticalPaddingOptions = "large";

// 						if (prevBlock && isPrevSame) {
// 							paddingTop = "none";
// 						}

// 						if (index === blocks.length - 1) {
// 							paddingBottom = "large";
// 						}

// 						if (disableTopPadding && index === 0) {
// 							paddingTop = "none";
// 						}
// 						if (disableBottomPadding) {
// 							paddingBottom = "none";
// 						}

// 						if (Block) {
// 							return (
// 								<BackgroundColor
// 									key={index}
// 									invert={blockIsInverted}
// 									className='w-full'
// 								>
// 									<VerticalPadding top={paddingTop} bottom={paddingBottom}>
// 										<Block id={toKebabCase(blockName)} {...block} />
// 									</VerticalPadding>
// 								</BackgroundColor>
// 							);
// 						}
// 					}
// 					return null;
// 				})}
// 			</Fragment>
// 		);
// 	}

// 	return null;
// };

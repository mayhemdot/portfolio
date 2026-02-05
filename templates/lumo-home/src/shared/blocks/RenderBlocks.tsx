// import type React from "react";
// import { Fragment } from "react";
// import { AccordionBlock } from "@/shared/blocks/Accordion/Component";
// import { ArchiveBlock } from "@/shared/blocks/ArchiveBlock/Component";
// import { CallToActionBlock } from "@/shared/blocks/CallToAction/Component";
// import { FormBlock } from "@/shared/blocks/Form/Component";
// import { MediaBlock } from "@/shared/blocks/MediaBlock/Component";
// import { PromoBlock } from "@/shared/blocks/PromoBlock/Component";
// import { SliderBlock } from "@/shared/blocks/SliderBlock/Component";
// import { BannerBlock } from "./Banner/Component";

// // import { ContentBlock } from "@/shared/blocks/Content/Component";
// // import { FormBlock } from "@/shared/blocks/Form/Component";
// // import AccordionBlock from "./Accordion/Component";

// const blockComponents = {
//   // content: ContentBlock,
//   formBlock: FormBlock,
//   promo: PromoBlock,
//   slider: SliderBlock,
//   archive: ArchiveBlock,
//   accordion: AccordionBlock,
//   banner: BannerBlock,
//   cta: CallToActionBlock,
//   mediaBlock: MediaBlock,
// };

// export const RenderBlocks: React.FC<{
//   blocks: Page["layout"][0][];
// }> = (props) => {
//   const { blocks } = props;

//   const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

//   if (hasBlocks) {
//     return (
//       <Fragment>
//         {blocks.map((block, index) => {
//           const { blockType } = block;

//           if (blockType && blockType in blockComponents) {
//             const Block = blockComponents[blockType];

//             if (Block) {
//               return (
//                 <div
//                   className={
//                     "mx-auto w-full md:mb-8 xl:mb-16 overflow-x-hidden"
//                   }
//                   key={String(index)}
//                 >
//                   <Block {...block} disableInnerContainer />
//                 </div>
//               );
//             }
//           }
//           return null;
//         })}
//       </Fragment>
//     );
//   }

//   return null;
// };

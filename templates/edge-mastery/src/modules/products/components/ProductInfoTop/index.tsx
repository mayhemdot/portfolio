import { Chip } from "@heroui/chip";
import type { LucideProps } from "lucide-react";
import type { StoreProduct } from "../../types";

function ProductInfoTop({ product }: { product: StoreProduct }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {
        product.tags?.map((tag, i) => (
          <Chip key={tag.id} color="warning" size="lg" variant={i === 0 ? "dot" : "faded"}>
            <span className="flex flex-row items-center gap-2">
              {tag.value}
              {/* <SvgIcon className="size-3" /> */} 
            </span>
          </Chip>
        ))
      }
      {/* <Chip color="warning" size="lg" variant="dot">
        <span className="flex flex-row items-center gap-2">
          {"Складной"}
     
        </span>
      </Chip>

      <Chip key={"steel"} color="warning" size="lg" variant="faded">
        <span className="flex flex-row items-center gap-2">{"Elmax"}</span>
      </Chip>


      <Chip key={"steel"} color="warning" size="lg" variant="faded">
        <span className="flex flex-row items-center gap-2">{"61H"}</span>
      </Chip> */}
    </div>
  );
}
{/* 
      <Chip key={"steel"} color="warning" size="lg" variant="faded">
        <span className="flex flex-row items-center gap-2">{"22x16x4"}</span>
      </Chip> */}
// function ProductInfoRow({
//   title1,
//   text1,
//   title2,
//   text2,
//   topDivider = true,
// }: any) {
//   return (
//     <>
//       {topDivider ? (
//         <Divider className="my-4 bg-default/80" />
//       ) : (
//         <div className="my-4" />
//       )}
//       <div className="flex h-5 items-center space-x-4">
//         <div className="flex justify-between flex-1">
//           <span className="text-gray-color fsNormal font-medium">{title1}</span>
//           <span className="fsNormal2 font-thin">{text1}</span>
//         </div>
//         {title2 && text2 ? (
//           <>
//             <Divider orientation="vertical" className="bg-gray-color" />
//             <div className="flex justify-between flex-1">
//               <span className="text-gray-color fsSmall font-medium">
//                 {title2}
//               </span>
//               {/* <span className="fsNormal2 font-thin"> */}
//               <Chip color="warning" size="lg" variant="shadow">
//                 <span className="flex flex-row items-center gap-2">
//                   {text2}
//                   {/* <SvgIcon className="size-5" /> */}
//                 </span>
//               </Chip>
//               {/* </span> */}
//             </div>
//           </>
//         ) : null}
//       </div>
//     </>
//   )
// }

const SvgIcon = (props: LucideProps) => (
  // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
  <svg
    width="24"
    height="24"
    fill="none"
    // ariaHidden="true"
    className="text-gray-color"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10M12 8v5"
    ></path>
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.995 16h.009"></path>
  </svg>
);

export default ProductInfoTop;

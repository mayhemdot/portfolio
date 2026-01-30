"use client";
import type React from "react";
import Aurora from "@/shared/components/Aurora";


export const PromoBlock: React.FC<any> = (props) => {
  const { id, introContent } = props;

  return (
    <div
      id={`promo-block-${id}`}
      className={"flex items-center relative justify-center w-full h-[190vh]"}
    >
      {introContent && (
        <div className="w-[80%] sm:w-[70%] md:w-[40%] xl:w-[33%] aspect-3/4 rounded-[400px] bg-secondary">
          <span className="absolute w-full left-[50%] -translate-y-1/2 top-1/2 -translate-x-[50%] z-10">
            <p className="fl-text-28/80 whitespace-pre-line text-dark font-medium text-center leading-tight">
              {introContent}
            </p>
          </span>
          <div className="w-full max-w-full h-full overflow-clip relative rotate-180 z-0">
            {/* '#b84f0a' #d2a528 */}
            <Aurora speed={1} colorStops={["#f1c13b", "#f78336", "#f1c13b"]} />
          </div>
        </div>
      )}
    </div>
  );
};

import type React from "react";

import type { Page } from "@/payload-types";

import Text from "@/shared/components/Text";

type LowImpactHeroType =
  | {
      children?: React.ReactNode;
      Text?: never;
    }
  | (Omit<Page["hero"], "Text"> & {
      children?: never;
      Text?: Page["hero"]["Text"];
    });

export const LowImpactHero: React.FC<LowImpactHeroType> = ({
  children,
  Text,
}) => {
  return (
    <div className="container mt-4 xl:mt-8 flex justify-center">
      <div className="max-w-[48rem]">
        {children || (Text && <Text data={Text} enableGutter={false} />)}
      </div>
    </div>
  );
};

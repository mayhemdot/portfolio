import type React from "react";

import type { CallToActionBlock as CTABlockProps } from "@/payload-types";
import { CMSLink } from "@/shared/components/Link";
import Text from "@/shared/components/Text";

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, Text }) => {
  return (
    <div className="container">
      <div className="bg-card rounded border-border border p-4 flex flex-col gap-8 md:flex-row md:justify-between md:items-center">
        <div className="max-w-[48rem] flex items-center">
          {Text && <Text className="mb-0" data={Text} enableGutter={false} />}
        </div>
        <div className="flex flex-col gap-8">
          {(links || []).map(({ link }, i) => {
            return <CMSLink key={i} size="lg" {...link} />;
          })}
        </div>
      </div>
    </div>
  );
};

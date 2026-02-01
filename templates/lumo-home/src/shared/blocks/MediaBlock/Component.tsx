import type { StaticImageData } from "next/image";
import type React from "react";
import type { MediaType } from "@/shared/components/Media/types";
import { Text } from "@/shared/components/Text";
import { cn } from "@/shared/lib/utils";
import { Media } from "../../components/Media";

type Props =  {
  media: MediaType;
  introContent?: string;
  breakout?: boolean;
  captionClassName?: string;
  className?: string;
  enableGutter?: boolean;
  imgClassName?: string;
  staticImage?: StaticImageData;
  disableInnerContainer?: boolean;
};

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    introContent,
    staticImage,
    disableInnerContainer,
  } = props;

  const caption = media?.caption?.toString() || introContent;
  //   if (media && typeof media === "object") caption = media.caption;

  return (
    <div
      className={cn(
        "w-full flex fl-py-32/128 justify-center items-center mx-auto h-full xl:min-h-[120dvh] bg-secondary",
        className,
      )}
    >
      {(media || staticImage) && (
        <div className="relative mx-auto grow max-w-[90%] md:max-w-[80%] xl:max-w-[60%]">
         <Text
           comp="h4"
           size="sm"
           variant={"secondary"}
           className="md:pb-8 font-medium! xl:pb-16 whitespace-pre-wrap! pb-4 pt-0 rounded-2xl">
              {introContent}
          </Text>
          <Media
            // videoClassName='border border-border rounded-[0.8rem] h-full !w-full aspect-video'
            imgClassName={cn(
              "border border-border rounded-[0.8rem] h-full !w-full aspect-video object-cover",
              imgClassName,
            )}
            resource={media}
            src={staticImage}
          />
           {caption && (
            <div
              className={cn(
                "mt-6",
                {
                  container: !disableInnerContainer,
                },
                captionClassName,
              )}
            >
              <Text size={"xs"} comp="p">{caption}</Text>
            </div>
          )}
        </div>
      )}
    
    </div>
  );
};

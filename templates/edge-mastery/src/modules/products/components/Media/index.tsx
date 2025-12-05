import type React from "react";
import { Fragment } from "react";
import { Image } from "./Image";
import { Video } from "./Video";

export const Media: React.FC<{
  className: string;
  htmlElement?: string;
  resource: any;
  fill?: boolean;
  imgClassName?: string;
}> = (props) => {
  const { className, htmlElement = "div", resource } = props;

  const isVideo = typeof resource === "object" && resource?.mimeType?.includes("video");
  const Tag = (htmlElement as any) || Fragment;

  return (
    <Tag
      {...(htmlElement !== null
        ? {
            className,
          }
        : {})}
    >
      {isVideo ? <Video {...props} /> : <Image {...props} />}
    </Tag>
  );
};

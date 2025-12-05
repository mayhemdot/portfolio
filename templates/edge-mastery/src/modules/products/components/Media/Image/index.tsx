"use client";

import type { StaticImageData } from "next/image";
import NextImage from "next/image";
import React from "react";

import { cn } from "@/shared/utils/cn";

export const cssVariables = {
  breakpoints: {
    l: 1440,
    m: 1024,
    s: 768,
  },
  colors: {
    base0: "rgb(255, 255, 255)",
    base100: "rgb(235, 235, 235)",
    base500: "rgb(128, 128, 128)",
    base850: "rgb(34, 34, 34)",
    base1000: "rgb(0, 0, 0)",
    error500: "rgb(255, 111, 118)",
  },
};

// import type { Props as MediaProps } from "../types";
type MediaProps = {
  alt: string;
  fill: boolean;
  height: number;
  imgClassName: string;
  onClick: () => void;
  onLoad: () => void;
  // onLoad: onLoadFromProps,
  priority: boolean;
  resource: any;
  size: string;
  src: string;
  width: any;
};
const { breakpoints } = cssVariables;

export const Image: React.FC<any> = (props) => {
  const {
    alt: altFromProps,
    fill,
    height: heightFromProps,
    imgClassName,
    onClick,
    onLoad: onLoadFromProps,
    priority,
    resource,
    size: sizeFromProps,
    src: srcFromProps,
    width: widthFromProps,
  } = props;

  const [isLoading, setIsLoading] = React.useState(true);

  let width: number | undefined | null;
  let height: number | undefined | null;
  let alt = altFromProps;
  let src: StaticImageData | string = srcFromProps || "";

  if (!src && resource && typeof resource === "object") {
    const { alt: altFromResource, filename: fullFilename, height: fullHeight, url, width: fullWidth } = resource;

    width = widthFromProps ?? fullWidth;
    height = heightFromProps ?? fullHeight;
    alt = altFromResource;

    const filename = fullFilename;

    src = `${process.env.NEXT_PUBLIC_SERVER_URL}${url}`;
  }

  // NOTE: this is used by the browser to determine which image to download at different screen sizes
  const sizes = sizeFromProps
    ? sizeFromProps
    : Object.entries(breakpoints)
        .map(([, value]) => `(max-width: ${value}px) ${value}px`)
        .join(", ");

  return (
    <NextImage
      alt={alt || ""}
      className={cn(imgClassName)}
      fill={fill}
      height={!fill ? height || heightFromProps : undefined}
      onClick={onClick}
      onLoad={() => {
        setIsLoading(false);
        if (typeof onLoadFromProps === "function") {
          onLoadFromProps();
        }
      }}
      priority={priority}
      quality={90}
      sizes={sizes}
      src={src}
      width={!fill ? width || widthFromProps : undefined}
    />
  );
};

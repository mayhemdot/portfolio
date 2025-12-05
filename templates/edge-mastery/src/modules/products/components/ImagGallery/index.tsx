"use client";
// import type { HttpTypes } from "@medusajs/types";
import Image from "next/image";
import { useRef } from "react";

function ImageGallery({ images }: { images: any[] }) {
  const imageRefs = useRef<any[]>([]);

  const handleThumbnailClick = (index: number) => {
    imageRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 relative">
      <div className="flex order-2 lg:order-1 flex-row lg:flex-col shrink-0 w-[12%] xl:w-[10%] gap-3 items-start">
        {images.map((image, index) => {
          return (
            <Image
              onClick={() => handleThumbnailClick(index)}
              key={`image-thumbnail-${image.id}`}
              src={image.url}
              height={1000}
              width={1000}
              alt=""
              className="rounded-xl"
              style={{
                backgroundBlendMode: "inherit",
              }}
              sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
            />
          );
        })}
      </div>
      <div className="flex order-1 lg:order-2 overflow-x-auto justify-start flex-row lg:flex-col gap-4 md:gap-6 lg:gap-8 items-start relative">
        {images.map((image, index) => {
          return (
            <div
              className="h-fit w-fit shrink-0 grow"
              key={`image-${image.id}`}
              ref={(el) => {
                imageRefs.current[index] = el!;
              }}
            >
              <Image
                src={image.url}
                height={1000}
                width={1000}
                alt=""
                className="rounded-xl block w-full object-cover max-w-full"
                style={{
                  backgroundBlendMode: "inherit",
                }}
                // sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ImageGallery;

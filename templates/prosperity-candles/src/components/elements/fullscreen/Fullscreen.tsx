"use client";
import { FC, useState } from "react";
import { Expand } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

import f from "./Fullscreen.module.scss";

interface PdfFullscreenProps {
  fileUrl: string;
  alt: string;
}

const PdfFullscreen: FC<PdfFullscreenProps> = ({ fileUrl, alt }) => {
  const [isOpen, seIsOpen] = useState(false);
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) seIsOpen(v);
      }}
    >
      <DialogTrigger asChild onClick={() => seIsOpen(true)} className={cn("relative h-fit", f.roundBlur)}>
        <Button variant="ghost" aria-label="fullscreen" className="shrink-0 p-1">
          <Expand className="h-4 w-4 shrink-0" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-2xl p-10">
        <Image
          src={fileUrl}
          blurDataURL={fileUrl}
          placeholder="blur"
          width={420}
          height={500}
          style={{
            width: "100%",
            height: "auto",
          }}
          alt={alt || "Изображение товара"}
        />
      </DialogContent>
    </Dialog>
  );
};

export default PdfFullscreen;

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import { Badge } from "@/shared/components/ui/badge";
import { btnVariants } from "@/shared/components/ui/button";
import { ScrollArea, ScrollBar } from "@/shared/components/ui/scroll-area";
import { cn } from "@/shared/lib/utils";

type Props = {
  navigationItems: {
    label: string;
    href: string;
    badge?: string;
    icon: any;
  }[];
  className?: string;
  afterItems?: React.ReactNode;
};

export function Nav({ navigationItems, afterItems, className }: Props) {
  const pathname = usePathname();

  return (
    <ScrollArea className="w-full max-w-full">
      {/* overflow-x-scroll lg:overflow-x-auto */}
     
      <nav
        className={cn(
          "flex flex-col items-start lg:items-start gap-2 fl-px-12/24 fl-py-12/24 ",
          className,
        )}
      >
        {/* <ScrollArea className="w-full max-w-full !h-full"> */}
        {navigationItems?.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={btnVariants({
              variant: "ghost",
              size: "lg",
              className: cn(
                "relative grow justify-start items-center w-fit lg:w-full !fl-px-4/8 text-left hover:bg-secondary hover:text-secondary-foreground",
                {
                  "bg-secondary text-secondary-foreground":
                    pathname === item.href, // grow-0 lg:grow-1 lg:w-full
                },
              ),
            })}
          >
            <span className="p-2 lg:p-2 bg-secondary rounded-full mr-1 w-fit lg:mr-3">
              <item.icon className="size-3 lg:size-4" />
            </span>
            <span className="text-left fl-text-20/24">{item.label}</span>
            {item.badge && (
              <Badge variant="secondary" className="size-5">
                {item.badge}
              </Badge>
            )}
          </Link>
        ))}
        {afterItems}
        {/* </ScrollArea> */}
      </nav>
       <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

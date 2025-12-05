"use client";

import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";
import { useParams } from "next/navigation";
import type { FC, PropsWithChildren } from "react";
import { routing } from "@/i18n/routing";
import { cn } from "@/shared/utils/cn";

type BreadcrumbsType = {
  label: string;
  url: string;
  id: string;
};

interface LayoutProps {
  paddings?: boolean;
  breadcrumbs: BreadcrumbsType[];
}

const LayoutWithBreadcrumbs: FC<PropsWithChildren<LayoutProps>> = ({ breadcrumbs, children, paddings = true }) => {
  const { locale = routing.defaultLocale } = useParams();
  return (
    <div
      className={cn("mx-auto max-h-full min-h-dvh pt-4 pb-16 md:pb-32", {
        "padding-x-4-8-16": paddings,
      })}
    >
      <div className="fl-my-16/32 w-full">
        <Breadcrumbs>
          {breadcrumbs?.map(({ label, url, id }) => (
            <BreadcrumbItem key={label} href={locale ? `/${locale}/${url}` : url}>
              {label}
            </BreadcrumbItem>
          ))}
        </Breadcrumbs>
      </div>
      {children}
    </div>
  );
};

export default LayoutWithBreadcrumbs;

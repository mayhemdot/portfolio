"use client";

import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { useEffect } from "react";
import type { StoreRegion } from "@/modules/common/lib/get-region-action";
import { useRegionStore } from "@/modules/common/store/region";
// gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ClientProviders({
  region,
  children,
}: {
  region: StoreRegion | null | undefined;
  children: React.ReactNode;
}) {
  const { setRegion } = useRegionStore();

  useEffect(() => {
    console.log("REGION", region);
    if (region?.id) {
      setRegion(region);
    }
  }, [region, setRegion]);
  return (
    <HeroUIProvider>
      {children}
      <ToastProvider placement="top-center" />
    </HeroUIProvider>
  );
}

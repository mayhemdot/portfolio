"use client";
import { Link } from "next-view-transitions";
import type { PropsWithChildren } from "react";
import { useScrollValue } from "@/modules/common/hooks/use-scroll-value";
import { Logo } from "@/shared/components/Logo";
import { cn } from "@/shared/utils/cn";

// import { useScrollValue } from "@/lib/useScrollValue";
// import Logo from "@/modules/common/components/Logo";

function HeaderAnimateWrapper({ children }: PropsWithChildren) {
  const { scrollValue, isScrollingUp } = useScrollValue();
  return (
    <header
      className={cn(
        "sticky grow top-0 w-full z-50 duration-500 transition-transform backdrop-blur-lg fsNormal padding-x-4-8-16",
        {
          "-translate-y-full": !isScrollingUp && scrollValue > 600,
        },
      )}
    >
      <div className="mx-auto flex justify-between items-center h-16 2xl:h-20">
        <Link href={"/"}>
          <Logo />
        </Link>
        <div className="h-full flex items-center gap-2 md:gap-4">{children}</div>
      </div>
    </header>
  );
}

export default HeaderAnimateWrapper;

//    <header className="w-full backdrop-blur-lg z-100 fixed padding-x-4-8-16">
//       <div className="flex items-center justify-between h-16 3xl:h-20">
//         <Link href={"/"}>
//           <Logo />
//         </Link>
//         <Button variant={"glow"} size="iconXS" className="">
//           <MenuIcon />
//         </Button>
//       </div>
//     </header>

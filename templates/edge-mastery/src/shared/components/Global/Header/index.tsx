import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { Logo } from "../../Logo";
import { Button } from "../../ui/Button";

export function Header() {
  return (
    <header className="w-full backdrop-blur-lg z-100 fixed padding-x-4-8-16">
      <div className="flex items-center justify-between h-16 2xl:h-20">
        <Link href={"/"}>
          <Logo />
        </Link>
        <Button variant={"glow"} size="iconXS" className="">
          <MenuIcon />
        </Button>
      </div>
    </header>
  );
}

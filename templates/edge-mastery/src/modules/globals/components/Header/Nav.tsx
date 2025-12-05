import { useTranslations } from "next-intl";
import { Link } from "next-view-transitions";
import { cn } from "@/shared/utils/cn";

export function Nav({ className }: { className?: string }) {
  const t = useTranslations();
  return (
    <div className={cn("inline-flex flex-col text-left font-mono font-extralight", className)}>
      <Link href={"/"} className="hover:text-accent transition-color duration-200">
        {/* Home */}
        {t("header.menu.drawer.home")}
      </Link>
      <Link href={"/about"} className="hover:text-accent transition-color duration-200">
        {/* About */}
        {t("header.menu.drawer.about")}
      </Link>
      <Link href={"/products"} className="hover:text-accent transition-color duration-200">
        {/* Catalog */}
        {t("header.menu.drawer.catalog")}
      </Link>
      <Link href={"/contacts"} className="hover:text-accent transition-color duration-200">
        {/* Contacts */}
        {t("header.menu.drawer.contacts")}
      </Link>
    </div>
  );
}

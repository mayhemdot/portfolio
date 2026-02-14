"use client";

import {
  LogInIcon,
  Menu,
  SettingsIcon,
  ShoppingBag,
  User as UserIcon,
  X,
} from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { use, useState } from "react";
import { LogoutButton } from "@/modules/auth/ui/auth/LogoutButton";
import type { User } from "@/modules/users/model/types";
import { LanguageSwitcher } from "@/shared/components/Header/LanguageSwitcher";
import { Nav } from "@/shared/components/Header/Nav";
import { UserInfoPreview } from "@/shared/components/Header/UserInfoPreview";
import { Button } from "@/shared/components/ui/button";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";

function generateNavItems(t: any) {
  return [
    {
      icon: UserIcon,
      label: t("Headers.Mobile.AccountLink"),
      href: "/account",
      active: true,
    },
    {
      icon: ShoppingBag,
      label: t("Headers.Mobile.OrderLink"),
      href: "/account/orders",
      badge: "3",
      active: false,
    },
    {
      icon: SettingsIcon,
      label: t("Headers.Mobile.SettingsLink"),
      href: "/account/settings",
      badge: "",
    },
    // { icon: Heart, label: 'Избранное', href: '/account/wishlist', badge: '12' },
    // { icon: CreditCard, label: 'Способы оплаты', href: '/account/payment' },
    // { icon: MapPin, label: 'Адреса', href: '/account/addresses' },
    // { icon: Star, label: 'Отзывы', href: '/account/reviews' },
    // { icon: Bell, label: 'Уведомления', href: '/account/notifications' },
    // { icon: Gift, label: 'Бонусы', href: '/account/rewards', badge: '250' },
  ];
}

export function MobileMenuSheet({ user }: { user: User | null | undefined }) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("Global");

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="size-4" /> : <Menu className="size-4" />}
        </Button>
      </SheetTrigger>

      <SheetContent className="max-h-dvh! flex w-full flex-col sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="fl-text-32/48 mt-4 xl:mt-8">
            {t("Headers.Mobile.Menu")}
          </SheetTitle>
        </SheetHeader>
        <div className="grow">
          <ScrollArea className="min-h-0! max-h-full! grow">
            {user ? (
              <UserInfoPreview user={user} className="p-4 bg-secondary" />
            ) : (
              <Link className="flex items-center gap-6 p-2" href={"/login"}>
                <LogInIcon className="size-4 mr-3" />
                <p className="font-medium">{t("Buttons.LogIn")}</p>
              </Link>
            )}
            <Nav navigationItems={generateNavItems(t)} />
          </ScrollArea>
        </div>
      
        <div className="bg-secondary p-4">
          <LanguageSwitcher isMobile={true} />
        </div>

        <SheetFooter>
          <LogoutButton size={"xl"} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

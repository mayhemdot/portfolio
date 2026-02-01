import { Package, Settings, Star, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { LogoutButton } from "@/modules/auth/ui/auth/LogoutButton";
import type { User } from "@/modules/users/model/types";
import { AvatarUser } from "@/shared/components/Avatar";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { ROUTES } from "@/shared/utils/constants";

type Props = {
  user: User | null | undefined;
};

export function DesktopDropdownMenu({ user }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative hidden lg:flex">
          <AvatarUser user={user} size={40} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <div className="flex flex-col space-y-1 p-2 leading-none">
          <p className="font-medium">{user?.name || "Аноним"}</p>
          {user?.email && (
            <p className="w-50 truncate text-sm text-muted-foreground">
              {user?.email || "email"}
            </p>
          )}
        </div>

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={ROUTES.PROFILE} className="flex items-center grow py-1">
            <UserIcon className="mr-2 size-5" /> Аккаунт
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link href={ROUTES.ORDERS} className="flex items-center grow py-1">
            <Package className="mr-2 size-5" /> Заказы
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href={ROUTES.PROFILE_EDIT}
            className="flex items-center grow py-1"
          >
            <Settings className="mr-2 size-5" /> Настройки
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600 [*]:hover:bg-none!">
          <LogoutButton disabled={false} className="w-full grow" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

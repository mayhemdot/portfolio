import Link from "next/link";
import type { User } from "@/modules/users/model/types";
import { AvatarUser } from "@/shared/components/Avatar";
import { Text, type TextProps } from "@/shared/components/Text";
import { cn } from "@/shared/lib/utils";

export function UserInfoPreview({
  user,
  className,
  nameTextProps,
  emailTextProps,
}: {
  user: User | null | undefined;
  className?: string;
  nameTextProps?: Omit<TextProps, "children">;
  emailTextProps?: Omit<TextProps, "children">;
}) {
  return (
    <Link
      className={cn("flex items-center gap-2 lg:gap-4", className)}
      href={"/account"}
    >
      {user && (
        <AvatarUser user={user} size={70} className="size-16 xl:size-16" />
      )}
      {user && (
        <div className="flex flex-col space-y-1 leading-none">
          <Text
            comp="p"
            size="sm"
            variant="secondary"
            className="font-medium!"
            {...nameTextProps}
          >
            {user?.firstName || "Аноним"}
          </Text>
          {user?.email && (
            <Text comp="p" size="xs" variant="mutedForeground" {...emailTextProps}>
              {user?.email || "email"}
            </Text>
          )}
        </div>
      )}
    </Link>
  );
}

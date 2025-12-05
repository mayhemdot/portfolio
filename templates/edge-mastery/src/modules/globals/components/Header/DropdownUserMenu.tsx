"use client";

import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@heroui/dropdown";
import { AvatarIcon, Button, Link, User } from "@heroui/react";

import { useParams } from "next/navigation";
import { ROUTES } from "@/shared/utils/routes";
// import { signout } from "@/lib/data/customer";
// import { ROUTES } from "@/lib/util/routes";

export const PlusIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      className="flex-0"
      {...props}
    >
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}>
        <path d="M6 12h12" />
        <path d="M12 18V6" />
      </g>
    </svg>
  );
};

export default function DropdownUserMenu({
  user,
}: {
  user: {
    email: string;
    name: string;
  };
}) {
  const { locale } = useParams() as { locale: string };

  const handleLogout = async () => {
    // await signout(countryCode);
  };

  return (
    <Dropdown
      placement="bottom-end"
      offset={16}
      showArrow
      classNames={{
        base: "before:bg-transparent before:backdrop-blur", // change arrow background
        content: "p-0 border-small border-divider text-white backdrop-blur-2xl bg-transparent flex-0",
      }}
      size="lg"
      radius="sm"
    >
      <DropdownTrigger>
        <Button variant="flat" color="default" isIconOnly>
          <AvatarIcon />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Custom item styles"
        className="py-3 min-w-[260px]"
        disabledKeys={["profile"]}
        itemClasses={{
          base: [
            "rounded-md",
            "text-default-700",
            "transition-opacity",
            "data-[hover=true]:text-foreground",
            "data-[hover=true]:bg-default-100",
            "dark:data-[hover=true]:bg-default-50",
            "data-[selectable=true]:focus:bg-default-50",
            "data-[pressed=true]:opacity-70",
            "data-[focus-visible=true]:ring-default-500",
          ],
        }}
      >
        <DropdownSection showDivider aria-label="Profile & Actions" className="px-3">
          <DropdownItem key="profile" isReadOnly className="h-14 gap-2 opacity-100">
            <User
              avatarProps={{
                size: "md",
                src: "https://avatars.githubusercontent.com/u/30373425?v=4",
              }}
              classNames={{
                name: "text-default-600",
                description: "text-default-500 fsSmall",
              }}
              description={user.email}
              name={user.name}
            />
          </DropdownItem>
          <DropdownItem key="dashboard" as={Link} href={ROUTES.dashboard(locale)} className="py-2">
            <span className="fsSmall">Dashboard</span>
          </DropdownItem>
          <DropdownItem key="settings" as={Link} href={ROUTES.settings(locale)} className="py-2">
            <span className="fsSmall">Settings</span>
          </DropdownItem>
        </DropdownSection>

        {/* <DropdownSection showDivider aria-label="Preferences">
          <DropdownItem key="quick_search" shortcut="⌘K">
            Quick search
          </DropdownItem>
          <DropdownItem
            key="theme"
            isReadOnly
            className="cursor-default"
            endContent={
              <select
                className="z-10 outline-none w-16 py-0.5 rounded-md text-tiny group-data-[hover=true]:border-default-500 border-small border-default-300 dark:border-default-200 bg-transparent text-default-500"
                id="theme"
                name="theme"
              >
                <option>System</option>
                <option>Dark</option>
                <option>Light</option>
              </select>
            }
          >
            Theme
          </DropdownItem>
        </DropdownSection> */}

        <DropdownSection aria-label="Help & Feedback" className="px-4 fsNormal">
          {/* <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem> */}
          {/* <DropdownItem
            key="logout"
            as={Button}
            onPress={handleLogout}
            className="py-2"
          >
            <span className="fsSmall">Log Out</span>
          </DropdownItem> */}
          <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
          <DropdownItem key="logout" onPress={handleLogout}>
            Log Out
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}

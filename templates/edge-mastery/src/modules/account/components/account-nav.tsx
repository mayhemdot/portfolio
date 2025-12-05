"use client";

import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { ArrowRightIcon, ChevronDown, MapPin, Package2Icon, UserIcon } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import { LocalizedClientLink } from "@/modules/common/components/LocalizedClientLink";
import { cn } from "@/shared/utils/cn";
import { ROUTES } from "@/shared/utils/routes";

// import { ROUTES } from "@/lib/util/routes";

type AccountNavProps = {
  customer: any | null;
};
const AccountNav = ({ customer }: AccountNavProps) => {
  const route = usePathname();
  const { countryCode } = useParams() as { countryCode: string };

  const handleLogout = async () => {
    // await signout(countryCode);
  };

  return (
    <div>
      <div className="sm:hidden" data-testid="mobile-account-nav">
        {route !== `/${countryCode}/dashboard` ? (
          <LocalizedClientLink
            href={`/${countryCode}/dashboard`}
            className="flex items-center gap-x-2 py-2"
            data-testid="account-main-link"
          >
            <ChevronDown className="transform rotate-90" />
            <span className="fsSmall">Account</span>
          </LocalizedClientLink>
        ) : (
          <>
            <div className="fsSubtitle mb-4 px-8">Hello {customer?.first_name}</div>
            <div className="fsNormal">
              <ul>
                <li>
                  <LocalizedClientLink
                    href={ROUTES.accountProfile()}
                    className="flex items-center justify-between py-4 px-8"
                    data-testid="profile-link"
                  >
                    <div className="flex items-center gap-x-2">
                      <UserIcon size={20} />
                      <span>Profile</span>
                    </div>
                    <ChevronDown className="transform -rotate-90" />
                  </LocalizedClientLink>
                </li>
                <Divider />
                <li>
                  <LocalizedClientLink
                    href={ROUTES.accountAddresses()}
                    className="flex items-center justify-between py-4 px-8"
                    data-testid="addresses-link"
                  >
                    <div className="flex items-center gap-x-2">
                      <MapPin size={20} />
                      <span>Addresses</span>
                    </div>
                    <ChevronDown className="transform -rotate-90" />
                  </LocalizedClientLink>
                </li>
                <Divider />
                <li>
                  <LocalizedClientLink
                    href={ROUTES.accountOrders()}
                    className="flex items-center justify-between py-4 px-8"
                    data-testid="orders-link"
                  >
                    <div className="flex items-center gap-x-2">
                      <Package2Icon size={20} />
                      <span>Orders</span>
                    </div>
                    <ChevronDown className="transform -rotate-90" />
                  </LocalizedClientLink>
                </li>
                <Divider />
                <li>
                  <Button
                    type="button"
                    variant="flat"
                    color="danger"
                    className="flex items-center justify-between py-4 px-8 w-full"
                    onPress={handleLogout}
                    data-testid="logout-button"
                  >
                    <div className="flex items-center gap-x-2">
                      <ArrowRightIcon />
                      <span>Log out</span>
                    </div>
                    <ChevronDown className="transform -rotate-90" />
                  </Button>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
      <div className="hidden sm:block" data-testid="account-nav">
        <div>
          <div className="pb-4">
            <h3 className="fsNormal">Account</h3>
          </div>
          <div className="fsNormal font-normal">
            <ul className="flex mb-0 justify-start items-start flex-col gap-y-4">
              <li>
                <AccountNavLink href={ROUTES.dashboard()} route={route!} data-testid="overview-link">
                  Overview
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink href={ROUTES.accountProfile()} route={route!} data-testid="profile-link">
                  Profile
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink href={ROUTES.accountAddresses()} route={route!} data-testid="addresses-link">
                  Addresses
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink href={ROUTES.accountOrders()} route={route!} data-testid="orders-link">
                  Orders
                </AccountNavLink>
              </li>
              <li>
                <Button
                  type="button"
                  variant="flat"
                  color="danger"
                  className="fsSmall"
                  onPress={handleLogout}
                  data-testid="logout-button"
                >
                  Log out
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

type AccountNavLinkProps = {
  href: string;
  route: string;
  children: React.ReactNode;
  "data-testid"?: string;
};

const AccountNavLink = ({ href, route, children, "data-testid": dataTestId }: AccountNavLinkProps) => {
  const { countryCode }: { countryCode: string } = useParams();

  const active = route.split(countryCode)[1] === href;
  return (
    <LocalizedClientLink
      href={href}
      className={cn("text-ui-fg-subtle hover:text-ui-fg-base", {
        "text-ui-fg-base font-semibold": active,
      })}
      data-testid={dataTestId}
    >
      {children}
    </LocalizedClientLink>
  );
};

export default AccountNav;

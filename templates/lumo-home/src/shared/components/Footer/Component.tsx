import Link from "next/link";
import { Logo } from "@/shared/components/Header/Logo";
import { CMSLink } from "@/shared/components/Link";
import { btnVariants } from "@/shared/components/ui/button";


export async function Footer() {
  const footer = {
    navItems: [
      {
        link: {
          href: "/",
          label: "Home",
        },
      },
      {
        link: {
          href: "/about",
          label: "About",
        },
      },
      {
        link: {
          href: "/contact",
          label: "Contact",
        },
      },
    ],
    logo: {
      url: "/logo.svg",
    },
    socialLinks: [
      {
        link: {
          href: "https://twitter.com/payloadcms",
          label: "Twitter",
        },
      },
      {
        link: {
          href: "https://github.com/payloadcms/payload",
          label: "Github",
        },
      },
    ],
  } //await getCachedGlobal("footer", 1)();
  const navItems = footer?.navItems || [];

  return (
    <footer className="bg-secondary dark:bg-card text-foreground w-full">
      <div className="container mx-auto py-8 px-4 gap-8 flex flex-col md:flex-row md:justify-between">
        <div className="w-full flex flex-col xl:flex-row justify-between gap-4 xl:gap-8">
          {/* <Logo logo={footer.logo} /> */}

          <p className="fl-text-80/140 text-foreground font-medium">LUMO</p>
          <div className="inline-flex py-8 xl:py-16 items-start md:flex-row fl-gap-16/32 md:items-start">
            {/* <ThemeSelector /> */}
            <div className="flex flex-col fl-gap-4/16">
              <h3 className="mb-2 text-center fl-text-20/24">Resources</h3>
              <nav className="flex flex-col fl-gap-4/16">
                {navItems?.map(({ link }, index) => {
                  return (
                    <CMSLink
                      size={"sm"}
                      className={btnVariants({
                        variant: "ghost",
                        className: "w-full px-8! fl-text-20/24",
                      })}
                      key={String(index)}
                      {...link}                    />
                  );
                })}
              </nav>
            </div>

            <div className="flex flex-col fl-gap-4/16">
              <h3 className="mb-2 text-center fl-text-20/24">Follow us</h3>
              <div className="flex flex-col fl-gap-4/16">
                {footer.socialLinks?.map(({ link }, index: number) => {
                  return (
                    <CMSLink
                      size={"sm"}
                      key={String(index)}
                      {...link}
                      className={btnVariants({
                        variant: "ghost",
                        className: "w-full px-8! fl-text-20/24",
                      })}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container border-t-2 mx-auto p-4 justify-between flex items-center">
        <div className="flex items-center fl-gap-4/8">
          <Link
            href={"/terms-and-conditions"}
            className={btnVariants({
              variant: "link",
              className: "fl-text-10/16",
            })}
          >
            Terms & Conditions
          </Link>
          <span>|</span>
          <Link
            href={"/privacy-policy"}
            className={btnVariants({
              variant: "link",
              className: "fl-text-10/16",
            })}
          >
            Privacy Policy
          </Link>
        </div>
        <div className="fl-text-10/16">© 2025 Lumo. All rights reserved.</div>
      </div>
    </footer>
  );
}

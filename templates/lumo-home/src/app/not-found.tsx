import Link from "next/link";
// import { getTranslations } from "next-intl/server";
import GoBackButton from "@/shared/components/GoBackButton";
import { btnVariants } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";

export default async function NotFound() {
  // const t = await getTranslations();

  // biome-ignore lint/a11y/useHtmlLang: <explanation>
    return (<html
          // className={alum.variable}
          suppressHydrationWarning>
        <body className={cn("antialiased")}>
        <div className="min-h-dvh w-full flex items-center justify-center">
          <div className="flex flex-col text-center justify-center gap-2 mb-20 max-w-md w-full">
            <span className="mx-auto relative">
              {/** biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
              <svg
                width="68"
                height="68"
                viewBox="0 0 68 68"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M59.8393 19.777L48.2227 8.16033C46.8627 6.80033 44.1427 5.66699 42.216 5.66699H25.7827C23.856 5.66699 21.136 6.80033 19.776 8.16033L8.15935 19.777C6.79935 21.137 5.66602 23.857 5.66602 25.7837V42.217C5.66602 44.1437 6.79935 46.8637 8.15935 48.2237L19.776 59.8403C21.136 61.2003 23.856 62.3337 25.7827 62.3337H42.216C44.1427 62.3337 46.8627 61.2003 48.2227 59.8403L59.8393 48.2237C61.1993 46.8637 62.3327 44.1437 62.3327 42.217V25.7837C62.3327 23.857 61.1993 21.137 59.8393 19.777ZM45.4177 42.4153C46.2393 43.237 46.2393 44.597 45.4177 45.4187C44.9927 45.8437 44.4543 46.042 43.916 46.042C43.3777 46.042 42.8393 45.8437 42.4143 45.4187L33.9993 37.0037L25.5843 45.4187C25.1593 45.8437 24.621 46.042 24.0827 46.042C23.5443 46.042 23.006 45.8437 22.581 45.4187C21.7593 44.597 21.7593 43.237 22.581 42.4153L30.996 34.0003L22.581 25.5853C21.7593 24.7637 21.7593 23.4037 22.581 22.582C23.4027 21.7603 24.7627 21.7603 25.5843 22.582L33.9993 30.997L42.4143 22.582C43.236 21.7603 44.596 21.7603 45.4177 22.582C46.2393 23.4037 46.2393 24.7637 45.4177 25.5853L37.0027 34.0003L45.4177 42.4153Z"
                  fill="#292D32"
                />
              </svg>
            </span>

            <h1 className="fl-text-24/64 font-bold leading-none mb-4">
              {"Page Not Found"}
              <br /> {"Error 404"}
            </h1>

            <div className="bg-secondary flex justify-between gap-2 xl:gap-4 fl-px-8/32 max-w-md fl-py-16/32 rounded-3xl">
            {/* t("buttons.goBack") */}
              <GoBackButton title={"Go back"} />
              <Link
                href={"/products"}
                className={btnVariants({
                  variant: "default",
                })}
              >
                Continue shopping
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

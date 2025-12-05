import Link from "next/link";

import { Text } from "@/shared/components/Text";
import { btnVariants } from "@/shared/components/ui/Button";

export default function NotFound() {
  return (
    <div className="padding-4-8-16 flex flex-col items-center justify-center relative w-full heightScreenMinusHeader z-0">
      <div className="space-y-16 mb-16">
        <div className="prose max-w-none space-y-4 ">
          <Text comp="h1" size="xl" variant={"gradient"}>
            ERROR 404
          </Text>
          <Text comp="p" size="xs" variant={"secondary"} className="font-extralight">
            This page could not be found.
            <br /> Please check the URL and try again.
          </Text>
        </div>
        <Link href="/" className={btnVariants({ variant: "glow", size: "lg", className: "shrink-0 w-full md:w-auto" })}>
          Go home
        </Link>
      </div>
    </div>
  );
}

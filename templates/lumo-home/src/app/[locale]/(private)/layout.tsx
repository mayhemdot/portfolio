import type { PropsWithChildren } from "react";
import { retrieveCustomer } from "@/modules/users/actions/getUser";
import { Footer } from "@/shared/components/Footer/Component";
import { HeaderBlock } from "@/shared/components/Header/Component";

export default async function RootLayout({ children }: PropsWithChildren) {
  const userProfile = await retrieveCustomer();
  return (
    <>
      <HeaderBlock user={userProfile} searchIsHidden={true} />
      <main className="min-h-dvh fl-px-8/32 container w-full grow">
        {children}
      </main>
      <Footer />
    </>
  );
}

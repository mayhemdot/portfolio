import { ButtonHTMLAttributes, FC } from "react";
// import GoogleImage from '/images/svg/google.svg'
import Image from "next/image";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const GoogleButton = ({ className }: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { callbackUrl } = useParams();
  const link = (callbackUrl as string) ?? "/";
  // #{TODO}
  const signIn = (vk: string, linkObject: string) => {
    console.log(vk, linkObject);
  };
  return (
    <Button aria-label={"Аутентификация через аккаунт гугла"} onClick={() => signIn("google", link)} variant={"ghost"} className={cn("h-12 rounded-2xl border border-dark-color bg-transparent", className)}>
      <Image src={"/images/svg/google.svg"} width={26} height={26} className="shrink-0" alt="google" />
      <span className="pr-2"></span>
      Google
    </Button>
  );
};

export default GoogleButton;

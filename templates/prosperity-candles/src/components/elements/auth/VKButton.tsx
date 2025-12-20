import { ButtonHTMLAttributes } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const VKButton = ({ className }: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { callbackUrl } = useParams();
  const link = callbackUrl ?? "/";
  // #[TODO]
  const signIn = (vk: string, linkObject: string) => {
    console.log(vk, linkObject);
  };
  // const callbackUrl = searchParams.get("callbackUrl") || "/";
  return (
    <Button aria-label={"Аутентификация через аккаунт VK"} onClick={() => signIn("vk", link as string)} variant={"ghost"} className={cn("h-12 rounded-2xl border border-dark-color bg-transparent", className)}>
      <Image src={"/images/svg/vk.svg"} width={26} height={26} alt={""} className="cursor-pointer" />
      <span className="pr-2"></span>
      Вконтакте
    </Button>
  );
};

export default VKButton;

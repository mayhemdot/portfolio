"use client";
import { Loader } from "lucide-react";
import Image from "next/image";
import {useState } from "react";
import { Button } from "@/shared/components/ui/button";


export function GoogleLoginButton() {
  const [isLoading, setIsLoading] = useState(false);
  const handleGoogleAction = async () => {};
  // await signIn.social({
  //   provider: "google",
  // });

  // const [_, handleGoogleSignin, isLoading] = useActionState<any, any>(
  //   handleGoogleAction,
  //   {
  //     data: undefined,
  //     errors: undefined,
  //     success: false,
  //   },
  // );
  // const handleTwitchSignin = () => {
  //   oauth('twitch')
  // }

  return (
    <div className="w-full">
      <div className="w-full flex justify-center mb-2 relative">
        <div className="border-b absolute top-1/2 translate-y-1/2 w-full bg-secondary" />
        <p className="text-md w-fit z-10 text-center bg-secondary">OR</p>
      </div>
      <div className="space-y-4">
        <form action={handleGoogleAction}>
          <Button
            // formAction={handleGoogleSignin}
            // onClick={handleGoogleSignin}
            type="submit"
            variant="outline"
            size={"lg"}
            className="w-full relative"
          >
            <Image
              src="/google2.svg"
              alt="Google"
              width={30}
              height={30}
              className="mr-1"
            />
            Continue with Google{" "}
            {isLoading && <Loader className="ml-2 size-4 animate-spin" />}
          </Button>
        </form>
      </div>
    </div>
  );
}

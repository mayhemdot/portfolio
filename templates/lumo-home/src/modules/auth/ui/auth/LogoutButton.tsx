"use client";
import { LogOut } from "lucide-react";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { Button, type ButtonProps } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";

type Props = {
  className?: string;
  disabled?: boolean;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
};

export function LogoutButton({ className, variant, size, disabled }: Props) {
  const t = useTranslations("Global.Buttons");
  
  const handleSignOut = async () => {
    toast.success("Logout successful!");
    // await appAuthClient.signout({ returnTo: "/login" });
  };

  return (
    <form onSubmit={handleSignOut} className={className}>
      <Button
        type="submit"
        size={size}
        variant={variant}
        className={cn("w-full", className)}
        disabled={disabled}
      >
        <LogOut /> {t("logOut")}
      </Button>
      {/* {state.error && <p className="text-red-600 py-4">{state.error}</p>} */}
    </form>
  );
}

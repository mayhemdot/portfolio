"use client";
import { LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/shared/components/ui/button";
import { appAuthClient } from "@/shared/lib/auth";
import { cn } from "@/shared/lib/utils";

type Props = {
  className?: string;
  disabled?: boolean;
};

export function LogoutButton({ className, disabled }: Props) {
  const handleSignOut = async () => {
    toast.success("Logout successful!");
    // await appAuthClient.signout({ returnTo: "/login" });
  };

  return (
    <form onSubmit={handleSignOut}>
      <Button
        type="submit"
        className={cn("w-full", className)}
        disabled={disabled}
      >
        Logout <LogOut />
      </Button>
      {/* {state.error && <p className="text-red-600 py-4">{state.error}</p>} */}
    </form>
  );
}

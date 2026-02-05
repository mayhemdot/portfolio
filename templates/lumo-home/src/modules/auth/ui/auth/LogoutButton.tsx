"use client";
import { LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { Button, ButtonProps } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";

type Props = {
	className?: string;
	disabled?: boolean;
	variant?: ButtonProps["variant"];
	size?: ButtonProps["size"];
};

export function LogoutButton({ className, variant, size, disabled }: Props) {
	const handleSignOut = async () => {
		toast.success("Logout successful!");
		// await appAuthClient.signout({ returnTo: "/login" });
	};

	return (
		<form onSubmit={handleSignOut} className={className}>
			<Button
				type='submit'
				size={size}
				variant={variant}
				className={cn("w-full", className)}
				disabled={disabled}
			>
				<LogOut /> Logout
			</Button>
			{/* {state.error && <p className="text-red-600 py-4">{state.error}</p>} */}
		</form>
	);
}

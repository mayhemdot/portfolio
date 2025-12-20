"use client";
import type { PropsWithChildren } from "react";
import { useAuth } from "@/modules/users/queries";

export function LogoutButton({
	className,
	children,
}: PropsWithChildren<{ className?: string }>) {
	const { logout } = useAuth();
	return (
		<button type='button' onClick={logout} className={className}>
			{children}
		</button>
	);
}

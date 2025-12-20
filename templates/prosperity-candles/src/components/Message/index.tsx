import type React from "react";
import classes from "./index.module.scss";

export const Message: React.FC<{
	message?: React.ReactNode;
	error?: React.ReactNode;
	success?: React.ReactNode;
	warning?: React.ReactNode;
	className?: string;
}> = ({ message, error, success, warning, className }) => {
	const messageToRender = message || error || success || warning;

	if (messageToRender) {
		return (
			<div
				className={[
					"mx-auto w-fit p-8 leading-tight",
					className,
					error && "bg-destructive text-destructive-foreground",
					success && "bg-success-color text-destructive-foreground",
					warning && "bg-warn-color text-destructive-foreground",
					!error &&
						!success &&
						!warning &&
						"bg-primary text-primary-foreground",
				]
					.filter(Boolean)
					.join(" ")}
			>
				{messageToRender}
			</div>
		);
	}
	return null;
};

import type React from "react";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import classes from "./index.module.scss";

type Props = {
	name: string;
	label?: string;
	placeholder?: string;
	register?: any; // UseFormRegister<FieldValues & any>;
	required?: boolean;
	error?: any;
	type?: "text" | "number" | "password" | "email";
	validate?: (value: string) => boolean | string;
	disabled?: boolean;
	value?: string | number;
	hidden?: boolean;
};

export const TextArea: React.FC<Props> = ({
	name,
	label,
	placeholder,
	required,
	register,
	value,
	error,
	type = "text",
	validate,
	disabled,
	hidden,
}) => {
	return (
		<>
			{label && (
				<Label htmlFor={name} className={"fsSmall text-zinc-500"}>
					{label}
					{required ? <span className={classes.asterisk}>&nbsp;*</span> : ""}
				</Label>
			)}
			<Textarea
				placeholder={placeholder}
				hidden={hidden}
				rows={10}
				defaultValue={value && String(value)}
				className={cn("fsNormal bg-beige-color h-12 rounded-2xl", {
					"focus-visible:ring-red-500": error,
					hidden: (disabled || hidden) ?? false,
				})}
				{...{ type }}
				{...(register
					? register(name, {
							required,
							validate,
							...(type === "email"
								? {
										pattern: {
											value: /\S+@\S+\.\S+/,
											message: "Please enter a valid email",
										},
								  }
								: {}),
					  })
					: {})}
				disabled={disabled}
			/>

			{error && (
				<div className={cn(classes.errorMessage, "fsSmall text-red-500")}>
					{!error?.message && error?.type === "required"
						? "This field is required"
						: error?.message}
				</div>
			)}
		</>
	);
};

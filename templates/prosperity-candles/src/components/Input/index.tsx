import type React from "react";
// import { FieldValues, UseFormRegister, Validate } from 'react-hook-form'

import { Input as InputField } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import classes from "./index.module.scss";

type Props = {
	name: string;
	label?: string;
	placeholder?: string;
	register?: any;
	required?: boolean;
	error?: any;
	type?: "text" | "number" | "password" | "email";
	validate?: (value: string) => boolean | string;
	disabled?: boolean;
	value?: string | number;
	hidden?: boolean;
};

export const Input: React.FC<Props> = ({
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
		<div className='w-full'>
			{label && (
				<Label htmlFor={name} className={"fsSmall text-zinc-500"}>
					{label}
					{required ? <span className={classes.asterisk}>&nbsp;*</span> : ""}
				</Label>
			)}
			<InputField
				placeholder={placeholder}
				hidden={hidden}
				defaultValue={value && String(value)}
				className={cn("fsNormal bg-beige-color h-12 rounded-2xl", {
					"focus-visible:ring-red-500": error,
					hidden: hidden ?? false,
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
		</div>
	);
};

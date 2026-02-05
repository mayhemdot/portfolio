import { cva } from "class-variance-authority";
import type React from "react";
import type { TextField } from "@/shared/blocks/Form/types";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { ErrorText } from "../Error";
import { Width } from "../Width";

export const inpVariants = cva("text-dark h-12", {
	variants: {
		variant: {
			default: "!bg-background dark:bg-background !border-dark",
			secondary: "!bg-secondary dark:!bg-secondary",
		},
		size: {
			default: "h-12 xl:h-14 text-base xl:text-lg" /* 42px */,
			xl: "h-14",
		},
		rounded: {
			default: "rounded-full",
			md: "rounded-md",
			lg: "rounded-lg",
			xl: "rounded-xl",
		},
	},
	defaultVariants: {
		rounded: "default",
		variant: "default",
		size: "default",
	},
});

export const Text: React.FC<
	TextField & {
		label?: string;
		errors: Partial<any>;
		register?: any; // UseFormRegister<FieldValues>;
	}
> = ({
	name,
	defaultValue,
	errors,
	label,
	register,
	required: requiredFromProps,
	width,
}) => {
	return (
		<Width width={width}>
			<Label htmlFor={name}>{label}</Label>
			<Input
				defaultValue={defaultValue}
				id={name}
				type='text'
				className={inpVariants({})}
				{...register(name, { required: requiredFromProps })}
			/>
			{name && requiredFromProps && errors?.[name] && <ErrorText />}
		</Width>
	);
};

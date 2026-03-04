import type React from "react";
import { useState } from "react";
import { Label } from "@/shared/components/ui/label";
import {
	Select as SelectComponent,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/shared/components/ui/select";
import { ErrorText } from "../Error";
import { Width } from "../Width";

export const Select: React.FC<
	React.ComponentProps<"select"> & {
		options: any[];
		label: string;
		width: string | number;
		errors: Partial<any>;
	}
> = ({ name, defaultValue, errors, label, options, required, width }) => {
	// const controlledValue = options.find((t) => t.value === value)
	const [value, setValue] = useState<string | null>(null);

	const onChange = (v: string) => {
		setValue(v);
	};
	return (
		<Width width={width}>
			<Label htmlFor={name}>{label}</Label>

			<SelectComponent
				defaultValue={String(defaultValue || "")}
				onValueChange={(val: string) => onChange(val)}
				value={String(value)}
			>
				<SelectTrigger className='w-full' id={name}>
					<SelectValue placeholder={label} />
				</SelectTrigger>
				<SelectContent>
					{options.map(({ label, value }) => {
						return (
							<SelectItem key={value} value={value}>
								{label}
							</SelectItem>
						);
					})}
				</SelectContent>
			</SelectComponent>
			{name && required && errors[name] && <ErrorText />}
		</Width>
	);
};

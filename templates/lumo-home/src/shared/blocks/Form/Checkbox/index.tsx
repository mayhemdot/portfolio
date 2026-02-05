import type React from "react";
import type { CheckboxField } from "@/shared/blocks/Form/types";
import { Checkbox as CheckboxUi } from "@/shared/components/ui/checkbox";
import { Label } from "@/shared/components/ui/label";
import { ErrorText } from "../Error";
import { Width } from "../Width";

export const Checkbox: React.FC<
	CheckboxField & {
		errors?: Partial<any>;
		control?: any;
		form?: any;
		label?: any;
		getValues: () => boolean;
		setValue: (value: boolean) => void;
		className: string;
		classNameWrapper: string;
	}
> = ({
	name,
	defaultValue,
	errors,
	label,
	required: requiredFromProps,
	width,
	setValue,
	classNameWrapper,
	className,
}) => {
	// const props = register(name, { required: requiredFromProps });
	// const { setValue } = useFormContext();

	return (
		<div className={classNameWrapper}>
			<div className='flex items-start gap-2'>
				<CheckboxUi
					className={className}
					defaultChecked={!!defaultValue}
					id={name}
					// name={"nc"}
					// {...props}
					onCheckedChange={checked => {
						setValue(checked === true);
					}}
				/>
				<Label htmlFor={name}>{label}</Label>
			</div>
			{name && requiredFromProps && errors?.[name] && <ErrorText />}
		</div>
	);
};

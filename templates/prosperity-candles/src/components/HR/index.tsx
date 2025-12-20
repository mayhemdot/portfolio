import type React from "react";

export const HR: React.FC<{
	className?: string;
}> = props => {
	const { className } = props;

	return (
		<hr
			className={[className, "h-0.5 border-none bg-dark-beige-color py-4"]
				.filter(Boolean)
				.join(" ")}
		/>
	);
};

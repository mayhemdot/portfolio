import type React from "react";

interface FiveIconProps {
	size?: number;
	className?: string;
	fill?: string;
}

const FiveIcon: React.FC<FiveIconProps> = ({
	size = 64,
	className = "",
	fill = "#FA4E14",
}) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 65 64"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<title>Five</title>
			<path
				d="M43.3333 21.1796H21.6667V0H0V21.6409H21.6667V42.3591H0V64H21.6667V42.8204H43.3333V64H65V42.3591H43.3333V21.6409H65V0H43.3333V21.1796Z"
				fill={fill}
			/>
		</svg>
	);
};

export default FiveIcon;

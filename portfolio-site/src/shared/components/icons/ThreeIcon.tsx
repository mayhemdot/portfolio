import type React from "react";

interface ThreeIconProps {
	size?: number;
	className?: string;
	fill?: string;
}

const ThreeIcon: React.FC<ThreeIconProps> = ({
	size = 64,
	className = "",
	fill = "#FA4E14",
}) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 64 64"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<title>Three</title>
			<path
				d="M42.6667 21.1796H21.3333V0H0V21.6409H21.3333V42.3591H0V64H21.3333V42.8205H42.6667V64H64V42.3591H42.6667V21.1796Z"
				fill={fill}
			/>
		</svg>
	);
};

export default ThreeIcon;

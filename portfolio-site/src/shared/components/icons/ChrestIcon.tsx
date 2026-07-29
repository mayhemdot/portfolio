import type React from "react";

interface ChrestIconProps {
	size?: number;
	className?: string;
	fill?: string;
}

const Chrest: React.FC<ChrestIconProps> = ({
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
			<title>Chrest</title>
			<path
				d="M64 21.1796H42.6666V0H21.3333V21.6409H42.6666V42.3591H21.3333V64H42.6666V42.8204H64V21.1796Z"
				fill={fill}
			/>
			<path
				d="M21.3333 21.1796H0V21.6409V42.3591V42.8204H21.3333V21.1796Z"
				fill={fill}
			/>
		</svg>
	);
};

export default Chrest;

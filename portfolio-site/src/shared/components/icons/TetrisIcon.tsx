import type React from "react";

interface TetrisIconProps {
	size?: number;
	className?: string;
	fill?: string;
}

const TetrisIcon: React.FC<TetrisIconProps> = ({
	size = 64,
	className = "",
	fill = "#FA4E14",
}) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 88 64"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<title>Tetris</title>
			<path
				d="M88 21.1796H65.9999V0H43.9999V21.6409H65.9999V42.3591H43.9999V64H65.9999V42.8204H88V21.1796Z"
				fill={fill}
			/>
			<path
				d="M44 21.1796H22V0H6.82765e-05V21.6409H22V42.3591H6.82765e-05V64H22V42.8204H44V21.1796Z"
				fill={fill}
			/>
		</svg>
	);
};

export default TetrisIcon;

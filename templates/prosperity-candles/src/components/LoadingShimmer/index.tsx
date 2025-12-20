import type React from "react";

import classes from "./index.module.scss";

export const LoadingShimmer: React.FC<{
	number?: number;
	height?: number; // in `base` units
}> = props => {
	const arrayFromNumber = Array.from(Array(props.number || 1).keys());

	return (
		<div className={classes.loading}>
			{arrayFromNumber.map((_, index: number) => (
				<div key={index.toString()} className={classes.shimmer} />
			))}
		</div>
	);
};

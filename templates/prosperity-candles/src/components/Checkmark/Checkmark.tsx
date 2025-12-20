import type { LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";
import classes from "./Checkmark.module.scss";

function Checkmark(props: LucideProps) {
	const { className, ...rest } = props;
	return (
		<div className={classes.successAnimation}>
			<svg
				className={cn(classes.checkmark, className)}
				{...rest}
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 52 52'
			>
				<circle
					className={classes.checkmark__circle}
					cx='26'
					cy='26'
					r='25'
					fill='none'
				/>
				<path
					className={classes.checkmark__check}
					fill='none'
					d='M14.1 27.2l7.1 7.2 16.7-16.8'
				/>
			</svg>
		</div>
	);
}

export default Checkmark;

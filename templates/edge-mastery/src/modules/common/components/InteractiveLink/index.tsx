// import { ArrowUpRightMini } from "@medusajs/icons"
import { cn } from "@/shared/utils/cn";
import { LocalizedClientLink } from "../LocalizedClientLink";

type InteractiveLinkProps = {
	href: string;
	children?: React.ReactNode;
	className?: string;
	onClick?: () => void;
};

const InteractiveLink = ({
	href,
	children,
	onClick,
	className,
	...props
}: InteractiveLinkProps) => {
	return (
		<LocalizedClientLink
			className={cn("group flex items-center gap-x-1", className)}
			href={href}
			onClick={onClick}
			{...props}
		>
			<span className='fsSmall'>{children}</span>
			{/* <ArrowUpRightMini
        className="group-hover:rotate-45 ease-in-out duration-150"
        color="var(--fg-interactive)"
      /> */}
		</LocalizedClientLink>
	);
};

export default InteractiveLink;

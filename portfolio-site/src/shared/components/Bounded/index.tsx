import { cn } from "@/utilities/ui";

type Props = {
	children: React.ReactNode;
	className?: string;
};

export function Bounded({ children, className }: Props) {
	return <div className={cn("fl-px-8/16", className)}>{children}</div>;
}

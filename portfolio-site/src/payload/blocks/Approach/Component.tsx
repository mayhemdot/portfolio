import type React from "react";
import type { ApproachBlock as ApproachBlockType } from "@/payload/payload-types";
import { cn } from "@/utilities/ui";

export type ApproachBlockProps = Partial<ApproachBlockType> & {
	className?: string;
	disableInnerContainer?: boolean;
};

export const ApproachBlock: React.FC<ApproachBlockProps> = (props) => {
	const {
		eyebrow = "METHODOLOGY",
		title = "Engineering High-End Digital Products",
		subtitle = "How architecture, content management, and motion converge into a unified web experience.",
		items = [],
		className,
		disableInnerContainer,
	} = props;

	const displayItems =
		items && items.length > 0
			? items
			: [
					{
						badge: "Full-Cycle Execution",
						title: "Direct Ownership",
						description:
							"Direct engineering from server logic to interactive UI. No middle management, no lost context, and zero friction between design and code. You work directly with the person building your product.",
					},
					{
						badge: "Engineering Standard",
						title: "High-Performance System",
						description:
							"Clean architecture paired with high-end motion. Built for instant loads, effortless content management, and smooth 60 FPS performance across all devices without technical debt.",
					},
					{
						badge: "Delivery Commitment",
						title: "Predictable Output",
						description:
							"Fixed scope, clear milestones, and absolute accountability. The build isn't complete until it's fully tested, optimized, and handed over as a flawless, production-ready system.",
					},
				];

	return (
		<section
			className={cn(
				"relative fl-py-96/120 text-foreground overflow-hidden",
				className,
			)}
		>
			<div
				className={cn(
					"mx-auto container df-px df-text-space-y-balance",
					disableInnerContainer && "px-0",
				)}
			>
				{/* Header Section (Centered)  mb-14 md:mb-20 */}
				<div className="text-center max-w-3xl mx-auto df-text-space-y-balance">
					{eyebrow && (
						<p className="fl-text-12/16 font-semibold tracking-[0.2em] uppercase text-accent">
							{eyebrow}
						</p>
					)}

					{title && <h2 className="fl-text-20/40 font-heading">{title}</h2>}

					{/* Accent Pixel Decorative Graphic */}
					<div
						className="flex items-center justify-center gap-1.5 my-5"
						aria-hidden="true"
					>
						<span className="h-1.5 w-1.5 rounded-[1px] bg-[#F95700]/30" />
						<span className="h-2 w-2 rounded-[1px] bg-[#F95700]/70" />
						<span className="h-2.5 w-2.5 rounded-[1px] bg-[#F95700] shadow-[0_0_10px_rgba(249,87,0,0.5)]" />
						<span className="h-2 w-2 rounded-[1px] bg-[#F95700]/70" />
						<span className="h-1.5 w-1.5 rounded-[1px] bg-[#F95700]/30" />
					</div>

					{subtitle && (
						<p className="max-w-xl mx-auto text-left font-heading fl-text-20/24">
							{subtitle}
						</p>
					)}
				</div>

				{/* 3-Column Grid */}
				{displayItems && displayItems.length > 0 && (
					<div className="grid grid-cols-1 md:grid-cols-3 fl-gap-16/32">
						{displayItems.map((item, index) => (
							<div
								key={item.id || index}
								className="group relative flex flex-col justify-between df-py df-px"
							>
								<div className="df-text-space-y">
									{/* Badge / Pill */}
									{item.badge && (
										<div>
											<span className="inline-flex items-center rounded-full bg-accent px-3.5 py-1 fl-text-10/12 font-semibold text-foreground tracking-wide uppercase">
												{item.badge}
											</span>
										</div>
									)}

									{/* Title */}
									{item.title && (
										<h3 className="fl-text-20/24">{item.title}</h3>
									)}

									{/* Description */}
									{item.description && (
										<p className="fl-text-12/20 font-sans">
											{item.description}
										</p>
									)}
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</section>
	);
};

export default ApproachBlock;

// import type { JSX } from "React";
// import { cn } from "@/lib/utils";
// import RichText from "../RichText";

// function Heading({
// 	type,
// 	content,
// 	position = "left",
// 	className,
// }: {
// 	type: "richText" | "text";
// 	content: any;
// 	h?: JSX.IntrinsicElements;
// 	position?: "left" | "right" | "center";
// 	className?: string;
// }) {
// 	const classPosition = {
// 		left: "text-left",
// 		center: "text-center",
// 		right: "text-right",
// 	}[position];

// 	return (
// 		<div className={cn("w-full", classPosition)}>
// 			{type === "richText" ? (
// 				<RichText
// 					content={content}
// 					className={cn("fsSubtitle [&>*]:text-2xl", className)}
// 				/>
// 			) : (
// 				<h2 className={className}>{content}</h2>
// 			)}
// 		</div>
// 	);
// }

// export default Heading;

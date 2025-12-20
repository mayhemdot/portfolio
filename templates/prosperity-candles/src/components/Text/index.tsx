import { cva, type VariantProps } from "class-variance-authority";

export const textVariants = cva(
	"leading-tight whitespace-pre-line leading-tight",
	{
		variants: {
			font: {
				laguna: "font-lagunac",
				romile: "font-romile",
				ricordi: "font-tt-ricordi",
			},
			size: {
				xl: "fl-text-58/120",
				lxl: "fl-text-32/80",
				// fsTitle:  24, 40;
				lg: "fl-text-24/64",
				// fsSubtitle: 18, 32;
				md: "fl-text-18/32",
				// fsMiddle 16, 20; / h3
				smd: "fl-text-16/20",
				// fsNormal : 14, 16;
				sm: "fl-text-14/16",
				// fsSmall : 12, 14;
				xs: "fl-text-12/14",
				// fsSmallest: 10, 12
				xxs: "fl-text-10/12",
			},
			variant: {
				primary: "text-[#1e1e1e]", //text-[var(--color-foreground)]
				secondary: "text-[#4A4A50]", //"text-[var(--color-background)]"
				beige: "text-[#dfdcd9]",
				darkBeige: "text-[#E3D9D4]",
				gradient:
					"font-thin bg-clip-text text-transparent inline-flex bg-[linear-gradient(126deg,_#8d8c8c_0%,_rgba(255,255,255,0.85)_50.17%,_rgba(141,140,140,0.71)_100%)]",
			},
		},
		defaultVariants: {
			font: "laguna",
			size: "sm",
			variant: "primary",
		},
	}
);

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

interface TextProps
	extends React.HTMLAttributes<HTMLElement>,
		VariantProps<typeof textVariants> {
	comp?: HeadingTag;
	children: React.ReactNode;
}

export function Text({
	comp: Component = "h1",
	font,
	size,
	variant,
	className,
	children,
	...props
}: TextProps) {
	return (
		<Component
			className={textVariants({ size, font, variant, className })}
			{...props}
		>
			{children}
		</Component>
	);
}

// font sans
// .fsAccent {
// 	font-family: "Romile" !important;
// }

// font mono
// .fsDefault {
// 	font-family: "LagunaC";
// }

// .fsTitle {
// 	/* @include adptValue("font-size", 24, 40); */
// 	@include adptValue("font-size", 32, 64);
// 	line-height: 1.3;
// 	font-family: "Romile" !important;
// }

// // $font-size-subtitle-d: 30;
// .fsSubtitle {
// 	@include adptValue("font-size", 18, 32);
// 	line-height: 1.3;
// }

// // $font-size-middle-d: 24;
// .fsMiddle {
// 	@include adptValue("font-size", 16, 20);
// 	/* font-family: "TT Ricordi Light"; */
// }

// // $font-size-normal-d: 20;
// /* .fsNormal {
//   @include adptValue("font-size", 14, 16);
// } */
// .fsNormal {
// 	@include adptValue("font-size", 14, 16);
// 	/* font-family: "TT Ricordi Light"; */
// }

// // $font-size-small: 16px;
// .fsSmall {
// 	@include adptValue("font-size", 12, 14);
// 	/* font-family: "TT Ricordi Light"; */
// }

// // $font-size-smallest: 14px;
// .fsSmallest {
// 	@include adptValue("font-size", 10, 12);
// }

// .digits {
// 	font-family: "TT Ricordi Regular" !important;
// 	/* @include adptValue("font-size", 10, 12); */
// }

// .fsAccent {
// 	font-family: "Romile" !important;
// }

// .fsDefault {
// 	font-family: "LagunaC";
// }

// .gradient {
// 	border-radius: 2rem;
// 	background: linear-gradient(
// 		269deg,
// 		rgba(255, 255, 255, 0.4) 1.08%,
// 		rgba(255, 255, 255, 0) 125.1%
// 	);
// 	backdrop-filter: blur(8px);
// }

// h1 {
// 	font-weight: 600;
// 	@include adptValue("font-size", 18, 32);
// }

// h2 {
// 	@include adptValue("font-size", 18, 32);
// 	line-height: 1.4;
// }

// h3 {
// 	@include adptValue("font-size", 16, 20);
// 	line-height: 1.4;
// }
// p {
// 	@include adptValue("font-size", 15, 19);
// 	line-height: 1.5;
// }

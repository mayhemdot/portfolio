import { cva, type VariantProps } from "class-variance-authority";

const textVariants = cva("leading-tight whitespace-pre-line leading-tight", {
  variants: {
    font: {
      sans: "font-sans",
      mono: "font-mono",
    },
    size: {
      xl: "fl-text-58/120",
      lg: "fl-text-32/72",
      md: "fl-text-28/64",
      smd: "fl-text-24/48",
      sm: "fl-text-20/32",
      xs: "fl-text-16/24",
      xxs: "fl-text-14/20",
    },
    variant: {
      primary: "text-background", //text-[var(--color-foreground)]
      secondary: "text-foreground", //"text-[var(--color-background)]"
      gray: "text-[#8d8c8c]",
      gold: "text-[#9C8355]",
      gradient:
        "font-thin bg-clip-text text-transparent inline-flex bg-[linear-gradient(126deg,_#8d8c8c_0%,_rgba(255,255,255,0.85)_50.17%,_rgba(141,140,140,0.71)_100%)]",
    },
  },
  defaultVariants: {
    font: "sans",
    size: "xl",
    variant: "primary",
  },
});

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

interface TextProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof textVariants> {
  comp?: HeadingTag;
  children: React.ReactNode;
}

export function Text({ comp: Component = "h1", font, size, variant, className, children, ...props }: TextProps) {
  return (
    <Component className={textVariants({ size, font, variant, className })} {...props}>
      {children}
    </Component>
  );
}

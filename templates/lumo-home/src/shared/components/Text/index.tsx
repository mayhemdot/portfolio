import { cva, type VariantProps } from "class-variance-authority";
import type { React } from "next/dist/server/route-modules/app-page/vendored/rsc/entrypoints";

const textVariants = cva("leading-tight whitespace-pre-line", {
  variants: {
    font: {
      sans: "text-[var(--font-alum)]",
      mono: "text-[var(--font-alum)]",
    },
    weight: {
      "thin": "font-thin",
      "normal": "font-normal",
      "medium": "font-medium",
      "bold": "font-bold"
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
      mutedForeground: "text-muted-foreground",
      mutedBackground: "text-muted-background",
    },
  },
  defaultVariants: {
    weight: "normal",
    font: "sans",
    size: "xs",
    variant: "primary",
  },
});

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

export interface TextProps
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

// type Props = {
//   comp: 'h1' | 'h2' |,
//   data: any
//   enableGutter?: boolean
//   enableProse?: boolean
// } & React.HTMLAttributes<HTMLDivElement>

// export default function Text(props: Props) {
//   const {
//     data,
//     className,
//     enableProse = true,
//     enableGutter = true,
//     ...rest
//   } = props;
//   return <h1>{data}</h1>;
// }

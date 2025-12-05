import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils/cn";

const variants = cva(
  "font-sans rounded-full border leading-tight backdrop-blur-3xl transition-[background_0.37s_ease-in]",
  {
    variants: {
      size: {
        xl: "fl-text-16/24",
        lg: "fl-text-16/24 h-18 px-8",
        md: "fl-text-16/24 h-16 px-6",
        sm: "fl-text-15/20 h-14 px-5",
        xs: "fl-text-15/20 h-10 px-4",
      },
      variant: {
        primary: "border-[#3e3e3e] bg-[#27272A]",
        secondary: "border-[#27272A] bg-[#3e3e3e]",
        // primary: "text-[var(--color-foreground)]",
        // secondary: "text-[var(--color-background)]",
        // glow: "font-thin text-secondary border-2 bg-white/20 rounded-full border-[#272727]",
      },
    },
    defaultVariants: {
      size: "lg",
      variant: "primary",
    },
  },
);

type Props = Omit<React.ComponentPropsWithoutRef<"input">, "size"> & VariantProps<typeof variants>;

export function Input({ size, variant, className, ...rest }: Props) {
  // const { size, variant, placeholder, className } = props;
  return <input {...rest} className={cn(variants({ size, variant }), className)} />;
}

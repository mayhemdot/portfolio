import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

export const btnVariants = cva(
  "font-sans cursor-pointer text-foreground leading-tight inline-flex justify-center items-center transition-[background_0.37s_ease-in]",
  {
    variants: {
      size: {
        xl: "fl-text-16/20 h-24 px-16 ",
        lg: "fl-text-16/20 h-18 px-10",
        md: "fl-text-16/20 h-16 px-8",
        sm: "fl-text-16/20 h-14 px-6",
        xs: "fl-text-16/20 h-10 px-4",
        iconXS: "fl-text-16/24 rounded-xl! [&>svg]:size-4 [&>svg]:md:size-5 h-9 w-9 md:h-10 md:w-10",
      },
      variant: {
        primary: "border-[#3e3e3e] bg-[#27272A]",
        // primary: "text-[var(--color-foreground)]",
        // secondary: "text-[var(--color-background)]",
        glow: "font-thin  border-2 bg-white/20 rounded-full border-[#272727] shadow-[0_0_2px_rgba(255,255,255,0.8)_inset,0_0_15px_0_rgba(255,255,255,0.33)] active:border-[#3e3e3e] active:text-warning hover:shadow-[0_0_2px_rgba(255,255,255,0.7)_inset,_0_0_40px_0_rgba(0,0,0,0.33)]",
      },
    },
    defaultVariants: {
      size: "lg",
      variant: "glow",
      // variant: "primary",
    },
  },
);

type Props = React.ComponentPropsWithoutRef<"button"> & VariantProps<typeof btnVariants>;

export function Button({
  children,
  isLoading,
  ...props
}: Readonly<{ children: React.ReactNode; isLoading?: boolean } & Props>) {
  const { size, variant, className, ...rest } = props;
  return (
    <button className={cn(btnVariants({ size, variant }), className)} {...rest} type="button">
      {children} {isLoading && "Loading..."}
    </button>
  );
}

// "size-10 flex items-center justify-center bg-transparent border border-[#1B1B1B] rounded-xl",
//  <button className={"btn-glow w-full h-full text-secondary xl:min-h-[64px] 2xl:min-h-[78px] z-10 fl-text-16/24"} > Find your knife </button>

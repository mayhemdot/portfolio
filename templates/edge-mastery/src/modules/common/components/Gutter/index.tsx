import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";

const gutterVariants = cva("grow", {
  variants: {
    vertical: {
      "3xl": "py-32 md:py-34 lg:py-36",
      "2xl": "py-24 md:py-26 lg:py-32",
      xl: "py-20 md:py-22 lg:py-24",
      lg: "py-16 md:py-18 lg:py-20",
      md: "py-12 md:py-14 lg:py-16",
      sm: "py-8 md:py-10 lg:py-12",
      xs: "py-4 md:py-6 lg:py-8",
      none: "py-0",
    },
    horizontal: {
      "3xl": "px-32 md:px-34 lg:px-36",
      "2xl": "px-24 md:px-26 lg:px-32",
      xl: "px-20 md:px-22 lg:px-24",
      lg: "px-16 md:px-18 lg:px-20",
      md: "px-12 md:px-14 lg:px-16",
      sm: "px-8 md:px-10 lg:px-12",
      xs: "px-4 md:px-6 lg:px-8",
      none: "px-0",
    },

    "gap-horizontal": {
      "3xl": "gap-x-32 md:gap-x-34 lg:gap-x-36",
      "2xl": "gap-x-24 md:gap-x-26 lg:gap-x-32",
      xl: "gap-x-20 md:gap-x-22 lg:gap-x-24",
      lg: "gap-x-16 md:gap-x-18 lg:gap-x-20",
      md: "gap-x-12 md:gap-x-14 lg:gap-x-16",
      sm: "gap-x-8 md:gap-x-10 lg:gap-x-12",
      xs: "gap-x-4 md:gap-x-6 lg:gap-x-8",
      none: "gap-x-0",
    },

    "gap-vertical": {
      "3xl": "gap-y-32 md:gap-y-34 lg:gap-y-36",
      "2xl": "gap-y-24 md:gap-y-26 lg:gap-y-32",
      xl: "gap-y-20 md:gap-y-22 lg:gap-y-24",
      lg: "gap-y-16 md:gap-y-18 lg:gap-y-20",
      md: "gap-y-12 md:gap-y-14 lg:gap-y-16",
      sm: "gap-y-8 md:gap-y-10 lg:gap-y-12",
      xs: "gap-y-4 md:gap-y-6 lg:gap-y-8",
      none: "gap-y-0",
    },
    // horizontal: {
    //   "2xl": "px-36",
    //   xl: "px-32",
    //   lg: "px-24",
    //   md: "px-20",
    //   sm: "px-16",
    //   xs: "px-12",
    //   xxs: "px-8",
    //   none: "px-0",
    // },
    disableTop: {
      true: "pt-0",
      false: "",
    },
    disableBottom: {
      true: "pb-0",
      false: "",
    },

    disableLeft: {
      true: "pl-0",
      false: "",
    },
    disableRight: {
      true: "pr-0",
      false: "",
    },
  },
  defaultVariants: {
    vertical: "none",
    horizontal: "none",
    disableTop: false,
    disableBottom: false,
  },
});

// type Props = {
//   children: React.ReactNode
//   className?: string
//   left?: boolean
//   ref?: React.Ref<HTMLDivElement>
//   right?: boolean
// }

interface GutterProps extends VariantProps<typeof gutterVariants> {
  children: React.ReactNode;
}

export const Gutter: React.FC<GutterProps & { className?: string; ref?: React.Ref<HTMLDivElement> }> = (props) => {
  const { children, className, ref, ...rest } = props;

  return (
    <div
      className={gutterVariants({
        className: className,
        ...rest,
      })}
      ref={ref}
    >
      {children}
    </div>
  );
};

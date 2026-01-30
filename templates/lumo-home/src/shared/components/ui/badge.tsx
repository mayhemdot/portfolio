import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/shared/lib/utils";

// const badgeVariants = cva(
//   'inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
//   {
//     variants: {
//       variant: {
//         default:
//           'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
//         secondary:
//           'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
//         destructive:
//           'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
//         outline:
//           'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
//       },
//     },
//     defaultVariants: {
//       variant: 'default',
//     },
//   },
// )

// default:
//     'h-8 xl:h-10 fl-text-16/20 xl:text-lg xl:px-4 xl:py-2 px-3 py-1 has-[>svg]:px-3 grow' /* 42px */,
//     sm: 'h-7 xl:h-8 text-sm gap-1.5 px-2.5 xl:px-3 has-[>svg]:px-2.5 grow' /* 32px */,
//     lg: 'h-10 md:h-12 xl:h-14 text-lg xl:text-xl px-5 xl:px-6 has-[>svg]:px-4 grow' /* 56px */,
//     xl: 'h-12 lg:h-14 xl:h-16 px-6 xl:px-8 has-[>svg]:px-5 fl-text-20/24 grow' /* 64px */,
//     icon: 'size-8 xl:size-9 2xl:size-10 !p-0 grow-0',
//     iconXL: 'size-10 md:size-12 2xl:size-16 !p-0 grow-0',

const bdgVariants = cva(
  "inline-flex items-center leading-tight justify-center border px-2 py-0.5 font-normal w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
      size: {
        default:
          "h-10 fl-text-16/20 px-3 md:px-4 py-2 has-[>svg]:px-3" /* 42px */,
        xs: "h-4 lg:h-6 gap-1.5 px-2 md:px-3 has-[>svg]:px-2.5 fl-text-14/18" /* 32px */,
        sm: "h-8 md:h-9 fl-text-16/20 gap-1.5 px-3 md:px-4 lg:px-5 has-[>svg]:px-2.5" /* 32px */,
        lg: "h-14 fl-text-16/20 px-6 has-[>svg]:px-4" /* 56px */,
        xl: "h-16 fl-text-18/24 px-8 has-[>svg]:px-5" /* 64px */,
        icon: "size-10",
        iconXS: "size-3 xl:size-4",
        // icon-sm: 'size-8',
        // icon-lg: 'size-14',
        // icon-xl: 'size-16'
      },
      rounded: {
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        default: "rounded-full",
      },
    },
    defaultVariants: {
      rounded: "default",
      size: "default",
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof bdgVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(bdgVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, bdgVariants };

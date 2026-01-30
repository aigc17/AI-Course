/**
 * [INPUT]: @radix-ui/react-slot, class-variance-authority, lucide-react
 * [OUTPUT]: Button, buttonVariants - 按钮组件
 * [POS]: UI 基础层 - 核心交互原语，极简黑白风格
 *
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

// ============================================================================
// CVA 样式变体 - 极简直角风格
// ============================================================================

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "whitespace-nowrap text-sm font-medium",
    "transition-colors duration-200",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-foreground text-background hover:bg-foreground/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        secondary: "bg-muted text-foreground hover:bg-muted/80",
        outline: "border border-foreground bg-transparent hover:bg-foreground hover:text-background",
        ghost: "hover:bg-muted",
        link: "text-foreground underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        default: "h-9 px-4",
        md: "h-10 px-5",
        lg: "h-11 px-6",
        xl: "h-12 px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

// ============================================================================
// Button 组件
// ============================================================================

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading, leftIcon, rightIcon, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    if (asChild) {
      return (
        <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
          {children}
        </Comp>
      )
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : leftIcon}
        {children}
        {!isLoading && rightIcon}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

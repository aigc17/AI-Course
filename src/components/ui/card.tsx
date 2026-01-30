/**
 * [INPUT]: @/lib/utils - cn 工具函数
 * [OUTPUT]: Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent
 * [POS]: UI 基础层 - 卡片容器组件，支持凸起/内凹变体
 *
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// ============================================================================
// Card 样式配置 - 凸起/内凹效果
// ============================================================================

const CARD_STYLES = {
  elevated: {
    boxShadow: `
      0 4px 16px rgba(0,0,0,0.12),
      inset 0 1px 0 rgba(255,255,255,0.15),
      inset 0 -1px 0 rgba(0,0,0,0.05)
    `.trim().replace(/\s+/g, ' '),
  },
  inset: {
    boxShadow: `
      inset 0 2px 8px rgba(0,0,0,0.1),
      inset 0 1px 2px rgba(0,0,0,0.08)
    `.trim().replace(/\s+/g, ' '),
  },
  flat: {
    boxShadow: 'none',
  },
}

const cardVariants = cva(
  [
    "rounded-[20px] border bg-card text-card-foreground",
    "transition-all duration-200",
  ].join(" "),
  {
    variants: {
      variant: {
        elevated: "hover:scale-[1.01]",
        inset: "bg-muted/30",
        flat: "",
      },
    },
    defaultVariants: { variant: "elevated" },
  }
)

// ============================================================================
// Card 组件
// ============================================================================

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "elevated", style, ...props }, ref) => {
    const styleConfig = CARD_STYLES[variant || "elevated"]
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, className }))}
        style={{ boxShadow: styleConfig.boxShadow, ...style }}
        {...props}
      />
    )
  }
)
Card.displayName = "Card"

// ============================================================================
// Card 子组件
// ============================================================================

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  )
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("font-semibold leading-none tracking-tight", className)} {...props} />
  )
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
)
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
)
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  )
)
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants }

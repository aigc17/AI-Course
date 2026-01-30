/**
 * [INPUT]: class-variance-authority - 样式变体管理
 * [INPUT]: @/lib/utils - cn 工具函数
 * [OUTPUT]: Badge, badgeVariants - 徽章组件和样式变体
 * [POS]: UI 基础层 - 标签/徽章组件，渐变背景+立体效果
 *
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// ============================================================================
// Badge 样式配置 - 渐变 + 立体效果
// ============================================================================

const BADGE_STYLES = {
  default: {
    background: 'linear-gradient(135deg, var(--primary) 0%, color-mix(in srgb, var(--primary) 80%, black) 100%)',
    boxShadow: '0 2px 6px color-mix(in srgb, var(--primary) 30%, transparent), inset 0 1px 0 rgba(255,255,255,0.2)',
  },
  secondary: {
    background: 'linear-gradient(135deg, var(--secondary) 0%, color-mix(in srgb, var(--secondary) 85%, black) 100%)',
    boxShadow: '0 1px 4px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1)',
  },
  destructive: {
    background: 'linear-gradient(135deg, var(--destructive) 0%, color-mix(in srgb, var(--destructive) 80%, black) 100%)',
    boxShadow: '0 2px 6px color-mix(in srgb, var(--destructive) 30%, transparent), inset 0 1px 0 rgba(255,255,255,0.2)',
  },
  outline: {
    background: 'transparent',
    boxShadow: 'none',
  },
}

const badgeVariants = cva(
  [
    "inline-flex items-center rounded-xl border px-3 py-1 text-xs font-semibold",
    "transition-all duration-200",
    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "border-transparent text-primary-foreground",
        secondary: "border-transparent text-secondary-foreground",
        destructive: "border-transparent text-destructive-foreground",
        outline: "text-foreground border-border",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

// ============================================================================
// Badge 组件
// ============================================================================

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant = "default", style, ...props }: BadgeProps) {
  const styleConfig = BADGE_STYLES[variant || "default"]
  return (
    <div
      className={cn(badgeVariants({ variant }), className)}
      style={{
        background: styleConfig.background,
        boxShadow: styleConfig.boxShadow,
        ...style,
      }}
      {...props}
    />
  )
}

export { Badge, badgeVariants }

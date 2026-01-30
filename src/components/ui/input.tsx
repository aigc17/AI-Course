/**
 * [INPUT]: @/lib/utils - cn 工具函数
 * [OUTPUT]: Input - 输入框组件
 * [POS]: UI 基础层 - 表单输入组件，内凹效果
 *
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// ============================================================================
// Input 样式 - 内凹效果
// ============================================================================

const INPUT_STYLE = {
  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.08), inset 0 1px 2px rgba(0,0,0,0.06)',
  focusBoxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06), 0 0 0 2px var(--ring)',
}

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, style, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-2xl border border-input bg-background px-4 py-2",
          "text-base transition-all duration-200",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
          "placeholder:text-muted-foreground",
          "focus-visible:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "md:text-sm",
          className
        )}
        style={{
          boxShadow: isFocused ? INPUT_STYLE.focusBoxShadow : INPUT_STYLE.boxShadow,
          ...style,
        }}
        ref={ref}
        onFocus={(e) => { setIsFocused(true); props.onFocus?.(e) }}
        onBlur={(e) => { setIsFocused(false); props.onBlur?.(e) }}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }

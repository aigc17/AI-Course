/**
 * [INPUT]: ./badge, ./avatar, ./skeleton
 * [OUTPUT]: Badge, Avatar, Skeleton 等展示组件
 * [POS]: UI 展示组件聚合导出
 *
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

export { Badge, badgeVariants, type BadgeProps } from "./badge"
export { Avatar, AvatarImage, AvatarFallback } from "./avatar"
export { Skeleton } from "./skeleton"

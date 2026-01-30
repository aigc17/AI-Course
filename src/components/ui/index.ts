/**
 * [INPUT]: ./form, ./layout, ./overlay, ./display, ./navigation
 * [OUTPUT]: 所有 UI 组件的统一导出
 * [POS]: UI 组件库入口，聚合所有子模块
 *
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

// Form Components
export { Button, buttonVariants, type ButtonProps } from "./form"
export { Input } from "./form"
export { Label } from "./form"

// Layout Components
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "./layout"
export { Separator } from "./layout"

// Overlay Components
export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "./overlay"
export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "./overlay"

// Display Components
export { Badge, badgeVariants, type BadgeProps } from "./display"
export { Avatar, AvatarImage, AvatarFallback } from "./display"
export { Skeleton } from "./display"

// Navigation Components
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./navigation"
export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "./navigation"

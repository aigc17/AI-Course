/**
 * [INPUT]: ./dialog, ./sheet
 * [OUTPUT]: Dialog, Sheet 等覆盖层组件
 * [POS]: UI 覆盖层组件聚合导出
 *
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

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
} from "./dialog"

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
} from "./sheet"

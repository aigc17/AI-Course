/**
 * [INPUT]: ./accordion, ./navigation-menu
 * [OUTPUT]: Accordion, NavigationMenu 等导航组件
 * [POS]: UI 导航组件聚合导出
 *
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./accordion"
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
} from "./navigation-menu"

/**
 * [INPUT]: framer-motion - 动画库类型
 * [OUTPUT]: Motion variants 预设
 * [POS]: 动画系统 - 统一的入场/交互动效变体
 *
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import type { Variants, Transition } from 'framer-motion'

// ============================================================================
// 共享过渡配置
// ============================================================================

const smoothEase = [0.22, 1, 0.36, 1]

const createTransition = (duration = 0.6): Transition => ({
  duration,
  ease: smoothEase
})

// ============================================================================
// 入场动画
// ============================================================================

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: createTransition() }
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: createTransition(0.5) }
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: createTransition(0.5) }
}

// ============================================================================
// 方向滑入
// ============================================================================

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: createTransition() }
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: createTransition() }
}

// ============================================================================
// 容器动画（子元素交错）
// ============================================================================

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
}

export const staggerFast: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } }
}

// ============================================================================
// Viewport 配置 & 常用组合
// ============================================================================

export const viewportConfig = { once: true, margin: '-100px' }

export const sectionAnimation = {
  initial: 'hidden',
  whileInView: 'visible',
  viewport: viewportConfig,
  variants: staggerContainer
}

export const itemAnimation = { variants: fadeInUp }

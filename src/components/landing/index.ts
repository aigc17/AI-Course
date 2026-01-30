/**
 * [INPUT]: ./Hero, ./social-proof/*, ./content/*, ./conversion/*
 * [OUTPUT]: Landing 组件统一导出
 * [POS]: Landing 模块入口，barrel export
 *
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

// Hero (首屏)
export { default as Hero } from './Hero'

// Social Proof (社会证明)
export { default as LogoBar } from './social-proof/LogoBar'
export { default as Testimonials } from './social-proof/Testimonials'

// Content (内容区)
export { default as ProblemSection } from './content/ProblemSection'
export { default as FeaturesSection } from './content/FeaturesSection'
export { default as HowItWorks } from './content/HowItWorks'

// Conversion (转化区)
export { default as Pricing } from './conversion/Pricing'
export { default as FAQ } from './conversion/FAQ'
export { default as FinalCTA } from './conversion/FinalCTA'

/**
 * [INPUT]: framer-motion, @/lib/motion, @/components/ui/button, @/components/ui/badge
 * [OUTPUT]: Hero - 首屏英雄区组件
 * [POS]: Landing 首屏 - Above the Fold，价值主张 + CTA
 *
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/motion'

// ============================================================================
// 内容配置
// ============================================================================

const HERO_CONTENT = {
  badge: '全新上线',
  headline: '掌握 AI，创造未来',
  subheadline: '从 Transformer 到 LLM 应用开发，系统学习人工智能核心技术。由行业专家授课，助你成为 AI 时代的创造者。',
  primaryCTA: '开始学习',
  secondaryCTA: '了解更多',
  socialProof: '已有 10,000+ 学员加入',
}

// ============================================================================
// 子组件
// ============================================================================

const HeroBadge = () => (
  <motion.div variants={fadeInUp}>
    <Badge variant="secondary" className="mb-6 gap-1.5 px-4 py-1.5">
      <Sparkles className="h-3.5 w-3.5" />
      {HERO_CONTENT.badge}
    </Badge>
  </motion.div>
)

const HeroHeadline = () => (
  <motion.h1
    variants={fadeInUp}
    className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
  >
    {HERO_CONTENT.headline.split('，')[0]}，
    <br />
    <span className="text-primary">{HERO_CONTENT.headline.split('，')[1]}</span>
  </motion.h1>
)

const HeroSubheadline = () => (
  <motion.p
    variants={fadeInUp}
    className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl"
  >
    {HERO_CONTENT.subheadline}
  </motion.p>
)

const HeroCTAs = () => (
  <motion.div
    variants={fadeInUp}
    className="flex flex-col items-center justify-center gap-4 sm:flex-row"
  >
    <Button size="lg" className="h-12 px-8" asChild>
      <Link to="/courses">
        {HERO_CONTENT.primaryCTA}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </Button>
    <Button variant="outline" size="lg" className="h-12 px-8">
      {HERO_CONTENT.secondaryCTA}
    </Button>
  </motion.div>
)

const HeroSocialProof = () => (
  <motion.p variants={fadeInUp} className="mt-8 text-sm text-muted-foreground">
    {HERO_CONTENT.socialProof}
  </motion.p>
)

const HeroBackground = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
    <div className="absolute bottom-0 left-1/4 h-[400px] w-[600px] rounded-full bg-accent/5 blur-[100px]" />
  </div>
)

const HeroContent = () => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={staggerContainer}
    className="relative z-10 max-w-4xl text-center"
  >
    <HeroBadge />
    <HeroHeadline />
    <HeroSubheadline />
    <HeroCTAs />
    <HeroSocialProof />
  </motion.div>
)

// ============================================================================
// 主组件
// ============================================================================

const Hero = () => (
  <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-4">
    <HeroBackground />
    <HeroContent />
  </section>
)

export default Hero

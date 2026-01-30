/**
 * [INPUT]: framer-motion, @/lib/motion, @/components/ui/button
 * [OUTPUT]: Hero - 首屏英雄区组件
 * [POS]: Landing 首屏 - Above the Fold，价值主张 + CTA
 *
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/form'
import { fadeInUp, staggerContainer } from '@/lib/motion'

// ============================================================================
// 内容配置
// ============================================================================

const HERO_CONTENT = {
  badge: '全新上线',
  headline: '掌握 AI，创造未来',
  subheadline: '从 Transformer 到 LLM 应用开发，系统学习人工智能核心技术。',
  primaryCTA: '开始学习',
  secondaryCTA: '了解更多',
  socialProof: '已有 10,000+ 学员加入',
}

// ============================================================================
// 子组件
// ============================================================================

const HeroBadge = () => (
  <motion.div variants={fadeInUp}>
    <span className="mb-6 inline-block border border-foreground px-3 py-1 text-xs font-medium uppercase tracking-wider">
      {HERO_CONTENT.badge}
    </span>
  </motion.div>
)

const HeroHeadline = () => (
  <motion.h1
    variants={fadeInUp}
    className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
  >
    {HERO_CONTENT.headline}
  </motion.h1>
)

const HeroSubheadline = () => (
  <motion.p
    variants={fadeInUp}
    className="mx-auto mb-10 max-w-xl text-lg text-muted-foreground"
  >
    {HERO_CONTENT.subheadline}
  </motion.p>
)

const HeroCTAs = () => (
  <motion.div
    variants={fadeInUp}
    className="flex flex-col items-center justify-center gap-4 sm:flex-row"
  >
    <Button size="lg" className="h-12 rounded-none bg-foreground px-8 text-background hover:bg-foreground/90" asChild>
      <Link to="/courses">
        {HERO_CONTENT.primaryCTA}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </Button>
    <Button variant="outline" size="lg" className="h-12 rounded-none border-foreground px-8">
      {HERO_CONTENT.secondaryCTA}
    </Button>
  </motion.div>
)

const HeroSocialProof = () => (
  <motion.p variants={fadeInUp} className="mt-8 text-sm text-muted-foreground">
    {HERO_CONTENT.socialProof}
  </motion.p>
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
  <section className="flex min-h-[90vh] flex-col items-center justify-center px-4">
    <HeroContent />
  </section>
)

export default Hero

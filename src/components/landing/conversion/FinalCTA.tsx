/**
 * [INPUT]: framer-motion, @/lib/motion, @/components/ui/button
 * [OUTPUT]: FinalCTA - 底部行动号召区
 * [POS]: Landing 底部 CTA - 最终转化入口，促进用户行动
 *
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/motion'
import { Button } from '../../ui/button'

// ============================================================================
// 内容配置
// ============================================================================

const CONTENT = {
  headline: '准备好开启 AI 学习之旅了吗？',
  subheadline: '加入 10,000+ 学员，一起掌握 AI 时代的核心技能',
  primaryCTA: '立即开始学习',
  secondaryCTA: '预约免费咨询',
}

// ============================================================================
// 子组件
// ============================================================================

const Headline = () => (
  <motion.h2 variants={fadeInUp} className="mb-4 text-3xl font-bold md:text-4xl">
    {CONTENT.headline}
  </motion.h2>
)

const Subheadline = () => (
  <motion.p variants={fadeInUp} className="mb-8 text-lg text-muted-foreground">
    {CONTENT.subheadline}
  </motion.p>
)

const CTAButtons = () => (
  <motion.div variants={fadeInUp} className="flex flex-col gap-4 sm:flex-row">
    <Button size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
      {CONTENT.primaryCTA}
    </Button>
    <Button size="lg" variant="outline">
      {CONTENT.secondaryCTA}
    </Button>
  </motion.div>
)

// ============================================================================
// 主组件
// ============================================================================

const FinalCTA = () => (
  <section className="bg-primary/5 py-20 md:py-28">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={staggerContainer}
      className="mx-auto max-w-7xl px-4 text-center"
    >
      <Headline />
      <Subheadline />
      <CTAButtons />
    </motion.div>
  </section>
)

export default FinalCTA

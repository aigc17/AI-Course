/**
 * [INPUT]: framer-motion, lucide-react, @/lib/motion, @/components/ui/card
 * [OUTPUT]: FeaturesSection - 功能特性展示
 * [POS]: Landing 特性区 - Bento Grid 布局展示核心功能
 *
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { motion } from 'framer-motion'
import { Brain, Rocket, Sparkles, Code, Users, Zap } from 'lucide-react'
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/motion'
import { Card, CardContent } from '../../ui/card'

// ============================================================================
// 内容配置
// ============================================================================

const CONTENT = {
  headline: '为什么选择 AI Nexus',
  subheadline: '系统化的学习路径，助你从入门到精通',
  features: [
    { icon: Brain, title: '系统化课程', desc: '从基础到进阶，循序渐进掌握 AI 核心技术栈', span: 'md:col-span-2' },
    { icon: Rocket, title: '实战项目', desc: '通过真实项目实践，将理论转化为能力' },
    { icon: Sparkles, title: '前沿技术', desc: '紧跟 GPT、Diffusion 等最新技术动态' },
    { icon: Code, title: '代码实操', desc: '每节课配套代码，边学边练' },
    { icon: Users, title: '社区支持', desc: '加入学习社群，与同行交流成长' },
    { icon: Zap, title: '快速上手', desc: '精心设计的学习路径，高效掌握核心技能' },
  ],
}

// ============================================================================
// 子组件
// ============================================================================

const SectionHeader = () => (
  <motion.div variants={fadeInUp} className="mb-12 text-center">
    <h2 className="mb-4 text-3xl font-bold md:text-4xl">{CONTENT.headline}</h2>
    <p className="text-lg text-muted-foreground">{CONTENT.subheadline}</p>
  </motion.div>
)

interface FeatureCardProps {
  icon: React.ElementType
  title: string
  desc: string
  span?: string
}

const FeatureCard = ({ icon: Icon, title, desc, span = '' }: FeatureCardProps) => (
  <motion.div variants={fadeInUp} className={span}>
    <Card className="h-full transition-shadow hover:shadow-lg">
      <CardContent className="p-6">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="mb-2 text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </CardContent>
    </Card>
  </motion.div>
)

// ============================================================================
// 主组件
// ============================================================================

const FeaturesSection = () => (
  <section className="py-20 md:py-28">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={staggerContainer}
      className="mx-auto max-w-7xl px-4"
    >
      <SectionHeader />
      <div className="grid gap-6 md:grid-cols-3">
        {CONTENT.features.map(f => <FeatureCard key={f.title} {...f} />)}
      </div>
    </motion.div>
  </section>
)

export default FeaturesSection

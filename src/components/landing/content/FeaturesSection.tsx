/**
 * [INPUT]: framer-motion, lucide-react, @/lib/motion
 * [OUTPUT]: FeaturesSection - 功能特性展示
 * [POS]: Landing 特性区 - 展示核心功能
 *
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/motion'

// ============================================================================
// 内容配置
// ============================================================================

const CONTENT = {
  headline: '为什么选择 AI Nexus',
  subheadline: '系统化的学习路径，助你从入门到精通',
  features: [
    { title: '系统化课程', desc: '从基础到进阶，循序渐进掌握 AI 核心技术栈' },
    { title: '实战项目', desc: '通过真实项目实践，将理论转化为能力' },
    { title: '前沿技术', desc: '紧跟 GPT、Diffusion 等最新技术动态' },
    { title: '代码实操', desc: '每节课配套代码，边学边练' },
    { title: '社区支持', desc: '加入学习社群，与同行交流成长' },
    { title: '快速上手', desc: '精心设计的学习路径，高效掌握核心技能' },
  ],
}

// ============================================================================
// 子组件
// ============================================================================

const SectionHeader = () => (
  <motion.div variants={fadeInUp} className="mb-12 text-center">
    <h2 className="mb-4 text-3xl font-bold md:text-4xl">{CONTENT.headline}</h2>
    <p className="text-muted-foreground">{CONTENT.subheadline}</p>
  </motion.div>
)

const FeatureCard = ({ title, desc }: { title: string; desc: string }) => (
  <motion.div variants={fadeInUp} className="border border-border p-6">
    <h3 className="mb-2 font-semibold">{title}</h3>
    <p className="text-sm text-muted-foreground">{desc}</p>
  </motion.div>
)

// ============================================================================
// 主组件
// ============================================================================

const FeaturesSection = () => (
  <section className="border-y border-border py-20 md:py-28">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={staggerContainer}
      className="mx-auto max-w-7xl px-4"
    >
      <SectionHeader />
      <div className="grid gap-px bg-border md:grid-cols-3">
        {CONTENT.features.map(f => (
          <div key={f.title} className="bg-background">
            <FeatureCard {...f} />
          </div>
        ))}
      </div>
    </motion.div>
  </section>
)

export default FeaturesSection

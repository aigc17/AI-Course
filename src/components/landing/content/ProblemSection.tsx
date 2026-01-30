/**
 * [INPUT]: framer-motion, lucide-react, @/lib/motion
 * [OUTPUT]: ProblemSection - 痛点共鸣区
 * [POS]: Landing 痛点区 - 引发用户共鸣，为解决方案铺垫
 *
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/motion'

// ============================================================================
// 内容配置
// ============================================================================

const CONTENT = {
  headline: '你是否也面临这些困境？',
  painPoints: [
    { title: '知识碎片化', desc: '网上资料零散，缺乏系统性学习路径' },
    { title: '理论与实践脱节', desc: '看了很多教程，却不知道如何落地项目' },
    { title: '技术更新太快', desc: 'GPT-4、Sora... 新技术层出不穷，跟不上节奏' },
  ],
}

// ============================================================================
// 子组件
// ============================================================================

const PainPointCard = ({ title, desc }: { title: string; desc: string }) => (
  <motion.div variants={fadeInUp} className="border border-border p-6">
    <h3 className="mb-2 font-semibold">{title}</h3>
    <p className="text-sm text-muted-foreground">{desc}</p>
  </motion.div>
)

// ============================================================================
// 主组件
// ============================================================================

const ProblemSection = () => (
  <section className="py-20 md:py-28">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={staggerContainer}
      className="mx-auto max-w-7xl px-4"
    >
      <motion.h2
        variants={fadeInUp}
        className="mb-12 text-center text-3xl font-bold md:text-4xl"
      >
        {CONTENT.headline}
      </motion.h2>
      <div className="grid gap-6 md:grid-cols-3">
        {CONTENT.painPoints.map(p => <PainPointCard key={p.title} {...p} />)}
      </div>
    </motion.div>
  </section>
)

export default ProblemSection

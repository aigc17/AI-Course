/**
 * [INPUT]: framer-motion, @/lib/motion
 * [OUTPUT]: HowItWorks - 使用流程步骤
 * [POS]: Landing 流程区 - 展示学习路径步骤
 *
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/motion'

// ============================================================================
// 内容配置
// ============================================================================

const STEPS = [
  { step: 1, title: '选择课程', desc: '根据你的基础和目标，选择合适的学习路径' },
  { step: 2, title: '系统学习', desc: '跟随视频教程，配合代码实操，扎实掌握知识' },
  { step: 3, title: '项目实战', desc: '完成课程项目，将所学应用到真实场景' },
  { step: 4, title: '持续进阶', desc: '加入社群，获取最新技术动态，持续成长' },
]

// ============================================================================
// 子组件
// ============================================================================

const StepNumber = ({ num }: { num: number }) => (
  <span className="text-5xl font-bold text-muted-foreground/20">{String(num).padStart(2, '0')}</span>
)

const StepCard = ({ step, title, desc }: { step: number; title: string; desc: string }) => (
  <motion.div variants={fadeInUp} className="text-center">
    <StepNumber num={step} />
    <h3 className="mt-4 font-semibold">{title}</h3>
    <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
  </motion.div>
)

const SectionTitle = () => (
  <motion.h2
    variants={fadeInUp}
    className="mb-16 text-center text-3xl font-bold md:text-4xl"
  >
    如何开始学习
  </motion.h2>
)

// ============================================================================
// 主组件
// ============================================================================

const HowItWorks = () => (
  <section className="py-20 md:py-28">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={staggerContainer}
      className="mx-auto max-w-7xl px-4"
    >
      <SectionTitle />
      <div className="grid gap-12 md:grid-cols-4">
        {STEPS.map(s => <StepCard key={s.step} {...s} />)}
      </div>
    </motion.div>
  </section>
)

export default HowItWorks

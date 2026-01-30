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
  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
    {num}
  </div>
)

const StepCard = ({ step, title, desc }: { step: number; title: string; desc: string }) => (
  <motion.div variants={fadeInUp} className="flex flex-col items-center text-center">
    <StepNumber num={step} />
    <div className="mt-4">
      <h3 className="mb-2 font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  </motion.div>
)

const Connector = () => (
  <div className="hidden h-0.5 w-full bg-border md:block" />
)

const SectionTitle = () => (
  <motion.h2
    variants={fadeInUp}
    className="mb-12 text-center text-3xl font-bold md:text-4xl"
  >
    如何开始学习
  </motion.h2>
)

const StepsGrid = () => (
  <div className="grid gap-8 md:grid-cols-4">
    {STEPS.map((s, i) => (
      <div key={s.step} className="relative">
        <StepCard {...s} />
        {i < STEPS.length - 1 && <Connector />}
      </div>
    ))}
  </div>
)

// ============================================================================
// 主组件
// ============================================================================

const HowItWorks = () => (
  <section className="bg-muted/30 py-20 md:py-28">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={staggerContainer}
      className="mx-auto max-w-7xl px-4"
    >
      <SectionTitle />
      <StepsGrid />
    </motion.div>
  </section>
)

export default HowItWorks

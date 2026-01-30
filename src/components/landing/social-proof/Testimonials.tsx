/**
 * [INPUT]: framer-motion, @/lib/motion
 * [OUTPUT]: Testimonials - 用户评价区
 * [POS]: Landing 评价区 - 展示用户好评，建立信任
 *
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/motion'

// ============================================================================
// 内容配置
// ============================================================================

const TESTIMONIALS = [
  { quote: '课程内容非常系统，从零基础到能独立开发 AI 应用，收获很大！', author: '张明', role: '前端工程师 @ 字节跳动' },
  { quote: '老师讲解清晰，项目实战很有价值，帮我成功转型 AI 领域。', author: '李华', role: '算法工程师 @ 阿里巴巴' },
  { quote: '社群氛围很好，遇到问题都能得到及时解答，学习效率很高。', author: '王芳', role: '产品经理 @ 腾讯' },
]

// ============================================================================
// 子组件
// ============================================================================

const TestimonialCard = ({ quote, author, role }: { quote: string; author: string; role: string }) => (
  <motion.div variants={fadeInUp} className="border border-border p-6">
    <p className="mb-6 text-muted-foreground">"{quote}"</p>
    <div>
      <p className="font-medium">{author}</p>
      <p className="text-sm text-muted-foreground">{role}</p>
    </div>
  </motion.div>
)

const SectionHeader = () => (
  <motion.h2 variants={fadeInUp} className="mb-12 text-center text-3xl font-bold md:text-4xl">
    学员怎么说
  </motion.h2>
)

// ============================================================================
// 主组件
// ============================================================================

const Testimonials = () => (
  <section className="border-y border-border py-20 md:py-28">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={staggerContainer}
      className="mx-auto max-w-7xl px-4"
    >
      <SectionHeader />
      <div className="grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map(t => <TestimonialCard key={t.author} {...t} />)}
      </div>
    </motion.div>
  </section>
)

export default Testimonials

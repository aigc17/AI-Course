/**
 * [INPUT]: framer-motion, @/lib/motion, @/components/ui/accordion
 * [OUTPUT]: FAQ - 常见问题区
 * [POS]: Landing FAQ 区 - 解答用户疑虑，消除购买障碍
 *
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../ui/navigation'

// ============================================================================
// 内容配置
// ============================================================================

const FAQS = [
  { q: '课程适合什么基础的学员？', a: '我们的课程从零基础到进阶都有覆盖。入门课程不需要任何 AI 背景，只需要基本的编程知识即可开始学习。' },
  { q: '购买后可以永久观看吗？', a: '是的，一次购买即可永久观看。我们还会持续更新课程内容，所有更新对已购用户免费开放。' },
  { q: '有没有退款政策？', a: '我们提供 7 天无理由退款。如果课程不符合你的预期，可以在购买后 7 天内申请全额退款。' },
  { q: '如何获得学习支持？', a: '我们提供多种学习支持：专属学习社群、课程答疑区、定期直播答疑。专业版用户还可享受 1v1 导师指导。' },
  { q: '课程包含哪些实战项目？', a: '课程包含多个真实项目：AI 聊天机器人、图像生成应用、智能文档助手等，帮助你将所学应用到实际场景。' },
]

// ============================================================================
// 子组件
// ============================================================================

const SectionHeader = () => (
  <motion.div variants={fadeInUp} className="mb-12 text-center">
    <h2 className="mb-4 text-3xl font-bold md:text-4xl">常见问题</h2>
    <p className="text-muted-foreground">还有疑问？查看下方常见问题</p>
  </motion.div>
)

const FAQList = () => (
  <motion.div variants={fadeInUp}>
    <Accordion type="single" collapsible className="mx-auto max-w-3xl">
      {FAQS.map((faq, i) => (
        <AccordionItem key={i} value={`item-${i}`} className="border-border">
          <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </motion.div>
)

// ============================================================================
// 主组件
// ============================================================================

const FAQ = () => (
  <section className="border-y border-border py-20 md:py-28">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={staggerContainer}
      className="mx-auto max-w-7xl px-4"
    >
      <SectionHeader />
      <FAQList />
    </motion.div>
  </section>
)

export default FAQ

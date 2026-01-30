/**
 * [INPUT]: framer-motion, @/lib/motion, @/components/ui/card, @/components/ui/avatar
 * [OUTPUT]: Testimonials - 用户评价区
 * [POS]: Landing 评价区 - 展示用户好评，建立信任
 *
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/motion'
import { Card, CardContent } from '../../ui/card'
import { Avatar, AvatarFallback } from '../../ui/avatar'

// ============================================================================
// 内容配置
// ============================================================================

const TESTIMONIALS = [
  { quote: '课程内容非常系统，从零基础到能独立开发 AI 应用，收获很大！', author: '张明', role: '前端工程师', company: '字节跳动' },
  { quote: '老师讲解清晰，项目实战很有价值，帮我成功转型 AI 领域。', author: '李华', role: '算法工程师', company: '阿里巴巴' },
  { quote: '社群氛围很好，遇到问题都能得到及时解答，学习效率很高。', author: '王芳', role: '产品经理', company: '腾讯' },
]

// ============================================================================
// 子组件
// ============================================================================

const StarRating = () => (
  <div className="mb-4 flex gap-1">
    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-primary text-primary" />)}
  </div>
)

const AuthorInfo = ({ author, role, company }: { author: string; role: string; company: string }) => (
  <div className="flex items-center gap-3">
    <Avatar>
      <AvatarFallback className="bg-primary/10 text-primary">{author[0]}</AvatarFallback>
    </Avatar>
    <div>
      <p className="font-medium">{author}</p>
      <p className="text-sm text-muted-foreground">{role} @ {company}</p>
    </div>
  </div>
)

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  company: string
}

const TestimonialCard = ({ quote, author, role, company }: TestimonialCardProps) => (
  <motion.div variants={fadeInUp}>
    <Card className="h-full">
      <CardContent className="p-6">
        <StarRating />
        <p className="mb-6 text-muted-foreground">"{quote}"</p>
        <AuthorInfo author={author} role={role} company={company} />
      </CardContent>
    </Card>
  </motion.div>
)

const SectionHeader = () => (
  <motion.h2 variants={fadeInUp} className="mb-12 text-center text-3xl font-bold md:text-4xl">
    学员怎么说
  </motion.h2>
)

const TestimonialsGrid = () => (
  <div className="grid gap-6 md:grid-cols-3">
    {TESTIMONIALS.map(t => <TestimonialCard key={t.author} {...t} />)}
  </div>
)

// ============================================================================
// 主组件
// ============================================================================

const Testimonials = () => (
  <section className="py-20 md:py-28">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={staggerContainer}
      className="mx-auto max-w-7xl px-4"
    >
      <SectionHeader />
      <TestimonialsGrid />
    </motion.div>
  </section>
)

export default Testimonials

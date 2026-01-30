/**
 * [INPUT]: framer-motion, @/lib/motion, @/components/ui/button
 * [OUTPUT]: Pricing - 定价方案区
 * [POS]: Landing 定价区 - 展示课程套餐，促进转化
 *
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/motion'
import { Button } from '../../ui/form'

// ============================================================================
// 内容配置
// ============================================================================

const PLANS = [
  {
    name: '入门版',
    price: '¥299',
    period: '/月',
    desc: '适合刚接触 AI 的新手',
    features: ['基础课程全部解锁', '社群答疑支持', '课程代码下载', '学习进度追踪'],
    featured: false,
  },
  {
    name: '专业版',
    price: '¥599',
    period: '/月',
    desc: '适合想深入学习的开发者',
    features: ['全部课程解锁', '1v1 导师答疑', '项目代码 Review', '就业推荐服务', '专属学习群'],
    featured: true,
  },
  {
    name: '企业版',
    price: '联系我们',
    period: '',
    desc: '适合团队培训需求',
    features: ['定制化课程内容', '专属培训讲师', '企业内训支持', '批量授权管理', '优先技术支持'],
    featured: false,
  },
]

// ============================================================================
// 子组件
// ============================================================================

const SectionHeader = () => (
  <motion.div variants={fadeInUp} className="mb-12 text-center">
    <h2 className="mb-4 text-3xl font-bold md:text-4xl">选择适合你的方案</h2>
    <p className="text-muted-foreground">灵活的定价，满足不同学习需求</p>
  </motion.div>
)

const FeatureList = ({ features }: { features: string[] }) => (
  <ul className="mb-6 space-y-3">
    {features.map(f => (
      <li key={f} className="flex items-center gap-2 text-sm">
        <Check className="h-4 w-4" />
        <span>{f}</span>
      </li>
    ))}
  </ul>
)

interface PlanCardProps {
  name: string
  price: string
  period: string
  desc: string
  features: string[]
  featured: boolean
}

const PlanCard = ({ name, price, period, desc, features, featured }: PlanCardProps) => (
  <motion.div variants={fadeInUp} className={`border p-6 ${featured ? 'border-foreground' : 'border-border'}`}>
    {featured && <span className="mb-4 inline-block text-xs font-medium uppercase tracking-wider">最受欢迎</span>}
    <h3 className="text-xl font-semibold">{name}</h3>
    <div className="my-4">
      <span className="text-4xl font-bold">{price}</span>
      <span className="text-muted-foreground">{period}</span>
    </div>
    <p className="mb-6 text-sm text-muted-foreground">{desc}</p>
    <FeatureList features={features} />
    <Button className={`w-full rounded-none ${featured ? 'bg-foreground text-background hover:bg-foreground/90' : ''}`} variant={featured ? 'default' : 'outline'}>
      {price === '联系我们' ? '联系销售' : '立即订阅'}
    </Button>
  </motion.div>
)

// ============================================================================
// 主组件
// ============================================================================

const Pricing = () => (
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
        {PLANS.map(p => <PlanCard key={p.name} {...p} />)}
      </div>
    </motion.div>
  </section>
)

export default Pricing

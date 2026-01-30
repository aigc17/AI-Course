/**
 * [INPUT]: framer-motion, @/lib/motion, @/components/ui/card, @/components/ui/button
 * [OUTPUT]: Pricing - 定价方案区
 * [POS]: Landing 定价区 - 展示课程套餐，促进转化
 *
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/motion'
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'
import { Button } from '../../ui/button'

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
    popular: false,
  },
  {
    name: '专业版',
    price: '¥599',
    period: '/月',
    desc: '适合想深入学习的开发者',
    features: ['全部课程解锁', '1v1 导师答疑', '项目代码 Review', '就业推荐服务', '专属学习群'],
    popular: true,
  },
  {
    name: '企业版',
    price: '联系我们',
    period: '',
    desc: '适合团队培训需求',
    features: ['定制化课程内容', '专属培训讲师', '企业内训支持', '批量授权管理', '优先技术支持'],
    popular: false,
  },
]

// ============================================================================
// 子组件
// ============================================================================

const SectionHeader = () => (
  <motion.div variants={fadeInUp} className="mb-12 text-center">
    <h2 className="mb-4 text-3xl font-bold md:text-4xl">选择适合你的方案</h2>
    <p className="text-lg text-muted-foreground">灵活的定价，满足不同学习需求</p>
  </motion.div>
)

const PopularBadge = () => (
  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
    最受欢迎
  </div>
)

const FeatureList = ({ features }: { features: string[] }) => (
  <ul className="space-y-3">
    {features.map(f => (
      <li key={f} className="flex items-center gap-2 text-sm">
        <Check className="h-4 w-4 text-primary" />
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
  popular: boolean
}

const PlanCard = ({ name, price, period, desc, features, popular }: PlanCardProps) => (
  <motion.div variants={fadeInUp} className="relative">
    {popular && <PopularBadge />}
    <Card className={`h-full ${popular ? 'border-primary shadow-lg' : ''}`}>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">{name}</CardTitle>
        <div className="mt-4">
          <span className="text-4xl font-bold">{price}</span>
          <span className="text-muted-foreground">{period}</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <FeatureList features={features} />
        <Button className="w-full" variant={popular ? 'default' : 'outline'}>
          {price === '联系我们' ? '联系销售' : '立即订阅'}
        </Button>
      </CardContent>
    </Card>
  </motion.div>
)

const PlansGrid = () => (
  <div className="grid gap-6 md:grid-cols-3">
    {PLANS.map(p => <PlanCard key={p.name} {...p} />)}
  </div>
)

// ============================================================================
// 主组件
// ============================================================================

const Pricing = () => (
  <section className="bg-muted/30 py-20 md:py-28">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={staggerContainer}
      className="mx-auto max-w-7xl px-4"
    >
      <SectionHeader />
      <PlansGrid />
    </motion.div>
  </section>
)

export default Pricing

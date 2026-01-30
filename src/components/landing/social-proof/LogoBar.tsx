/**
 * [INPUT]: framer-motion, @/lib/motion
 * [OUTPUT]: LogoBar - 信任背书 Logo 条
 * [POS]: Landing 信任区 - 展示合作伙伴/媒体 Logo
 *
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { motion } from 'framer-motion'
import { fadeIn, viewportConfig } from '@/lib/motion'

// ============================================================================
// 内容配置
// ============================================================================

const LOGOS = ['OpenAI', 'Google', 'Microsoft', 'Meta', 'Anthropic']

// ============================================================================
// 子组件
// ============================================================================

const LogoItem = ({ name }: { name: string }) => (
  <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground/50 transition-colors hover:text-foreground">
    {name}
  </span>
)

// ============================================================================
// 主组件
// ============================================================================

const LogoBar = () => (
  <motion.section
    initial="hidden"
    whileInView="visible"
    viewport={viewportConfig}
    variants={fadeIn}
    className="border-y border-border py-12"
  >
    <div className="mx-auto max-w-7xl px-4">
      <p className="mb-8 text-center text-xs uppercase tracking-wider text-muted-foreground">
        受到行业领先企业信赖
      </p>
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
        {LOGOS.map(name => <LogoItem key={name} name={name} />)}
      </div>
    </div>
  </motion.section>
)

export default LogoBar

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
// 内容配置（实际项目中替换为真实 Logo）
// ============================================================================

const LOGOS = [
  { name: 'OpenAI', placeholder: 'OpenAI' },
  { name: 'Google', placeholder: 'Google' },
  { name: 'Microsoft', placeholder: 'Microsoft' },
  { name: 'Meta', placeholder: 'Meta' },
  { name: 'Anthropic', placeholder: 'Anthropic' },
]

// ============================================================================
// 子组件
// ============================================================================

const LogoItem = ({ name }: { name: string }) => (
  <div className="flex h-12 items-center justify-center px-6 text-lg font-semibold text-muted-foreground/60 transition-colors hover:text-muted-foreground">
    {name}
  </div>
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
    className="border-y border-border/40 py-12"
  >
    <div className="mx-auto max-w-7xl px-4">
      <p className="mb-8 text-center text-sm text-muted-foreground">
        受到行业领先企业信赖
      </p>
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
        {LOGOS.map(logo => <LogoItem key={logo.name} name={logo.name} />)}
      </div>
    </div>
  </motion.section>
)

export default LogoBar

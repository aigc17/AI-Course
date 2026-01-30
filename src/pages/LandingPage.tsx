/**
 * [INPUT]: @/components/landing
 * [OUTPUT]: LandingPage - 落地页
 * [POS]: 营销落地页，组合所有 Landing Section 组件
 *
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import {
  Hero,
  LogoBar,
  ProblemSection,
  FeaturesSection,
  HowItWorks,
  Testimonials,
  Pricing,
  FAQ,
  FinalCTA,
} from '@/components/landing'

// ============================================================================
// 主组件
// ============================================================================

const LandingPage = () => (
  <main>
    <Hero />
    <LogoBar />
    <ProblemSection />
    <FeaturesSection />
    <HowItWorks />
    <Testimonials />
    <Pricing />
    <FAQ />
    <FinalCTA />
  </main>
)

export default LandingPage

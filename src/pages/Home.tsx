/**
 * [INPUT]: react-router-dom - 路由导航
 * [INPUT]: framer-motion - 动画库
 * [INPUT]: @/components/ui/* - 设计系统组件
 * [OUTPUT]: Home - 首页组件
 * [POS]: 应用首页，包含 Hero 和特性展示，ChatGPT 风格
 *
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Brain, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/form';

// ============================================================================
// Feature Card
// ============================================================================

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  delay: number;
}

const FeatureCard = ({ icon, title, desc, delay }: FeatureCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="rounded-lg border border-border/40 bg-card/50 p-6"
  >
    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
      {icon}
    </div>
    <h3 className="mb-2 text-lg font-medium">{title}</h3>
    <p className="text-sm text-muted-foreground">{desc}</p>
  </motion.div>
);

// ============================================================================
// Hero Content
// ============================================================================

const HeroHeadline = () => (
  <h1 className="mb-6 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
    掌握 AI，<br /><span className="text-primary">创造未来</span>
  </h1>
);

const HeroSubtitle = () => (
  <p className="mx-auto mb-10 max-w-xl text-lg text-muted-foreground">
    从 Transformer 到 LLM 应用开发，系统学习人工智能核心技术。
    由行业专家授课，助你成为 AI 时代的创造者。
  </p>
);

const HeroCTA = () => (
  <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
    <Button size="lg" className="h-11 px-6" asChild>
      <Link to="/courses">开始学习<ArrowRight className="ml-2 h-4 w-4" /></Link>
    </Button>
    <Button variant="outline" size="lg" className="h-11 px-6">了解更多</Button>
  </div>
);

const HeroSection = () => (
  <section className="relative flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-4">
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/5 blur-[100px]" />
    </div>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-10 max-w-3xl text-center"
    >
      <HeroHeadline />
      <HeroSubtitle />
      <HeroCTA />
    </motion.div>
  </section>
);

// ============================================================================
// Features Section
// ============================================================================

const FEATURES = [
  { icon: <Brain className="h-5 w-5" />, title: '系统化课程', desc: '从基础到进阶，循序渐进掌握 AI 核心技术栈。' },
  { icon: <Rocket className="h-5 w-5" />, title: '实战项目', desc: '通过真实项目实践，将理论转化为可落地的能力。' },
  { icon: <Sparkles className="h-5 w-5" />, title: '前沿技术', desc: '紧跟 GPT、Diffusion 等最新技术发展动态。' },
];

const FeaturesSection = () => (
  <section className="border-t border-border/40 py-24">
    <div className="container mx-auto px-4">
      <div className="grid gap-8 md:grid-cols-3">
        {FEATURES.map((f, i) => <FeatureCard key={i} {...f} delay={i * 0.1} />)}
      </div>
    </div>
  </section>
);

// ============================================================================
// Home Page
// ============================================================================

const Home = () => (
  <div className="flex flex-col">
    <HeroSection />
    <FeaturesSection />
  </div>
);

export default Home;

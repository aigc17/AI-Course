import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, CheckCircle2, Zap, Users } from 'lucide-react';
import { ViewState } from '../types';

interface HomeProps {
  onNavigate: (view: ViewState) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        {/* Background Gradients */}
        <div className="absolute -left-20 top-20 h-96 w-96 rounded-full bg-primary-500/20 blur-[100px]"></div>
        <div className="absolute -right-20 top-40 h-96 w-96 rounded-full bg-secondary-500/10 blur-[100px]"></div>

        <div className="container relative mx-auto px-4 text-center md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-1.5 text-sm font-medium text-primary-300">
              <Zap className="h-4 w-4 fill-current" />
              <span>AI 学习新纪元已开启</span>
            </div>
            <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-white sm:text-7xl">
              掌握 <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">未来科技</span> 的<br className="hidden sm:block" />
              核心力量
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-400">
              深度学习 Transformer、Stable Diffusion、LLM 开发等前沿技术。
              由行业顶尖专家授课，助你成为 AI 时代的领跑者。
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button 
                onClick={() => onNavigate('CATALOG')}
                className="group flex h-12 items-center gap-2 rounded-full bg-primary-600 px-8 text-base font-semibold text-white transition-all hover:bg-primary-500 hover:shadow-lg hover:shadow-primary-500/25 active:scale-95"
              >
                开始学习
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button className="flex h-12 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 text-base font-semibold text-white transition-colors hover:bg-white/10 active:scale-95">
                <Play className="h-4 w-4 fill-current" />
                观看演示
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="border-t border-white/5 bg-dark-800/50 py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "实战项目驱动",
                desc: "不仅是理论，更通过构建真实的 AI 应用来巩固知识。",
                icon: <Zap className="h-6 w-6 text-yellow-400" />
              },
              {
                title: "专家导师团队",
                desc: "来自 Google, OpenAI, DeepMind 的资深工程师亲自授课。",
                icon: <CheckCircle2 className="h-6 w-6 text-green-400" />
              },
              {
                title: "终身学习社区",
                desc: "加入数千名 AI 开发者的社群，共享最新技术动态。",
                icon: <Users className="h-6 w-6 text-blue-400" />
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="rounded-2xl border border-white/5 bg-white/5 p-8 backdrop-blur-sm"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-dark-900 shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold text-white">{feature.title}</h3>
                <p className="text-slate-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
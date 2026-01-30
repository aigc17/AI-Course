import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, CheckCircle2, Zap, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        {/* Background Gradients */}
        <div className="absolute -left-20 top-20 h-96 w-96 rounded-full bg-primary/20 blur-[120px]"></div>
        <div className="absolute -right-20 top-40 h-96 w-96 rounded-full bg-secondary/30 blur-[120px]"></div>

        <div className="container relative mx-auto px-4 text-center md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm">
              <Zap className="mr-2 h-3.5 w-3.5 fill-current" />
              AI 学习新纪元已开启
            </Badge>
            
            <h1 className="mb-6 text-5xl font-extrabold tracking-tight sm:text-7xl">
              掌握 <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-foreground">未来科技</span> 的<br className="hidden sm:block" />
              核心力量
            </h1>
            
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
              深度学习 Transformer、Stable Diffusion、LLM 开发等前沿技术。
              由行业顶尖专家授课，助你成为 AI 时代的领跑者。
            </p>
            
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="h-12 px-8 text-base" asChild>
                <Link to="/courses">
                  开始学习
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                <Play className="mr-2 h-4 w-4 fill-current" />
                观看演示
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-secondary/10 py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "实战项目驱动",
                desc: "不仅是理论，更通过构建真实的 AI 应用来巩固知识。",
                icon: <Zap className="h-6 w-6 text-yellow-500" />
              },
              {
                title: "专家导师团队",
                desc: "来自 Google, OpenAI, DeepMind 的资深工程师亲自授课。",
                icon: <CheckCircle2 className="h-6 w-6 text-green-500" />
              },
              {
                title: "终身学习社区",
                desc: "加入数千名 AI 开发者的社群，共享最新技术动态。",
                icon: <Users className="h-6 w-6 text-blue-500" />
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
              >
                <Card className="h-full border-muted bg-card/50 backdrop-blur-sm transition-colors hover:bg-card">
                  <CardHeader>
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-background shadow-sm ring-1 ring-border">
                      {feature.icon}
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
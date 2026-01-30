/**
 * [INPUT]: @/components/ui/* - 微拟物设计系统组件
 * [OUTPUT]: DesignSystem - 设计系统展示页面
 * [POS]: 设计系统文档页，展示所有组件变体和微拟物效果
 *
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { ArrowRight, Download, Heart, Mail, Plus, Send, Star } from 'lucide-react';

// ============================================================================
// 原子组件
// ============================================================================

const ColorSwatch = ({ name, className }: { name: string; className: string }) => (
  <div className="space-y-2">
    <div className={`h-20 rounded-md ${className}`} />
    <p className="text-xs font-medium">{name}</p>
  </div>
);

const SectionTitle = ({ children, desc }: { children: React.ReactNode; desc?: string }) => (
  <div className="space-y-1">
    <h2 className="text-2xl font-semibold">{children}</h2>
    {desc && <p className="text-sm text-muted-foreground">{desc}</p>}
  </div>
);

const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-lg font-medium">{children}</h3>
);

// ============================================================================
// 区块组件
// ============================================================================

const ColorsSection = () => (
  <section className="space-y-6">
    <SectionTitle>Colors</SectionTitle>
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6">
      <ColorSwatch name="Background" className="bg-background border" />
      <ColorSwatch name="Primary" className="bg-primary" />
      <ColorSwatch name="Secondary" className="bg-secondary" />
      <ColorSwatch name="Muted" className="bg-muted" />
      <ColorSwatch name="Accent" className="bg-accent" />
      <ColorSwatch name="Destructive" className="bg-destructive" />
    </div>
  </section>
);

const ButtonShowcase = () => (
  <>
    <div className="space-y-4">
      <SubTitle>Button 变体</SubTitle>
      <div className="flex flex-wrap gap-4">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
    </div>
    <div className="space-y-4">
      <SubTitle>Button 尺寸</SubTitle>
      <div className="flex flex-wrap items-center gap-4">
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="xl">Extra Large</Button>
        <Button size="icon"><Plus /></Button>
      </div>
    </div>
    <div className="space-y-4">
      <SubTitle>Button 状态与图标</SubTitle>
      <div className="flex flex-wrap gap-4">
        <Button isLoading>Loading</Button>
        <Button leftIcon={<Mail />}>With Icon</Button>
        <Button rightIcon={<ArrowRight />}>Continue</Button>
        <Button leftIcon={<Download />} variant="secondary">Download</Button>
        <Button leftIcon={<Heart />} variant="outline">Like</Button>
        <Button leftIcon={<Star />} variant="destructive">Delete</Button>
      </div>
    </div>
  </>
);

const CardShowcase = () => (
  <div className="space-y-4">
    <SubTitle>Card 变体</SubTitle>
    <div className="grid gap-6 md:grid-cols-3">
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Elevated</CardTitle>
          <CardDescription>凸起效果，外投影 + 顶部高光</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">默认卡片样式，悬停时微微放大</p>
        </CardContent>
      </Card>
      <Card variant="inset">
        <CardHeader>
          <CardTitle>Inset</CardTitle>
          <CardDescription>内凹效果，inset 阴影</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">适合表单容器、输入区域</p>
        </CardContent>
      </Card>
      <Card variant="flat">
        <CardHeader>
          <CardTitle>Flat</CardTitle>
          <CardDescription>扁平效果，无阴影</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">适合嵌套卡片、次要内容</p>
        </CardContent>
      </Card>
    </div>
  </div>
);

const InputBadgeShowcase = () => (
  <>
    <div className="space-y-4">
      <SubTitle>Input 内凹效果</SubTitle>
      <div className="grid max-w-md gap-4">
        <Input placeholder="点击查看聚焦效果..." />
        <Input placeholder="禁用状态" disabled />
      </div>
      <p className="text-sm text-muted-foreground">内凹阴影 + 聚焦时外发光环</p>
    </div>
    <div className="space-y-4">
      <SubTitle>Badge 渐变效果</SubTitle>
      <div className="flex flex-wrap gap-4">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>
      <p className="text-sm text-muted-foreground">渐变背景 + 顶部高光 + 微阴影</p>
    </div>
  </>
);

const ComboExamples = () => (
  <section className="space-y-6">
    <SectionTitle desc="组件组合使用示例">组合示例</SectionTitle>
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>创建项目</CardTitle>
          <CardDescription>一键部署你的新项目</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="项目名称" />
          <Input placeholder="项目描述" />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">取消</Button>
          <Button rightIcon={<Send />}>部署</Button>
        </CardFooter>
      </Card>
      <Card variant="inset" className="w-full">
        <CardHeader>
          <CardTitle>订阅通知</CardTitle>
          <CardDescription>获取最新课程更新</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="your@email.com" />
          <div className="flex gap-2">
            <Badge>免费</Badge>
            <Badge variant="secondary">每周更新</Badge>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" leftIcon={<Mail />}>订阅</Button>
        </CardFooter>
      </Card>
    </div>
  </section>
);

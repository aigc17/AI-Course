/**
 * [INPUT]: @/components/ui/* - 极简设计系统组件
 * [OUTPUT]: DesignSystem - 设计系统展示页面
 * [POS]: 设计系统文档页，展示所有组件变体和极简风格
 *
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { Button } from '../components/ui/form';
import { Input } from '../components/ui/form';
import { Badge } from '../components/ui/display';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '../components/ui/layout';
import { Separator } from '../components/ui/layout';
import { ArrowRight, Download, Heart, Mail, Plus, Send, Star } from 'lucide-react';

// ============================================================================
// 原子组件
// ============================================================================

const ColorSwatch = ({ name, bg }: { name: string; bg: string }) => (
  <div className="space-y-2">
    <div className={`h-20 rounded-md ${bg}`} />
    <p className="text-xs font-medium">{name}</p>
  </div>
);

const Title = ({ children, desc }: { children: React.ReactNode; desc?: string }) => (
  <div className="space-y-1">
    <h2 className="text-2xl font-semibold">{children}</h2>
    {desc && <p className="text-sm text-muted-foreground">{desc}</p>}
  </div>
);

const Sub = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-lg font-medium">{children}</h3>
);

const Hint = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm text-muted-foreground">{children}</p>
);

// ============================================================================
// 颜色区块
// ============================================================================

const COLORS = [
  { name: 'Background', bg: 'bg-background border' },
  { name: 'Primary', bg: 'bg-primary' },
  { name: 'Secondary', bg: 'bg-secondary' },
  { name: 'Muted', bg: 'bg-muted' },
  { name: 'Accent', bg: 'bg-accent' },
  { name: 'Destructive', bg: 'bg-destructive' },
];

const ColorsSection = () => (
  <section className="space-y-6">
    <Title>Colors</Title>
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6">
      {COLORS.map(c => <ColorSwatch key={c.name} {...c} />)}
    </div>
  </section>
);

// ============================================================================
// Button 展示
// ============================================================================

const BtnVariants = () => (
  <div className="space-y-4">
    <Sub>Button 变体</Sub>
    <div className="flex flex-wrap gap-4">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  </div>
);

const BtnSizes = () => (
  <div className="space-y-4">
    <Sub>Button 尺寸</Sub>
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
      <Button size="icon"><Plus /></Button>
    </div>
  </div>
);

const BtnStates = () => (
  <div className="space-y-4">
    <Sub>Button 状态与图标</Sub>
    <div className="flex flex-wrap gap-4">
      <Button isLoading>Loading</Button>
      <Button leftIcon={<Mail />}>With Icon</Button>
      <Button rightIcon={<ArrowRight />}>Continue</Button>
      <Button leftIcon={<Download />} variant="secondary">Download</Button>
      <Button leftIcon={<Heart />} variant="outline">Like</Button>
      <Button leftIcon={<Star />} variant="destructive">Delete</Button>
    </div>
  </div>
);

// ============================================================================
// Card 展示
// ============================================================================

const CardElevated = () => (
  <Card variant="elevated">
    <CardHeader>
      <CardTitle>Elevated</CardTitle>
      <CardDescription>凸起效果，外投影 + 顶部高光</CardDescription>
    </CardHeader>
    <CardContent><Hint>默认卡片样式，悬停时微微放大</Hint></CardContent>
  </Card>
);

const CardInset = () => (
  <Card variant="inset">
    <CardHeader>
      <CardTitle>Inset</CardTitle>
      <CardDescription>内凹效果，inset 阴影</CardDescription>
    </CardHeader>
    <CardContent><Hint>适合表单容器、输入区域</Hint></CardContent>
  </Card>
);

const CardFlat = () => (
  <Card variant="flat">
    <CardHeader>
      <CardTitle>Flat</CardTitle>
      <CardDescription>扁平效果，无阴影</CardDescription>
    </CardHeader>
    <CardContent><Hint>适合嵌套卡片、次要内容</Hint></CardContent>
  </Card>
);

const CardVariants = () => (
  <div className="space-y-4">
    <Sub>Card 变体</Sub>
    <div className="grid gap-6 md:grid-cols-3">
      <CardElevated />
      <CardInset />
      <CardFlat />
    </div>
  </div>
);

// ============================================================================
// Input & Badge 展示
// ============================================================================

const InputDemo = () => (
  <div className="space-y-4">
    <Sub>Input 内凹效果</Sub>
    <div className="grid max-w-md gap-4">
      <Input placeholder="点击查看聚焦效果..." />
      <Input placeholder="禁用状态" disabled />
    </div>
    <Hint>内凹阴影 + 聚焦时外发光环</Hint>
  </div>
);

const BadgeDemo = () => (
  <div className="space-y-4">
    <Sub>Badge 渐变效果</Sub>
    <div className="flex flex-wrap gap-4">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
    <Hint>渐变背景 + 顶部高光 + 微阴影</Hint>
  </div>
);

// ============================================================================
// 组合示例
// ============================================================================

const ExampleCreate = () => (
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
);

const ExampleSubscribe = () => (
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
);

// ============================================================================
// 区块组件
// ============================================================================

const Header = () => (
  <div className="space-y-4">
    <h1 className="text-4xl font-bold">Design System</h1>
    <Hint>Theme: Amethyst Haze · 微拟物光影质感</Hint>
  </div>
);

const NeumorphicSection = () => (
  <section className="space-y-8">
    <Title desc="渐变背景 + 立体阴影 + 微交互">微拟物组件展示</Title>
    <BtnVariants />
    <BtnSizes />
    <BtnStates />
    <CardVariants />
    <InputDemo />
    <BadgeDemo />
  </section>
);

const ComboSection = () => (
  <section className="space-y-6">
    <Title desc="组件组合使用示例">组合示例</Title>
    <div className="grid gap-6 md:grid-cols-2">
      <ExampleCreate />
      <ExampleSubscribe />
    </div>
  </section>
);

// ============================================================================
// 主组件
// ============================================================================

const DesignSystem = () => (
  <div className="container mx-auto min-h-screen space-y-12 px-4 py-20">
    <Header />
    <Separator />
    <ColorsSection />
    <Separator />
    <NeumorphicSection />
    <Separator />
    <ComboSection />
  </div>
);

export default DesignSystem;

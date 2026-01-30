import { Course } from './types';

export const MOCK_COURSES: Course[] = [
  {
    id: '1',
    title: 'Transformer 架构深度解析',
    description: '从零开始构建 GPT 模型，深入理解 Attention 机制与 Transformer 核心架构。',
    instructor: 'Dr. Sarah Chen',
    thumbnail: 'https://picsum.photos/id/1/800/600',
    price: 199,
    rating: 4.9,
    students: 1240,
    category: 'LLM',
    level: 'Advanced',
    duration: '12h 30m',
    chapters: [
      { id: 'c1', title: 'Attention Is All You Need', duration: '45:00', isLocked: false },
      { id: 'c2', title: 'Positional Encoding', duration: '32:15', isLocked: true },
      { id: 'c3', title: 'Encoder-Decoder Stack', duration: '55:20', isLocked: true },
    ]
  },
  {
    id: '2',
    title: 'Stable Diffusion 艺术生成实战',
    description: '掌握提示词工程（Prompt Engineering）与 ControlNet 高级控图技巧。',
    instructor: 'Alex Rivera',
    thumbnail: 'https://picsum.photos/id/2/800/600',
    price: 149,
    rating: 4.8,
    students: 3500,
    category: 'Generative AI',
    level: 'Beginner',
    duration: '8h 15m',
    chapters: [
      { id: 'c1', title: '环境搭建与界面介绍', duration: '20:00', isLocked: false },
      { id: 'c2', title: 'Prompt 魔法咒语', duration: '40:10', isLocked: true },
    ]
  },
  {
    id: '3',
    title: 'Python 数据科学与机器学习',
    description: '使用 Pandas, NumPy 和 Scikit-learn 进行数据分析与模型训练。',
    instructor: 'Ken Ji',
    thumbnail: 'https://picsum.photos/id/3/800/600',
    price: 99,
    rating: 4.7,
    students: 8900,
    category: 'Data Science',
    level: 'Beginner',
    duration: '24h 00m',
    chapters: [
      { id: 'c1', title: 'Python 基础回顾', duration: '60:00', isLocked: false },
    ]
  },
  {
    id: '4',
    title: '计算机视觉：YOLOv8 目标检测',
    description: '实时物体检测系统搭建，应用于自动驾驶与安防监控场景。',
    instructor: 'Emily Zhang',
    thumbnail: 'https://picsum.photos/id/4/800/600',
    price: 249,
    rating: 4.9,
    students: 850,
    category: 'Computer Vision',
    level: 'Intermediate',
    duration: '15h 45m',
    chapters: [
      { id: 'c1', title: 'CNN 卷积神经网络', duration: '50:00', isLocked: false },
    ]
  },
  {
    id: '5',
    title: 'LangChain 应用开发全攻略',
    description: '构建基于 LLM 的知识库问答系统与智能 Agent。',
    instructor: 'David Smith',
    thumbnail: 'https://picsum.photos/id/5/800/600',
    price: 179,
    rating: 4.6,
    students: 2100,
    category: 'LLM',
    level: 'Intermediate',
    duration: '10h 20m',
    chapters: [
      { id: 'c1', title: 'LangChain 核心概念', duration: '35:00', isLocked: false },
    ]
  },
  {
    id: '6',
    title: 'AI 绘画商业变现指南',
    description: '如何利用 Midjourney 和 SD 进行商业插画、Logo 设计与电商图制作。',
    instructor: 'Lisa Wang',
    thumbnail: 'https://picsum.photos/id/6/800/600',
    price: 129,
    rating: 4.5,
    students: 5600,
    category: 'Generative AI',
    level: 'Beginner',
    duration: '6h 50m',
    chapters: [
      { id: 'c1', title: '商业授权与版权', duration: '15:00', isLocked: false },
    ]
  }
];
# 页面结构与路由

> 版本: v0.1 | 更新: 2026-01-30

## 路由总览

```
/                           首页 (公开)
├── /courses                课程列表 (公开)
├── /courses/:id            课程详情 (公开)
├── /courses/:id/learn      学习页面 (需登录+购买)
├── /checkout/:courseId     订单确认 (需登录)
├── /payment/result         支付结果 (需登录)
│
├── /auth
│   ├── /login              登录
│   ├── /register           注册
│   └── /callback           OAuth 回调
│
├── /user                   用户中心 (需登录)
│   ├── /learning           学习中心
│   ├── /orders             我的订单
│   └── /settings           账号设置
│
└── /admin                  管理后台 (需 Admin)
    ├── /dashboard          数据概览
    ├── /courses            课程管理
    │   ├── /new            新建课程
    │   └── /:id            编辑课程
    ├── /orders             订单管理
    └── /users              用户管理
```

## 页面详情

### 公开页面

#### 首页 `/`
```
Home.tsx
├── HeroSection          - 主视觉区
├── FeaturesSection      - 特性展示
└── Footer               - 页脚
```

#### 课程列表 `/courses`
```
Courses.tsx
├── PageHeader           - 标题
├── SearchBar            - 搜索框
├── CategoryFilter       - 分类筛选
├── CourseGrid           - 课程网格
│   └── CourseCard[]     - 课程卡片
└── EmptyState           - 空状态
```

#### 课程详情 `/courses/:id`
```
CourseDetail.tsx
├── TopNav               - 顶部导航
├── VideoPlayer          - 视频预览
├── CourseInfo           - 课程信息
│   ├── TabNav           - 标签导航
│   └── InstructorCard   - 讲师卡片
├── Syllabus             - 课程大纲
│   └── ChapterItem[]    - 章节项
└── PurchaseBar          - 购买栏 (底部固定)
```

### 认证页面

#### 登录 `/auth/login`
```
Login.tsx
├── Logo                 - 品牌标识
├── LoginForm            - 登录表单
│   ├── EmailInput
│   ├── PasswordInput
│   └── SubmitButton
├── OAuthButtons         - 第三方登录
│   ├── GitHubButton
│   └── GoogleButton
└── RegisterLink         - 注册链接
```

#### 注册 `/auth/register`
```
Register.tsx
├── Logo
├── RegisterForm
│   ├── NameInput
│   ├── EmailInput
│   ├── PasswordInput
│   └── SubmitButton
└── LoginLink
```

### 学习页面

#### 学习 `/courses/:id/learn`
```
Learn.tsx
├── LearnHeader          - 顶部导航
│   ├── BackButton
│   ├── CourseTitle
│   └── ProgressBar
├── ContentArea          - 内容区
│   ├── VideoPlayer      - 视频播放器 (type=video)
│   └── ArticleContent   - 图文内容 (type=article)
├── ChapterNav           - 章节导航
│   ├── PrevButton
│   └── NextButton
└── ChapterSidebar       - 章节侧边栏
    └── ChapterItem[]
```

### 用户中心

#### 学习中心 `/user/learning`
```
Learning.tsx
├── PageHeader
├── CourseProgress[]     - 课程进度卡片
│   ├── CourseCover
│   ├── CourseTitle
│   ├── ProgressBar
│   └── ContinueButton
└── EmptyState
```

#### 我的订单 `/user/orders`
```
Orders.tsx
├── PageHeader
├── OrderList
│   └── OrderItem[]
│       ├── CourseInfo
│       ├── OrderStatus
│       ├── OrderAmount
│       └── OrderDate
└── EmptyState
```

### 管理后台

#### 课程管理 `/admin/courses`
```
AdminCourseList.tsx
├── PageHeader
│   └── CreateButton
├── CourseTable
│   └── CourseRow[]
│       ├── Cover
│       ├── Title
│       ├── Status
│       ├── Price
│       └── Actions
└── Pagination
```

#### 编辑课程 `/admin/courses/:id`
```
AdminCourseEdit.tsx
├── PageHeader
│   ├── BackButton
│   └── SaveButton
├── CourseForm
│   ├── TitleInput
│   ├── DescriptionInput
│   ├── CoverUpload
│   ├── PriceInput
│   ├── CategorySelect
│   └── StatusSwitch
└── ChapterManager
    ├── ChapterList (可拖拽排序)
    │   └── ChapterItem[]
    ├── AddChapterButton
    └── ChapterEditor (Modal/Drawer)
        ├── TitleInput
        ├── TypeSwitch
        ├── VideoUpload (type=video)
        ├── NovelEditor (type=article)
        └── PreviewSwitch
```

---

## 布局组件

### 公共布局
```
MainLayout.tsx
├── Navbar               - 导航栏
├── {children}           - 页面内容
└── Footer               - 页脚
```

### 用户中心布局
```
UserLayout.tsx
├── Navbar
├── UserSidebar          - 侧边导航
│   ├── LearningLink
│   ├── OrdersLink
│   └── SettingsLink
└── {children}
```

### 管理后台布局
```
AdminLayout.tsx
├── AdminSidebar         - 侧边导航
│   ├── DashboardLink
│   ├── CoursesLink
│   ├── OrdersLink
│   └── UsersLink
├── AdminHeader          - 顶部栏
│   ├── Breadcrumb
│   └── UserMenu
└── {children}
```

---

## 路由守卫

```typescript
// 需要登录
<ProtectedRoute>
  <UserLayout />
</ProtectedRoute>

// 需要 Admin 权限
<AdminRoute>
  <AdminLayout />
</AdminRoute>

// 需要购买
<PurchasedRoute courseId={id}>
  <Learn />
</PurchasedRoute>
```

---

## 组件目录结构

```
src/components/
├── ui/                  # shadcn/ui 原子组件
├── landing/             # 落地页组件
├── auth/                # 认证相关组件 (新增)
│   ├── LoginForm.tsx
│   ├── RegisterForm.tsx
│   └── OAuthButtons.tsx
├── course/              # 课程相关组件 (新增)
│   ├── CourseCard.tsx
│   ├── ChapterItem.tsx
│   └── VideoPlayer.tsx
├── user/                # 用户中心组件 (新增)
│   ├── CourseProgress.tsx
│   └── OrderItem.tsx
├── admin/               # 管理后台组件 (新增)
│   ├── AdminLayout.tsx
│   ├── AdminSidebar.tsx
│   ├── CourseForm.tsx
│   ├── ChapterManager.tsx
│   ├── CourseEditor.tsx
│   ├── VideoUpload.tsx
│   └── ImageUpload.tsx
├── Navbar.tsx
├── Footer.tsx
├── ProtectedRoute.tsx   # (新增)
├── AdminRoute.tsx       # (新增)
└── PurchasedRoute.tsx   # (新增)
```

---

[PROTOCOL]: 页面结构变更时更新此文档

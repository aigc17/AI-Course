# Phase 3: 支付闭环

> 状态: ⬜ 待开始 | 依赖: Phase 2 完成

## 3.1 支付接口对接

| 任务 | 状态 | 产出 |
|------|------|------|
| 选择支付服务商 | ⬜ 待做 | Stripe / 支付宝 / 微信 |
| 创建支付 Edge Function | ⬜ 待做 | `supabase/functions/create-payment/` |
| 创建支付回调 Edge Function | ⬜ 待做 | `supabase/functions/payment-webhook/` |
| 配置 Webhook 密钥 | ⬜ 待做 | Supabase Secrets |

### 验收标准
- [ ] 发起支付 → 跳转支付页面
- [ ] 支付成功 → Webhook 回调 → 订单状态更新

---

## 3.2 订单系统

| 任务 | 状态 | 产出 |
|------|------|------|
| 创建订单确认页 | ⬜ 待做 | `src/pages/Checkout.tsx` |
| 创建支付结果页 | ⬜ 待做 | `src/pages/PaymentResult.tsx` |
| 创建我的订单页 | ⬜ 待做 | `src/pages/user/Orders.tsx` |
| 订单详情组件 | ⬜ 待做 | `src/components/OrderDetail.tsx` |

### 验收标准
- [ ] 点击购买 → 显示订单确认页
- [ ] 支付成功 → 显示成功页面
- [ ] 我的订单 → 显示历史订单

---

## 3.3 购买权限控制

| 任务 | 状态 | 产出 |
|------|------|------|
| 创建 usePurchase Hook | ⬜ 待做 | `src/hooks/usePurchase.ts` |
| 创建 PurchasedRoute 组件 | ⬜ 待做 | `src/components/PurchasedRoute.tsx` |
| 课程详情页购买按钮 | ⬜ 待做 | 已购显示"开始学习" |
| 章节内容权限检查 | ⬜ 待做 | 未购只显示预览 |

### 验收标准
- [ ] 未购用户 → 课程详情显示"立即购买"
- [ ] 已购用户 → 课程详情显示"开始学习"
- [ ] 未购访问付费章节 → 提示购买

---

## 3.4 学习进度追踪

| 任务 | 状态 | 产出 |
|------|------|------|
| 创建 useProgress Hook | ⬜ 待做 | `src/hooks/useProgress.ts` |
| 视频播放进度保存 | ⬜ 待做 | 定时保存 last_position |
| 章节完成标记 | ⬜ 待做 | 视频播放完 / 文章滚动到底 |
| 课程进度显示 | ⬜ 待做 | 进度条 + 百分比 |
| 学习中心页面 | ⬜ 待做 | `src/pages/user/Learning.tsx` |

### 验收标准
- [ ] 观看视频 → 进度自动保存
- [ ] 重新打开 → 从上次位置继续
- [ ] 完成章节 → 显示完成标记
- [ ] 学习中心 → 显示所有课程进度

---

## 3.5 管理后台订单

| 任务 | 状态 | 产出 |
|------|------|------|
| 创建订单列表页 | ⬜ 待做 | `src/pages/admin/OrderList.tsx` |
| 订单筛选功能 | ⬜ 待做 | 状态 / 时间 / 课程 |
| 退款功能 | ⬜ 待做 | 调用支付服务商退款 API |
| 订单统计 | ⬜ 待做 | 销售额 / 订单数 |

### 验收标准
- [ ] 订单列表 → 显示所有订单
- [ ] 筛选 → 结果正确
- [ ] 退款 → 订单状态更新 + 用户权限撤销

---

## 相关文档

- [Phase 2: 课程管理](./phase-2-course.md) - 前置依赖
- [产品需求](./PRD.md) - 功能需求说明

---

[PROTOCOL]: 任务状态变更时更新此文档

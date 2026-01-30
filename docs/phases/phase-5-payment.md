# Phase 5: 支付闭环

> 状态: ⬜ 待开始 | 依赖: Phase 4 完成

## 目标

实现完整的商业闭环：购买、支付、学习。

---

## 5.1 支付接口

| 任务 | 状态 | 产出 |
|------|------|------|
| 选择支付服务商 | ⬜ 待做 | Stripe / 支付宝 / 微信 |
| 创建支付 Edge Function | ⬜ 待做 | `supabase/functions/create-payment/` |
| 创建 Webhook Edge Function | ⬜ 待做 | `supabase/functions/payment-webhook/` |

---

## 5.2 订单系统

| 任务 | 状态 | 产出 |
|------|------|------|
| 创建 orders 表 | ⬜ 待做 | SQL 已执行 |
| 创建订单确认页 | ⬜ 待做 | `src/pages/Checkout.tsx` |
| 创建支付结果页 | ⬜ 待做 | `src/pages/PaymentResult.tsx` |
| 创建我的订单页 | ⬜ 待做 | `src/pages/user/Orders.tsx` |

### 验收标准

- [ ] 点击购买 → 创建订单 → 跳转支付
- [ ] 支付成功 → 订单状态更新

---

## 5.3 购买权限

| 任务 | 状态 | 产出 |
|------|------|------|
| 创建 usePurchase Hook | ⬜ 待做 | `src/hooks/usePurchase.ts` |
| 创建 PurchasedRoute | ⬜ 待做 | `src/components/PurchasedRoute.tsx` |
| 课程详情购买按钮 | ⬜ 待做 | 已购显示"开始学习" |

### 验收标准

- [ ] 未购用户 → 显示"立即购买"
- [ ] 已购用户 → 显示"开始学习"

---

## 5.4 学习页面

| 任务 | 状态 | 产出 |
|------|------|------|
| 创建学习页面 | ⬜ 待做 | `src/pages/Learn.tsx` |
| 章节内容渲染 | ⬜ 待做 | 视频 / 图文 |
| 章节导航 | ⬜ 待做 | 上一节 / 下一节 |

### 验收标准

- [ ] 已购用户可访问完整内容
- [ ] 未购用户只能看免费预览

---

## 5.5 学习进度

| 任务 | 状态 | 产出 |
|------|------|------|
| 创建 progress 表 | ⬜ 待做 | SQL 已执行 |
| 创建 useProgress Hook | ⬜ 待做 | `src/hooks/useProgress.ts` |
| 视频进度保存 | ⬜ 待做 | 定时保存 |
| 章节完成标记 | ⬜ 待做 | 播放完成 |
| 学习中心页面 | ⬜ 待做 | `src/pages/user/Learning.tsx` |

### 验收标准

- [ ] 观看视频 → 进度自动保存
- [ ] 重新打开 → 从上次位置继续

---

## 5.6 后台订单管理

| 任务 | 状态 | 产出 |
|------|------|------|
| 创建订单列表页 | ⬜ 待做 | `src/pages/admin/OrderList.tsx` |
| 订单筛选 | ⬜ 待做 | 状态 / 时间 |
| 退款功能 | ⬜ 待做 | 调用支付 API |

### 验收标准

- [ ] 订单列表显示所有订单
- [ ] 可执行退款操作

---

## 相关文档

- [PRD.md](../planning/PRD.md) - 产品需求
- [API-SPEC.md](../planning/API-SPEC.md) - 接口规范

---

[PROTOCOL]: 任务状态变更时更新此文档

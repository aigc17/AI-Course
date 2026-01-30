# Phase 3: 用户认证

> 状态: ⬜ 待开始 | 依赖: Phase 2 完成

## 目标

补全用户认证系统，保护管理后台。

---

## 3.1 Supabase Auth 配置

| 任务 | 状态 | 产出 |
|------|------|------|
| 启用 Email 认证 | ⬜ 待做 | Supabase Dashboard |
| 配置 GitHub OAuth | ⬜ 待做 | GitHub OAuth App |
| 配置邮件模板 | ⬜ 待做 | Supabase Dashboard |

---

## 3.2 数据库补全

| 任务 | 状态 | 产出 |
|------|------|------|
| 创建 profiles 表 | ⬜ 待做 | SQL 已执行 |
| 创建用户触发器 | ⬜ 待做 | 自动创建 profile |
| 更新 RLS 策略 | ⬜ 待做 | 基于用户角色 |

---

## 3.3 前端认证

| 任务 | 状态 | 产出 |
|------|------|------|
| 创建 useAuth Hook | ⬜ 待做 | `src/hooks/useAuth.ts` |
| 创建登录页面 | ⬜ 待做 | `src/pages/auth/Login.tsx` |
| 创建注册页面 | ⬜ 待做 | `src/pages/auth/Register.tsx` |
| 创建 OAuth 回调页 | ⬜ 待做 | `src/pages/auth/Callback.tsx` |
| 配置认证路由 | ⬜ 待做 | `src/App.tsx` |

### 验收标准

- [ ] 邮箱注册 → 收到验证邮件 → 登录成功
- [ ] GitHub 登录 → 授权 → 登录成功

---

## 3.4 权限保护

| 任务 | 状态 | 产出 |
|------|------|------|
| 创建 ProtectedRoute | ⬜ 待做 | `src/components/ProtectedRoute.tsx` |
| 创建 AdminRoute | ⬜ 待做 | `src/components/AdminRoute.tsx` |
| Navbar 登录状态 | ⬜ 待做 | 显示用户头像/登录按钮 |
| 保护 /admin 路由 | ⬜ 待做 | 需要 Admin 角色 |

### 验收标准

- [ ] 未登录访问 /admin → 重定向到登录
- [ ] 非 Admin 访问 /admin → 显示无权限
- [ ] Navbar 显示当前用户

---

## 相关文档

- [TECH-SPEC.md](../planning/TECH-SPEC.md) - 认证设计
- [API-SPEC.md](../planning/API-SPEC.md) - 认证接口

---

[PROTOCOL]: 任务状态变更时更新此文档

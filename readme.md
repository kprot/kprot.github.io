# HSEN · 鴻森

> 我学 AI、造产品的笔记本。线上地址：https://lhsen.com

基于 VitePress 的个人博客，两个板块：

- **文章** (`docs/posts/`)：长文
- **碎念** (`docs/notes/`)：流水账式短记

## 本地开发

```bash
npm install
npm run docs:dev      # 本地预览，http://localhost:5173
npm run docs:build    # 生产构建（产物含 CNAME → lhsen.com）
npm run docs:preview  # 预览构建结果
```

> ⚠️ 起 dev server 时如果用后台方式，务必让它作为独立持久进程运行，
> 不要塞进"一次性命令 + &"里——否则命令一返回进程就被回收，
> 表现为端口像在监听、但请求挂死/拒绝。改了 `*.data.mts` 内容加载器后需重启 dev 才生效。

## 写文章

在 `docs/posts/` 下新建 `.md`，frontmatter：

```yaml
---
title: 文章标题
date: 2026-06-12
description: 列表里显示的摘要
---
```

碎念在 `docs/notes/` 下新建 `.md`，只需 `date`，正文即内容（无标题）。

## 草稿工作流

给任意文章/碎念加一行 `draft: true`：

```yaml
---
title: 还没写完
date: 2026-06-12
draft: true        # ← 草稿开关
---
```

效果：

| 环境 | 列表里 | 文章页 |
|------|--------|--------|
| 本地 `docs:dev` | 显示，标题旁有置灰「草稿」标签 | 顶部有置灰提示条 |
| 生产 `docs:build` / 线上 | **隐藏**（不进列表） | 标记不渲染 |

- 判定靠 `process.env.NODE_ENV`（VitePress 自动设置，无需手动配）。
- 定稿后删掉 `draft: true` 这行即发布。
- 注意：草稿页面在生产仍会被构建成一个**无链接的孤儿 URL**（列表/导航/搜索都不指向它，但知道地址能直达）。绝对保密的内容别用此法。

相关实现：
- `docs/.vitepress/theme/posts.data.mts` / `notes.data.mts` — 生产构建过滤 draft
- `docs/.vitepress/components/PostList.vue` — 置灰草稿标签
- `docs/.vitepress/components/DraftBanner.vue` — 文章页草稿提示条（仅 dev）

## 技术栈

VitePress · Vue 3 · Markdown · GitHub Pages

---
Copyright © 2026 HSEN

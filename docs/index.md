---
layout: home

hero:
  text: "Creative Builder"
  tagline: 我学 AI、造产品的笔记本。
  actions:
    - theme: brand
      text: 读博客
      link: /posts/
    - theme: alt
      text: 关于
      link: /about
---

<div class="home-content">

## 最新文章

<PostList :limit="5" />

[查看全部文章 →](/posts/)

</div>

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.home-content {
  max-width: 800px;
  margin: 2rem auto 4rem;
  padding: 0 24px;
}

.home-content h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 2rem 0 0.5rem;
  border-top: none;
  padding-top: 0;
}
</style>

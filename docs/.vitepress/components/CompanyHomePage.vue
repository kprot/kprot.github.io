<template>
  <div class="company-home">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">让 AI 触手可及</h1>
          <p class="hero-subtitle">CreB.ai 致力于打造创新的人工智能产品和服务，为个人和企业提供强大的 AI 解决方案</p>
          <div class="hero-buttons">
            <a href="/products/coming-soon" class="btn btn-primary">探索产品</a>
            <a href="/learn/" class="btn btn-secondary">开始学习</a>
          </div>
        </div>
      </div>
    </section>

    <!-- What We Do -->
    <section class="what-we-do">
      <div class="container">
        <h2 class="section-title">我们的业务</h2>
        <p class="section-subtitle">从产品开发到技术赋能，全方位的 AI 服务</p>
        
        <div class="business-grid">
          <div class="business-card">
            <div class="business-icon">🚀</div>
            <h3 class="business-title">AI 产品与服务</h3>
            <p class="business-desc">创新的 AI 应用解决方案，帮助企业和个人提升效率，释放创造力</p>
            <a href="/products/coming-soon" class="business-link">了解更多 →</a>
          </div>
          
          <div class="business-card">
            <div class="business-icon">📚</div>
            <h3 class="business-title">AI 教育与培训</h3>
            <p class="business-desc">系统化的 AI 学习资源，从基础到实战，助力技术人才成长</p>
            <a href="/learn/" class="business-link">开始学习 →</a>
          </div>
          
          <div class="business-card">
            <div class="business-icon">🛠️</div>
            <h3 class="business-title">AI 工具与资源</h3>
            <p class="business-desc">精选 30+ 主流 AI 工具，提供详细指南和最佳实践</p>
            <a href="/tools/ai-tools-directory" class="business-link">探索工具 →</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="features-section">
      <div class="container">
        <h2 class="section-title">为什么选择 CreB.ai</h2>
        
        <div class="features-grid">
          <div class="feature-item">
            <div class="feature-icon">💡</div>
            <h3 class="feature-title">创新驱动</h3>
            <p class="feature-desc">紧跟 AI 技术前沿，持续创新产品和服务</p>
          </div>
          
          <div class="feature-item">
            <div class="feature-icon">🎯</div>
            <h3 class="feature-title">专业可靠</h3>
            <p class="feature-desc">专业的技术团队，提供稳定可靠的解决方案</p>
          </div>
          
          <div class="feature-item">
            <div class="feature-icon">🤝</div>
            <h3 class="feature-title">用户至上</h3>
            <p class="feature-desc">以用户需求为中心，打造易用高效的产品</p>
          </div>
          
          <div class="feature-item">
            <div class="feature-icon">🌐</div>
            <h3 class="feature-title">开放共享</h3>
            <p class="feature-desc">分享知识和资源，推动 AI 技术普及</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-number">30+</div>
            <div class="stat-label">AI 工具收录</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">100+</div>
            <div class="stat-label">代码示例</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">5</div>
            <div class="stat-label">学习路径</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">持续</div>
            <div class="stat-label">更新迭代</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Latest News -->
    <section class="news-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">AI 前沿动态</h2>
          <a href="/news/index" class="view-all">查看全部 →</a>
        </div>
        
        <div class="news-grid">
          <a v-for="item in latestNews" :key="item.id" :href="item.link" class="news-card">
            <div class="news-category">{{ item.category }}</div>
            <h3 class="news-title">{{ item.title }}</h3>
            <p class="news-desc">{{ item.description }}</p>
            <div class="news-date">{{ item.date }}</div>
          </a>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <div class="container">
        <h2 class="cta-title">准备好开始了吗？</h2>
        <p class="cta-desc">探索我们的产品和服务，或从学习 AI 开始</p>
        <div class="cta-buttons">
          <a href="/products/coming-soon" class="btn btn-primary btn-large">探索产品</a>
          <a href="/learn/" class="btn btn-secondary btn-large">开始学习</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const latestNews = [
  {
    id: 1,
    title: 'fal.ai - 专业的生成式 AI 推理平台',
    description: 'fal.ai 提供超过 600 个生产就绪的 AI 模型，推理速度比传统方案快 4-10 倍',
    category: '新工具',
    date: '2026-02-11',
    link: '/news/fal-ai-platform'
  },
  {
    id: 2,
    title: 'Sora - OpenAI 的文本生成视频模型',
    description: 'OpenAI 发布革命性的文本生成视频模型，能够生成长达 60 秒的高质量视频',
    category: '新模型',
    date: '2026-02-10',
    link: '/news/sora-video-generation'
  },
  {
    id: 3,
    title: 'Claude 3.5 Sonnet 发布',
    description: 'Anthropic 发布最新模型，在编码、推理和视觉理解方面都有显著提升',
    category: '新模型',
    date: '2026-02-08',
    link: 'https://www.anthropic.com/claude'
  }
]
</script>

<style scoped>
.company-home {
  width: 100%;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Hero Section */
.hero-section {
  padding: 8rem 2rem 6rem;
  background: linear-gradient(135deg, var(--vp-c-brand-soft) 0%, var(--vp-c-bg-soft) 100%);
  text-align: center;
}

.hero-title {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--vp-c-text-1);
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: var(--vp-c-text-2);
  max-width: 800px;
  margin: 0 auto 3rem;
  line-height: 1.6;
}

.hero-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s;
  display: inline-block;
}

.btn-primary {
  background: var(--vp-c-brand-1);
  color: white;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.btn-primary:hover {
  background: var(--vp-c-brand-2);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.btn-secondary {
  background: transparent;
  color: var(--vp-c-brand-1);
  border: 2px solid var(--vp-c-brand-1);
}

.btn-secondary:hover {
  background: var(--vp-c-brand-soft);
  transform: translateY(-2px);
}

.btn-large {
  padding: 1.2rem 3rem;
  font-size: 1.2rem;
}

/* What We Do */
.what-we-do {
  padding: 6rem 2rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.section-subtitle {
  font-size: 1.2rem;
  color: var(--vp-c-text-2);
  text-align: center;
  margin-bottom: 4rem;
}

.business-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 3rem;
}

.business-card {
  padding: 3rem;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 20px;
  transition: all 0.3s;
  text-align: center;
}

.business-card:hover {
  transform: translateY(-8px);
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.business-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
}

.business-title {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.business-desc {
  font-size: 1.1rem;
  color: var(--vp-c-text-2);
  line-height: 1.7;
  margin-bottom: 2rem;
}

.business-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s;
}

.business-link:hover {
  transform: translateX(4px);
}

/* Features */
.features-section {
  padding: 6rem 2rem;
  background: var(--vp-c-bg-soft);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
}

.feature-item {
  text-align: center;
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  color: var(--vp-c-text-1);
}

.feature-desc {
  font-size: 1rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

/* Stats */
.stats-section {
  padding: 6rem 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 3rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 3.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: block;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1.1rem;
  color: var(--vp-c-text-2);
}

/* News */
.news-section {
  padding: 6rem 2rem;
  background: var(--vp-c-bg-soft);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
}

.view-all {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s;
}

.view-all:hover {
  transform: translateX(4px);
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.news-card {
  padding: 2rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s;
  display: block;
}

.news-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border-color: var(--vp-c-brand-1);
}

.news-category {
  display: inline-block;
  padding: 0.3rem 0.8rem;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.news-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  color: var(--vp-c-text-1);
}

.news-desc {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.news-date {
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
}

/* CTA */
.cta-section {
  padding: 6rem 2rem;
  text-align: center;
}

.cta-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.cta-desc {
  font-size: 1.3rem;
  color: var(--vp-c-text-2);
  margin-bottom: 3rem;
}

.cta-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .business-grid,
  .news-grid {
    grid-template-columns: 1fr;
  }
  
  .section-header {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>

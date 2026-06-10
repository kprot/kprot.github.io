<template>
  <div class="coming-soon">
    <h1 class="title">我正在造的东西</h1>
    <p class="description">
      我在用 AI 做一些真实的产品和小工具，过程、踩坑与思考都会摊开来写——build in public。
      <br>
      还在打磨中，很快和你见面。
    </p>

    <div class="features">
      <div class="feature-item">
        <div class="feature-icon">🤖</div>
        <h3 class="feature-title">AI 应用</h3>
        <p class="feature-desc">智能化的应用解决方案</p>
      </div>
      
      <div class="feature-item">
        <div class="feature-icon">🛠️</div>
        <h3 class="feature-title">开发工具</h3>
        <p class="feature-desc">提升开发效率的工具集</p>
      </div>
    </div>

    <div class="cta-section">
      <h2 class="cta-title">在此之前</h2>
      <p class="cta-desc">可以先逛逛我的 AI 学习笔记和实测过的工具</p>
      <a href="/learn/" class="cta-button">进来逛逛</a>
    </div>
  </div>
</template>

<style scoped>
.coming-soon {
  max-width: 800px;
  margin: 4rem auto;
  text-align: center;
  padding: 4rem 2rem;
}

.icon {
  font-size: 6rem;
  margin-bottom: 2rem;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--vp-c-text-1);
}

.description {
  font-size: 1.2rem;
  color: var(--vp-c-text-2);
  line-height: 1.8;
  margin-bottom: 3rem;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.feature-item {
  padding: 2rem;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.3s;
}

.feature-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border-color: var(--vp-c-brand-1);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.feature-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.feature-desc {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.cta-section {
  margin-top: 4rem;
  padding: 3rem;
  background: linear-gradient(135deg, var(--vp-c-brand-soft) 0%, var(--vp-c-bg-soft) 100%);
  border-radius: 16px;
}

.cta-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.cta-desc {
  font-size: 1rem;
  color: var(--vp-c-text-2);
  margin-bottom: 2rem;
}

.cta-button {
  display: inline-block;
  padding: 1rem 2rem;
  background: var(--vp-c-brand-1);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s;
}

.cta-button:hover {
  background: var(--vp-c-brand-2);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }
  
  .description {
    font-size: 1.1rem;
  }
  
  .features {
    grid-template-columns: 1fr;
  }
}
</style>

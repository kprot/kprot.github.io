<template>
  <footer class="custom-footer">
    <div class="footer-container">
      <div class="footer-grid">
        <!-- 公司信息 -->
        <div class="footer-column">
          <div class="footer-logo-wrapper">
            <img src="/logo.png" alt="CreB.ai" class="footer-logo" />
          </div>
          <h4 class="footer-brand">CreB.ai</h4>
          <p class="footer-tagline">让 AI 触手可及</p>
          <p class="footer-desc">创新的人工智能产品与服务</p>
        </div>
        
        <!-- 产品与服务 -->
        <div class="footer-column">
          <h4>产品与服务</h4>
          <ul>
            <li><a href="/products/coming-soon">即将推出</a></li>
          </ul>
        </div>
        
        <!-- 资源中心 -->
        <div class="footer-column">
          <h4>资源中心</h4>
          <ul>
            <li><a href="/learn/">AI 学习</a></li>
            <li><a href="/tools/ai-tools-directory">AI 工具</a></li>
            <li><a href="/news/index">AI 前沿</a></li>
          </ul>
        </div>
        
        <!-- 关于 -->
        <div class="footer-column">
          <h4>关于</h4>
          <ul>
            <li><a href="/about">关于我们</a></li>
            <li><a href="https://creb.ai" target="_blank">官方网站</a></li>
          </ul>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p class="footer-copyright">Copyright © 2026 CreB.ai</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.custom-footer {
  background: var(--vp-c-bg-soft);
  border-top: 1px solid var(--vp-c-divider);
  padding: 4rem 2rem 2rem;
  margin-top: 4rem;
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.footer-column h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 1rem;
}

.footer-logo-wrapper {
  margin-bottom: 1rem;
}

.footer-logo {
  width: 80px;
  height: 80px;
  object-fit: contain;
}

.footer-brand {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.footer-tagline {
  font-size: 1rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.footer-desc {
  font-size: 0.9rem;
  color: var(--vp-c-text-3);
  line-height: 1.5;
}

.footer-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-column li {
  margin-bottom: 0.75rem;
}

.footer-column a {
  color: var(--vp-c-text-2);
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.3s;
}

.footer-column a:hover {
  color: var(--vp-c-brand-1);
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid var(--vp-c-divider);
}

.footer-copyright {
  color: var(--vp-c-text-3);
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>

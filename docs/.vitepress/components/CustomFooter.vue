<template>
  <footer class="custom-footer">
    <div class="footer-container">
      <div class="footer-grid">
        <!-- 关于 -->
        <div class="footer-column">
          <h4>关于</h4>
          <ul>
            <li><a href="/about">关于我们</a></li>
            <li><a href="https://creb.ai" target="_blank">官方网站</a></li>
          </ul>
        </div>
        
        <!-- 学习资源 -->
        <div class="footer-column">
          <h4>学习资源</h4>
          <ul>
            <li><a href="/basics/what-is-ai">AI 基础</a></li>
            <li><a href="/machine-learning/introduction">机器学习</a></li>
            <li><a href="/deep-learning/neural-networks">深度学习</a></li>
            <li><a href="/llm/introduction">大语言模型</a></li>
          </ul>
        </div>
        
        <!-- AI 工具 -->
        <div class="footer-column">
          <h4>AI 工具</h4>
          <ul>
            <li><a href="/tools/ai-tools-directory">工具大全</a></li>
            <li><a href="/tools/chatgpt">ChatGPT</a></li>
            <li><a href="/tools/midjourney">Midjourney</a></li>
            <li><a href="/tools/coding-assistants">编程助手</a></li>
          </ul>
        </div>
        
        <!-- 实战项目 -->
        <div class="footer-column">
          <h4>实战项目</h4>
          <ul>
            <li><a href="/projects/overview">项目概览</a></li>
            <li><a href="/projects/chatbot">聊天机器人</a></li>
            <li><a href="/projects/image-classifier">图像分类器</a></li>
            <li><a href="/projects/text-generation">文本生成</a></li>
          </ul>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p class="footer-message">系统化的人工智能学习平台</p>
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
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;
}

.footer-column h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 1rem;
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

.footer-message {
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
}

.footer-copyright {
  color: var(--vp-c-text-3);
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
}

@media (max-width: 480px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }
}
</style>

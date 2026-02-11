<template>
  <div class="home-page">
    <!-- Trust Section -->
    <section class="trust-section">
      <div class="container">
        <p class="trust-title">值得信赖的学习平台</p>
        <div class="trust-stats">
          <div class="trust-stat">
            <span class="trust-number">30+</span>
            <span class="trust-label">教程章节</span>
          </div>
          <div class="trust-stat">
            <span class="trust-number">100+</span>
            <span class="trust-label">代码示例</span>
          </div>
          <div class="trust-stat">
            <span class="trust-number">30+</span>
            <span class="trust-label">AI 工具</span>
          </div>
          <div class="trust-stat">
            <span class="trust-number">持续</span>
            <span class="trust-label">更新迭代</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Value Proposition -->
    <section class="value-section">
      <div class="container">
        <h2 class="value-title">完整的 AI 学习体系</h2>
        <p class="value-subtitle">从基础理论到实战应用，从经典算法到前沿技术，系统化的课程设计帮助你快速掌握人工智能核心技能</p>
      </div>
    </section>

    <!-- Platform Cards -->
    <section class="platforms-section">
      <div class="container">
        <div class="platforms-grid">
          <div class="platform-card">
            <span class="platform-icon">📚</span>
            <h3 class="platform-title">学习平台</h3>
            <p class="platform-desc">系统化的课程体系，涵盖 AI 基础、机器学习、深度学习和大语言模型等核心领域</p>
            <ul class="platform-features">
              <li>AI 基础理论与数学原理</li>
              <li>机器学习算法详解</li>
              <li>深度学习与神经网络</li>
              <li>大语言模型与提示工程</li>
              <li>100+ 可运行代码示例</li>
            </ul>
            <a href="/learn/" class="platform-link">
              开始学习 →
            </a>
          </div>
          
          <div class="platform-card">
            <span class="platform-icon">🛠️</span>
            <h3 class="platform-title">工具平台</h3>
            <p class="platform-desc">收录 30+ 主流 AI 工具，提供详细使用指南和最佳实践，助你高效完成各类任务</p>
            <ul class="platform-features">
              <li>ChatGPT、Claude 等对话助手</li>
              <li>Midjourney、Stable Diffusion 图像生成</li>
              <li>GitHub Copilot 等编程助手</li>
              <li>视频、音频、写作等多类工具</li>
              <li>详细教程与使用技巧</li>
            </ul>
            <a href="/tools/ai-tools-directory" class="platform-link">
              探索工具 →
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Tools Showcase -->
    <section class="tools-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">热门 AI 工具</h2>
          <p class="section-subtitle">精选最受欢迎的人工智能工具</p>
        </div>
        
        <div class="tools-grid">
          <a v-for="tool in featuredTools" :key="tool.name" :href="tool.link" :target="tool.external ? '_blank' : '_self'" class="tool-card">
            <span class="tool-icon">{{ tool.icon }}</span>
            <div class="tool-name">{{ tool.name }}</div>
            <div class="tool-category">{{ tool.category }}</div>
          </a>
        </div>
        
        <div class="tools-cta">
          <a href="/tools/ai-tools-directory" class="tools-cta-link">
            查看全部 30+ 工具 →
          </a>
        </div>
      </div>
    </section>

    <!-- Timeline -->
    <section class="timeline-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">学习路线图</h2>
          <p class="section-subtitle">循序渐进，从入门到精通</p>
        </div>
        
        <div class="timeline">
          <div v-for="(stage, index) in learningStages" :key="index" class="timeline-item">
            <div class="timeline-content">
              <div class="timeline-date">{{ stage.phase }}</div>
              <h3 class="timeline-title">{{ stage.title }}</h3>
              <p class="timeline-desc">{{ stage.description }}</p>
            </div>
            <div class="timeline-dot"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="final-cta">
      <div class="container">
        <h2 class="final-cta-title">开始你的 AI 学习之旅</h2>
        <p class="final-cta-desc">系统化的课程体系，丰富的实战项目，前沿的 AI 工具，助你从入门到精通</p>
        <div class="cta-buttons">
          <a href="/learn/" class="cta-button primary">
            立即开始学习 →
          </a>
          <a href="/tools/ai-tools-directory" class="cta-button secondary">
            探索 AI 工具
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const featuredTools = [
  { name: 'ChatGPT', icon: '🤖', category: '对话助手', link: '/tools/chatgpt', external: false },
  { name: 'Midjourney', icon: '🎨', category: '图像生成', link: '/tools/midjourney', external: false },
  { name: 'Stable Diffusion', icon: '🖼️', category: '图像生成', link: '/tools/stable-diffusion', external: false },
  { name: 'GitHub Copilot', icon: '💻', category: '编程助手', link: '/tools/coding-assistants', external: false },
  { name: 'Claude', icon: '🎭', category: '对话助手', link: 'https://claude.ai', external: true },
  { name: 'Gemini', icon: '✨', category: '对话助手', link: 'https://gemini.google.com', external: true },
  { name: 'Runway', icon: '🎬', category: '视频制作', link: 'https://runwayml.com', external: true },
  { name: 'ElevenLabs', icon: '🎙️', category: '语音合成', link: 'https://elevenlabs.io', external: true }
]

const learningStages = [
  {
    phase: '第一阶段',
    title: 'AI 基础入门',
    description: '了解人工智能的基本概念、发展历史和应用场景，掌握必要的数学基础知识'
  },
  {
    phase: '第二阶段',
    title: '机器学习',
    description: '学习监督学习、无监督学习和强化学习，掌握常用算法和实现方法'
  },
  {
    phase: '第三阶段',
    title: '深度学习',
    description: '深入理解神经网络、CNN、RNN 和 Transformer 架构，掌握模型训练技巧'
  },
  {
    phase: '第四阶段',
    title: '大语言模型与应用',
    description: '学习 GPT、Claude 等大语言模型，掌握提示工程、RAG 和微调技术'
  },
  {
    phase: '第五阶段',
    title: '实战项目',
    description: '通过完整的项目案例，将理论知识转化为实际应用能力'
  }
]
</script>

<style scoped>
.home-page {
  width: 100%;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Trust Section */
.trust-section {
  text-align: center;
  padding: 4rem 2rem 2rem;
  background: var(--vp-c-bg-soft);
}

.trust-title {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--vp-c-text-2);
  margin-bottom: 2rem;
  font-weight: 600;
}

.trust-stats {
  display: flex;
  justify-content: center;
  gap: 4rem;
  flex-wrap: wrap;
}

.trust-stat {
  text-align: center;
}

.trust-number {
  font-size: 3rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: block;
  line-height: 1.2;
}

.trust-label {
  font-size: 1rem;
  color: var(--vp-c-text-2);
  margin-top: 0.5rem;
}

/* Value Section */
.value-section {
  padding: 6rem 2rem;
  text-align: center;
}

.value-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  color: var(--vp-c-text-1);
}

.value-subtitle {
  font-size: 1.3rem;
  color: var(--vp-c-text-2);
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Platform Cards */
.platforms-section {
  padding: 2rem 0 6rem;
}

.platforms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 3rem;
}

.platform-card {
  padding: 3rem;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 24px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.platform-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transform: scaleX(0);
  transition: transform 0.4s;
}

.platform-card:hover::before {
  transform: scaleX(1);
}

.platform-card:hover {
  transform: translateY(-8px);
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.platform-icon {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  display: block;
}

.platform-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.platform-desc {
  font-size: 1.1rem;
  color: var(--vp-c-text-2);
  line-height: 1.7;
  margin-bottom: 2rem;
}

.platform-features {
  list-style: none;
  padding: 0;
  margin: 2rem 0;
  text-align: left;
}

.platform-features li {
  padding: 0.8rem 0;
  color: var(--vp-c-text-2);
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.platform-features li::before {
  content: '✓';
  color: var(--vp-c-brand-1);
  font-weight: bold;
  font-size: 1.2rem;
}

.platform-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: var(--vp-c-brand-1);
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s;
}

.platform-link:hover {
  background: var(--vp-c-brand-2);
  transform: translateX(4px);
}

/* Tools Section */
.tools-section {
  padding: 6rem 2rem;
  background: var(--vp-c-bg-soft);
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.section-subtitle {
  font-size: 1.2rem;
  color: var(--vp-c-text-2);
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.tool-card {
  padding: 2rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  text-align: center;
  transition: all 0.3s;
  text-decoration: none;
  display: block;
}

.tool-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
  border-color: var(--vp-c-brand-1);
}

.tool-icon {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  display: block;
}

.tool-name {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.tool-category {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
}

.tools-cta {
  text-align: center;
  margin-top: 3rem;
}

.tools-cta-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2.5rem;
  background: var(--vp-c-brand-1);
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s;
}

.tools-cta-link:hover {
  background: var(--vp-c-brand-2);
  transform: scale(1.05);
}

/* Timeline Section */
.timeline-section {
  padding: 6rem 2rem;
}

.timeline {
  max-width: 1000px;
  margin: 4rem auto 0;
  position: relative;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--vp-c-divider);
  transform: translateX(-50%);
}

.timeline-item {
  display: flex;
  gap: 3rem;
  margin-bottom: 4rem;
  position: relative;
}

.timeline-item:nth-child(even) {
  flex-direction: row-reverse;
}

.timeline-content {
  flex: 1;
  padding: 2rem;
  background: var(--vp-c-bg-soft);
  border-radius: 16px;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.3s;
}

.timeline-content:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border-color: var(--vp-c-brand-1);
}

.timeline-date {
  font-size: 0.9rem;
  color: var(--vp-c-brand-1);
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.timeline-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  color: var(--vp-c-text-1);
}

.timeline-desc {
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.timeline-dot {
  position: absolute;
  left: 50%;
  top: 2rem;
  width: 16px;
  height: 16px;
  background: var(--vp-c-brand-1);
  border: 4px solid var(--vp-c-bg);
  border-radius: 50%;
  transform: translateX(-50%);
  z-index: 1;
}

/* Final CTA */
.final-cta {
  padding: 6rem 2rem;
  text-align: center;
  background: linear-gradient(135deg, var(--vp-c-brand-soft) 0%, var(--vp-c-bg-soft) 100%);
}

.final-cta-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--vp-c-text-1);
}

.final-cta-desc {
  font-size: 1.3rem;
  color: var(--vp-c-text-2);
  max-width: 700px;
  margin: 0 auto 3rem;
  line-height: 1.6;
}

.cta-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-button {
  padding: 1.2rem 3rem;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.cta-button.primary {
  background: var(--vp-c-brand-1);
  color: white;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.cta-button.primary:hover {
  background: var(--vp-c-brand-2);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.cta-button.secondary {
  background: transparent;
  color: var(--vp-c-brand-1);
  border: 2px solid var(--vp-c-brand-1);
}

.cta-button.secondary:hover {
  background: var(--vp-c-brand-soft);
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 768px) {
  .value-title {
    font-size: 2rem;
  }
  
  .value-subtitle {
    font-size: 1.1rem;
  }
  
  .platforms-grid {
    grid-template-columns: 1fr;
  }
  
  .tools-grid {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  }
  
  .timeline::before {
    left: 20px;
  }
  
  .timeline-item,
  .timeline-item:nth-child(even) {
    flex-direction: row;
    padding-left: 60px;
  }
  
  .timeline-dot {
    left: 20px;
  }
  
  .final-cta-title {
    font-size: 2rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
}
</style>

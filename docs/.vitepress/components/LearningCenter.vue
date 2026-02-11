<template>
  <div class="learning-center">
    <!-- Hero Section -->
    <div class="hero-section">
      <h1 class="hero-title">AI 学习中心</h1>
      <p class="hero-subtitle">系统化的人工智能学习路径，从基础到实战，助你成为 AI 领域的专业人才</p>
      
      <div class="hero-stats">
        <div class="stat-item">
          <span class="stat-number">6</span>
          <span class="stat-label">学习路径</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">30+</span>
          <span class="stat-label">教程章节</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">100+</span>
          <span class="stat-label">代码示例</span>
        </div>
      </div>
    </div>

    <!-- Learning Paths -->
    <div class="paths-grid">
      <div 
        v-for="path in learningPaths" 
        :key="path.id" 
        class="path-card"
        :style="{ '--card-color': path.color }"
      >
        <div class="path-header">
          <span class="path-icon">{{ path.icon }}</span>
          <h3 class="path-title">{{ path.title }}</h3>
        </div>
        
        <div class="path-meta">
          <span class="meta-badge">{{ path.level }}</span>
          <span class="meta-badge">{{ path.duration }}</span>
        </div>
        
        <p class="path-description">{{ path.description }}</p>
        
        <div class="path-topics">
          <span v-for="topic in path.topics" :key="topic" class="topic-tag">
            {{ topic }}
          </span>
        </div>
        
        <a :href="path.link" class="path-link">
          开始学习 →
        </a>
      </div>
    </div>

    <!-- Features -->
    <div class="features-section">
      <h2 class="section-title">为什么选择我们的课程</h2>
      
      <div class="features-grid">
        <div class="feature-item">
          <div class="feature-icon">📖</div>
          <h3 class="feature-title">系统化课程</h3>
          <p class="feature-desc">完整的知识体系，循序渐进的学习路径</p>
        </div>
        
        <div class="feature-item">
          <div class="feature-icon">💻</div>
          <h3 class="feature-title">实战导向</h3>
          <p class="feature-desc">100+ 可运行代码示例，理论与实践结合</p>
        </div>
        
        <div class="feature-item">
          <div class="feature-icon">🎯</div>
          <h3 class="feature-title">项目驱动</h3>
          <p class="feature-desc">完整的实战项目，掌握实际应用能力</p>
        </div>
        
        <div class="feature-item">
          <div class="feature-icon">🔄</div>
          <h3 class="feature-title">持续更新</h3>
          <p class="feature-desc">紧跟技术发展，及时更新最新内容</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const learningPaths = [
  {
    id: 'basics',
    icon: '🎓',
    title: 'AI 基础入门',
    description: '从零开始学习人工智能的基本概念、发展历史和应用场景',
    level: '入门',
    duration: '2-3 周',
    topics: ['AI 概念', '发展历史', '应用场景', '数学基础'],
    link: '/basics/what-is-ai',
    color: '#667eea'
  },
  {
    id: 'ml',
    icon: '🤖',
    title: '机器学习',
    description: '掌握监督学习、无监督学习和强化学习的核心算法',
    level: '进阶',
    duration: '4-6 周',
    topics: ['监督学习', '无监督学习', '强化学习', '常用算法'],
    link: '/machine-learning/introduction',
    color: '#f093fb'
  },
  {
    id: 'dl',
    icon: '🧠',
    title: '深度学习',
    description: '深入理解神经网络、CNN、RNN 和 Transformer 架构',
    level: '进阶',
    duration: '6-8 周',
    topics: ['神经网络', 'CNN', 'RNN', 'Transformer'],
    link: '/deep-learning/neural-networks',
    color: '#4facfe'
  },
  {
    id: 'llm',
    icon: '💬',
    title: '大语言模型',
    description: '学习 GPT、Claude 等大语言模型，掌握提示工程和微调技术',
    level: '高级',
    duration: '4-6 周',
    topics: ['LLM 原理', '提示工程', 'RAG', '微调技术'],
    link: '/llm/introduction',
    color: '#a8edea'
  },
  {
    id: 'ollama',
    icon: '🦙',
    title: 'Ollama 实战',
    description: '学习使用 Ollama 在本地运行大语言模型，深入理解其架构设计',
    level: '实战',
    duration: '2-3 周',
    topics: ['本地部署', 'API 使用', '架构设计', '性能优化'],
    link: '/ollama/',
    color: '#43e97b'
  },
  {
    id: 'projects',
    icon: '💼',
    title: '实战项目',
    description: '通过完整的项目案例，将理论知识转化为实际应用能力',
    level: '实战',
    duration: '持续学习',
    topics: ['图像分类', '聊天机器人', '文本生成', '推荐系统'],
    link: '/projects/overview',
    color: '#fed6e3'
  }
]
</script>

<style scoped>
.learning-center {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.hero-section {
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, var(--vp-c-brand-soft) 0%, var(--vp-c-bg-soft) 100%);
  border-radius: 16px;
  margin-bottom: 4rem;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.hero-subtitle {
  font-size: 1.3rem;
  color: var(--vp-c-text-2);
  max-width: 700px;
  margin: 0 auto 2rem;
  line-height: 1.6;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  display: block;
}

.stat-label {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  margin-top: 0.5rem;
}

.paths-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.path-card {
  padding: 2.5rem;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  border-radius: 16px;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.path-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--card-color);
  transform: scaleX(0);
  transition: transform 0.3s;
}

.path-card:hover::before {
  transform: scaleX(1);
}

.path-card:hover {
  transform: translateY(-8px);
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.path-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.path-icon {
  font-size: 3rem;
}

.path-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0;
}

.path-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.meta-badge {
  padding: 0.3rem 0.8rem;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
}

.path-description {
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.path-topics {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.topic-tag {
  padding: 0.3rem 0.7rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

.path-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background: var(--vp-c-brand-1);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s;
}

.path-link:hover {
  background: var(--vp-c-brand-2);
  transform: translateX(4px);
}

.features-section {
  padding: 3rem 2rem;
  background: var(--vp-c-bg-soft);
  border-radius: 16px;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: var(--vp-c-text-1);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-item {
  text-align: center;
  padding: 1.5rem;
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
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .paths-grid {
    grid-template-columns: 1fr;
  }
}
</style>

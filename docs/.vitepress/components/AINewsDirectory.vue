<template>
  <div class="ai-news-directory">
    <!-- 分类筛选 -->
    <div class="filter-section">
      <div class="categories">
        <button 
          v-for="cat in categories" 
          :key="cat.id"
          :class="['category-btn', { active: selectedCategory === cat.id }]"
          @click="selectedCategory = cat.id"
        >
          {{ cat.icon }} {{ cat.name }}
        </button>
      </div>
    </div>
    
    <!-- 新闻列表 -->
    <div class="news-grid">
      <article v-for="item in filteredNews" :key="item.id" class="news-card">
        <div class="news-header">
          <span class="news-category">{{ getCategoryName(item.category) }}</span>
          <span class="news-date">{{ item.date }}</span>
        </div>
        
        <h3 class="news-title">
          <a :href="item.link" :target="item.external ? '_blank' : '_self'">
            {{ item.title }}
          </a>
        </h3>
        
        <p class="news-description">{{ item.description }}</p>
        
        <div class="news-tags">
          <span v-for="tag in item.tags" :key="tag" class="tag">
            {{ tag }}
          </span>
        </div>
        
        <a :href="item.link" :target="item.external ? '_blank' : '_self'" class="read-more">
          阅读更多 →
        </a>
      </article>
    </div>
    
    <!-- 空状态 -->
    <div v-if="filteredNews.length === 0" class="empty-state">
      <p>暂无相关内容</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedCategory = ref('all')

const categories = [
  { id: 'all', name: '全部', icon: '📰' },
  { id: 'tool', name: '新工具', icon: '🛠️' },
  { id: 'model', name: '新模型', icon: '🤖' },
  { id: 'concept', name: '新概念', icon: '💡' },
  { id: 'website', name: '新网站', icon: '🌐' },
  { id: 'update', name: '重大更新', icon: '🚀' }
]

// 示例新闻数据 - 实际使用时可以从 API 或文件中加载
const newsItems = [
  {
    id: 1,
    title: 'Ollama 源代码结构与架构设计深度解析',
    description: '深入了解 Ollama 的核心架构、技术栈和设计理念，掌握本地 LLM 运行时系统的实现原理。',
    category: 'concept',
    date: '2026-02-11',
    tags: ['Ollama', '架构设计', 'Go语言'],
    link: '/ollama/architecture',
    external: false
  },
  {
    id: 2,
    title: 'fal.ai - 专业的生成式 AI 推理平台',
    description: 'fal.ai 提供超过 600 个生产就绪的 AI 模型，推理速度比传统方案快 4-10 倍，支持图像、视频、音频和 3D 生成。',
    category: 'tool',
    date: '2026-02-11',
    tags: ['AI平台', 'API服务', '图像生成'],
    link: '/news/fal-ai-platform',
    external: false
  },
  {
    id: 3,
    title: 'Sora - OpenAI 的文本生成视频模型',
    description: 'OpenAI 发布革命性的文本生成视频模型 Sora，能够根据文本描述生成长达 60 秒的高质量视频内容。',
    category: 'model',
    date: '2026-02-10',
    tags: ['视频生成', 'OpenAI', '多模态'],
    link: '/news/sora-video-generation',
    external: false
  },
  {
    id: 4,
    title: 'Claude 3.5 Sonnet - Anthropic 最新模型',
    description: 'Anthropic 发布 Claude 3.5 Sonnet，在编码、推理和视觉理解方面都有显著提升，同时保持了出色的安全性。',
    category: 'model',
    date: '2026-02-08',
    tags: ['大语言模型', 'Anthropic', '编程'],
    link: 'https://www.anthropic.com/claude',
    external: true
  },
  {
    id: 5,
    title: 'Perplexity Pro - AI 搜索引擎升级',
    description: 'Perplexity 推出 Pro 版本，提供更准确的搜索结果、更深入的分析和无限次的 Copilot 使用。',
    category: 'update',
    date: '2026-02-05',
    tags: ['搜索', 'AI助手', '订阅服务'],
    link: 'https://www.perplexity.ai',
    external: true
  },
  {
    id: 6,
    title: 'RAG (检索增强生成) 技术详解',
    description: '深入了解 RAG 技术如何结合检索系统和生成模型，为 LLM 提供最新、准确的外部知识。',
    category: 'concept',
    date: '2026-02-03',
    tags: ['RAG', '技术原理', 'LLM'],
    link: '/llm/rag',
    external: false
  },
  {
    id: 7,
    title: 'Cursor - AI 原生代码编辑器',
    description: 'Cursor 是一款基于 AI 的代码编辑器，提供智能代码补全、对话式编程和代码重构功能。',
    category: 'tool',
    date: '2026-02-01',
    tags: ['编程工具', '代码编辑器', 'AI辅助'],
    link: 'https://cursor.sh',
    external: true
  },
  {
    id: 8,
    title: 'Hugging Face Spaces - AI 应用托管平台',
    description: 'Hugging Face Spaces 让你可以轻松部署和分享机器学习应用，支持 Gradio 和 Streamlit。',
    category: 'website',
    date: '2026-01-28',
    tags: ['部署', '开源', '社区'],
    link: 'https://huggingface.co/spaces',
    external: true
  },
  {
    id: 9,
    title: 'Gemini 1.5 Pro - Google 的长上下文模型',
    description: 'Google 发布 Gemini 1.5 Pro，支持高达 100 万 token 的上下文窗口，可以处理整本书籍或数小时的视频。',
    category: 'model',
    date: '2026-01-25',
    tags: ['Google', '长上下文', '多模态'],
    link: 'https://deepmind.google/technologies/gemini/',
    external: true
  },
  {
    id: 10,
    title: 'LoRA 微调技术入门',
    description: '了解 LoRA (Low-Rank Adaptation) 如何以更少的计算资源实现大模型的高效微调。',
    category: 'concept',
    date: '2026-01-22',
    tags: ['微调', 'LoRA', '模型训练'],
    link: '/llm/fine-tuning',
    external: false
  }
]

const filteredNews = computed(() => {
  if (selectedCategory.value === 'all') {
    return newsItems
  }
  return newsItems.filter(item => item.category === selectedCategory.value)
})

const getCategoryName = (categoryId) => {
  const category = categories.find(cat => cat.id === categoryId)
  return category ? `${category.icon} ${category.name}` : categoryId
}
</script>

<style scoped>
.ai-news-directory {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

/* Filter Section */
.filter-section {
  margin-bottom: 3rem;
}

.categories {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.category-btn {
  padding: 0.7rem 1.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.95rem;
  font-weight: 500;
}

.category-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  transform: translateY(-2px);
}

.category-btn.active {
  background: var(--vp-c-brand-1);
  color: white;
  border-color: var(--vp-c-brand-1);
}

/* News Grid */
.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.news-card {
  padding: 2rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
}

.news-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border-color: var(--vp-c-brand-1);
}

.news-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.news-category {
  font-size: 0.85rem;
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.news-date {
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
}

.news-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  line-height: 1.4;
}

.news-title a {
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: color 0.3s;
}

.news-title a:hover {
  color: var(--vp-c-brand-1);
}

.news-description {
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.news-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tag {
  padding: 0.3rem 0.8rem;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
}

.read-more {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  transition: all 0.3s;
}

.read-more:hover {
  transform: translateX(4px);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--vp-c-text-2);
}

/* Responsive */
@media (max-width: 768px) {
  .news-grid {
    grid-template-columns: 1fr;
  }
  
  .categories {
    gap: 0.5rem;
  }
  
  .category-btn {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
}
</style>

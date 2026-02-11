<template>
  <div class="ai-tools-directory">
    <!-- 搜索和筛选区域 -->
    <div class="search-section">
      <div class="search-box-wrapper">
        <input 
          v-model="searchQuery"
          type="text" 
          class="search-box" 
          placeholder="🔍 搜索工具名称、功能或描述..."
        />
      </div>
      
      <div class="categories">
        <button 
          v-for="cat in categories" 
          :key="cat.id"
          :class="['category-btn', { active: selectedCategory === cat.id }]"
          @click="selectedCategory = cat.id"
        >
          {{ cat.name }}
        </button>
      </div>
      
      <div class="tools-count">
        找到 <strong>{{ filteredTools.length }}</strong> 个工具
      </div>
    </div>
    
    <!-- 工具卡片网格 -->
    <div v-if="filteredTools.length > 0" class="tools-grid">
      <div v-for="tool in filteredTools" :key="tool.id" class="tool-card">
        <span v-if="tool.hot" class="hot-badge">🔥 热门</span>
        
        <div class="tool-header">
          <span class="tool-logo">{{ tool.logo }}</span>
          <h3 class="tool-title">{{ tool.name }}</h3>
        </div>
        
        <p class="tool-description">{{ tool.description }}</p>
        
        <div class="tool-features">
          <span v-for="feature in tool.features" :key="feature" class="feature-tag">
            {{ feature }}
          </span>
        </div>
        
        <div class="tool-footer">
          <span class="tool-pricing">{{ tool.pricing }}</span>
          <div class="tool-links">
            <a v-if="tool.detailLink" :href="tool.detailLink" class="tool-link secondary">
              详情
            </a>
            <a :href="tool.url" target="_blank" rel="noopener noreferrer" class="tool-link">
              访问 ↗
            </a>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 无结果提示 -->
    <div v-else class="no-results">
      <div class="no-results-icon">🔍</div>
      <p>没有找到匹配的工具</p>
      <p>试试其他关键词或分类</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const selectedCategory = ref('all')

const categories = [
  { id: 'all', name: '全部' },
  { id: 'chat', name: '对话助手' },
  { id: 'image', name: '图像生成' },
  { id: 'video', name: '视频制作' },
  { id: 'audio', name: '音频处理' },
  { id: 'code', name: '编程助手' },
  { id: 'writing', name: '写作工具' },
  { id: 'productivity', name: '效率工具' },
  { id: 'research', name: '研究分析' }
]

const tools = [
  // 对话助手
  {
    id: 1,
    name: 'ChatGPT',
    category: 'chat',
    description: 'OpenAI 开发的强大对话 AI，支持文本生成、代码编写、问答等多种任务',
    features: ['对话交互', '代码生成', '文本创作', '数据分析'],
    pricing: '免费版 + Plus $20/月',
    url: 'https://chat.openai.com',
    logo: '🤖',
    hot: true,
    detailLink: '/tools/chatgpt'
  },
  {
    id: 2,
    name: 'Claude',
    category: 'chat',
    description: 'Anthropic 开发的 AI 助手，擅长长文本处理和复杂推理',
    features: ['长上下文', '代码分析', '文档处理', '安全对齐'],
    pricing: '免费版 + Pro $20/月',
    url: 'https://claude.ai',
    logo: '🎭',
    hot: true
  },
  {
    id: 3,
    name: 'Gemini',
    category: 'chat',
    description: 'Google 的多模态 AI 模型，集成在 Google 生态系统中',
    features: ['多模态', 'Google 集成', '实时信息', '代码执行'],
    pricing: '免费',
    url: 'https://gemini.google.com',
    logo: '✨',
    hot: true
  },
  {
    id: 4,
    name: '文心一言',
    category: 'chat',
    description: '百度开发的中文大语言模型，针对中文场景优化',
    features: ['中文优化', '多模态', '插件生态', '企业服务'],
    pricing: '免费',
    url: 'https://yiyan.baidu.com',
    logo: '🐻'
  },
  {
    id: 5,
    name: '通义千问',
    category: 'chat',
    description: '阿里云推出的大语言模型，支持多种应用场景',
    features: ['中文理解', '多模态', 'API 服务', '企业定制'],
    pricing: '免费',
    url: 'https://tongyi.aliyun.com',
    logo: '☁️'
  },
  
  // 图像生成
  {
    id: 6,
    name: 'Midjourney',
    category: 'image',
    description: '最流行的 AI 绘画工具，生成高质量艺术作品',
    features: ['艺术风格', '高清输出', '风格迁移', '社区分享'],
    pricing: '$10-60/月',
    url: 'https://www.midjourney.com',
    logo: '🎨',
    hot: true,
    detailLink: '/tools/midjourney'
  },
  {
    id: 7,
    name: 'Stable Diffusion',
    category: 'image',
    description: '开源的图像生成模型，可本地部署',
    features: ['开源免费', '本地部署', '高度可控', '插件丰富'],
    pricing: '免费',
    url: 'https://stability.ai',
    logo: '🖼️',
    hot: true,
    detailLink: '/tools/stable-diffusion'
  },
  {
    id: 8,
    name: 'DALL-E 3',
    category: 'image',
    description: 'OpenAI 的图像生成模型，集成在 ChatGPT 中',
    features: ['文本理解', '精准生成', 'ChatGPT 集成', '安全过滤'],
    pricing: 'ChatGPT Plus 会员',
    url: 'https://openai.com/dall-e-3',
    logo: '🎭'
  },
  {
    id: 9,
    name: 'Leonardo.ai',
    category: 'image',
    description: '专业的 AI 艺术创作平台，适合游戏和设计',
    features: ['游戏资产', '3D 纹理', '风格一致', '批量生成'],
    pricing: '免费版 + $12-48/月',
    url: 'https://leonardo.ai',
    logo: '🦁'
  },
  {
    id: 10,
    name: 'Ideogram',
    category: 'image',
    description: '擅长生成包含文字的图像',
    features: ['文字渲染', '排版设计', '海报制作', '品牌设计'],
    pricing: '免费版 + $8-48/月',
    url: 'https://ideogram.ai',
    logo: '💡'
  },
  
  // 视频制作
  {
    id: 11,
    name: 'Runway',
    category: 'video',
    description: 'AI 视频编辑和生成平台',
    features: ['视频生成', '视频编辑', '特效制作', '绿幕抠图'],
    pricing: '免费版 + $12-76/月',
    url: 'https://runwayml.com',
    logo: '🎬',
    hot: true
  },
  {
    id: 12,
    name: 'Pika',
    category: 'video',
    description: '文本生成视频的 AI 工具',
    features: ['文生视频', '图生视频', '视频编辑', '风格控制'],
    pricing: '免费版 + $10-70/月',
    url: 'https://pika.art',
    logo: '⚡'
  },
  {
    id: 13,
    name: 'HeyGen',
    category: 'video',
    description: 'AI 数字人视频生成平台',
    features: ['数字人', '多语言配音', '口型同步', '模板丰富'],
    pricing: '免费试用 + $24-120/月',
    url: 'https://www.heygen.com',
    logo: '👤'
  },
  
  // 音频处理
  {
    id: 14,
    name: 'ElevenLabs',
    category: 'audio',
    description: '高质量 AI 语音合成工具',
    features: ['语音克隆', '多语言', '情感表达', '实时生成'],
    pricing: '免费版 + $5-330/月',
    url: 'https://elevenlabs.io',
    logo: '🎙️',
    hot: true
  },
  {
    id: 15,
    name: 'Suno',
    category: 'audio',
    description: 'AI 音乐生成工具',
    features: ['音乐创作', '歌词生成', '多种风格', '完整歌曲'],
    pricing: '免费版 + $8-24/月',
    url: 'https://suno.ai',
    logo: '🎵',
    hot: true
  },
  {
    id: 16,
    name: 'Adobe Podcast',
    category: 'audio',
    description: 'AI 音频增强和编辑工具',
    features: ['降噪', '音频增强', '转录', '剪辑'],
    pricing: '免费',
    url: 'https://podcast.adobe.com',
    logo: '🎧'
  },
  
  // 编程助手
  {
    id: 17,
    name: 'GitHub Copilot',
    category: 'code',
    description: 'GitHub 和 OpenAI 联合开发的 AI 编程助手',
    features: ['代码补全', '代码生成', '多语言支持', 'IDE 集成'],
    pricing: '$10/月',
    url: 'https://github.com/features/copilot',
    logo: '💻',
    hot: true,
    detailLink: '/tools/coding-assistants'
  },
  {
    id: 18,
    name: 'Cursor',
    category: 'code',
    description: '基于 AI 的代码编辑器',
    features: ['AI 对话', '代码生成', '重构建议', 'VS Code 兼容'],
    pricing: '免费版 + $20/月',
    url: 'https://cursor.sh',
    logo: '⌨️',
    hot: true
  },
  {
    id: 19,
    name: 'Codeium',
    category: 'code',
    description: '免费的 AI 代码补全工具',
    features: ['代码补全', '多语言', '免费使用', 'IDE 插件'],
    pricing: '免费',
    url: 'https://codeium.com',
    logo: '🚀'
  },
  {
    id: 20,
    name: 'Tabnine',
    category: 'code',
    description: 'AI 代码补全和生成工具',
    features: ['本地运行', '隐私保护', '团队协作', '自定义模型'],
    pricing: '免费版 + $12-39/月',
    url: 'https://www.tabnine.com',
    logo: '🔧'
  },
  
  // 写作工具
  {
    id: 21,
    name: 'Notion AI',
    category: 'writing',
    description: 'Notion 内置的 AI 写作助手',
    features: ['文档生成', '内容总结', '翻译', '头脑风暴'],
    pricing: '$10/月',
    url: 'https://www.notion.so/product/ai',
    logo: '📝'
  },
  {
    id: 22,
    name: 'Jasper',
    category: 'writing',
    description: '专业的 AI 营销文案工具',
    features: ['营销文案', 'SEO 优化', '多语言', '品牌声音'],
    pricing: '$39-125/月',
    url: 'https://www.jasper.ai',
    logo: '✍️'
  },
  {
    id: 23,
    name: 'Grammarly',
    category: 'writing',
    description: 'AI 写作和语法检查工具',
    features: ['语法检查', '风格建议', '抄袭检测', '语气调整'],
    pricing: '免费版 + $12-15/月',
    url: 'https://www.grammarly.com',
    logo: '📖'
  },
  
  // 效率工具
  {
    id: 24,
    name: 'Perplexity',
    category: 'productivity',
    description: 'AI 搜索引擎，提供带引用的答案',
    features: ['AI 搜索', '引用来源', '对话式', '实时信息'],
    pricing: '免费版 + $20/月',
    url: 'https://www.perplexity.ai',
    logo: '🔍',
    hot: true
  },
  {
    id: 25,
    name: 'Otter.ai',
    category: 'productivity',
    description: 'AI 会议记录和转录工具',
    features: ['实时转录', '会议总结', '关键词提取', '团队协作'],
    pricing: '免费版 + $10-30/月',
    url: 'https://otter.ai',
    logo: '🦦'
  },
  {
    id: 26,
    name: 'Gamma',
    category: 'productivity',
    description: 'AI 演示文稿生成工具',
    features: ['自动排版', '内容生成', '模板丰富', '协作编辑'],
    pricing: '免费版 + $8-20/月',
    url: 'https://gamma.app',
    logo: '📊'
  },
  
  // 研究分析
  {
    id: 27,
    name: 'Consensus',
    category: 'research',
    description: 'AI 学术论文搜索和分析工具',
    features: ['论文搜索', '结论提取', '引用分析', '趋势发现'],
    pricing: '免费版 + $8.99-14.99/月',
    url: 'https://consensus.app',
    logo: '📚'
  },
  {
    id: 28,
    name: 'Elicit',
    category: 'research',
    description: 'AI 研究助手，帮助文献综述',
    features: ['文献搜索', '数据提取', '总结生成', '研究问题'],
    pricing: '免费版 + $10-42/月',
    url: 'https://elicit.org',
    logo: '🔬'
  },
  {
    id: 29,
    name: 'ChatPDF',
    category: 'research',
    description: '与 PDF 文档对话的 AI 工具',
    features: ['PDF 问答', '内容总结', '多语言', '批量处理'],
    pricing: '免费版 + $5-20/月',
    url: 'https://www.chatpdf.com',
    logo: '📄'
  },
  {
    id: 30,
    name: 'Humata',
    category: 'research',
    description: 'AI 文档分析和问答工具',
    features: ['文档理解', '智能问答', '引用定位', '多文档对比'],
    pricing: '免费版 + $14.99-99.99/月',
    url: 'https://www.humata.ai',
    logo: '📑'
  }
]

const filteredTools = computed(() => {
  let result = tools
  
  // 分类筛选
  if (selectedCategory.value !== 'all') {
    result = result.filter(tool => tool.category === selectedCategory.value)
  }
  
  // 搜索筛选
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(tool => 
      tool.name.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query) ||
      tool.features.some(f => f.toLowerCase().includes(query))
    )
  }
  
  return result
})
</script>

<style scoped>
.ai-tools-directory {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.search-section {
  margin-bottom: 3rem;
}

.search-box-wrapper {
  max-width: 600px;
  margin: 0 auto 2rem;
}

.search-box {
  width: 100%;
  padding: 1rem 1.5rem;
  font-size: 1.1rem;
  border: 2px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.search-box:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.categories {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.category-btn {
  padding: 0.6rem 1.2rem;
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

.tools-count {
  text-align: center;
  color: var(--vp-c-text-2);
  font-size: 1rem;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.tool-card {
  padding: 2rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  background: var(--vp-c-bg-soft);
  transition: all 0.3s;
  position: relative;
  display: flex;
  flex-direction: column;
}

.tool-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.tool-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.tool-logo {
  font-size: 2.5rem;
  line-height: 1;
}

.tool-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0;
}

.hot-badge {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: linear-gradient(135deg, #ff6b6b, #ee5a6f);
  color: white;
  padding: 0.3rem 0.7rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(255, 107, 107, 0.3);
}

.tool-description {
  color: var(--vp-c-text-2);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.2rem;
  flex-grow: 1;
}

.tool-features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 1.5rem;
}

.feature-tag {
  padding: 0.4rem 0.8rem;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
}

.tool-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 1.5rem;
  border-top: 1px solid var(--vp-c-divider);
}

.tool-pricing {
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  font-weight: 600;
}

.tool-links {
  display: flex;
  gap: 0.6rem;
}

.tool-link {
  padding: 0.6rem 1.2rem;
  background: var(--vp-c-brand-1);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}

.tool-link:hover {
  background: var(--vp-c-brand-2);
  transform: scale(1.05);
}

.tool-link.secondary {
  background: var(--vp-c-bg);
  color: var(--vp-c-brand-1);
  border: 2px solid var(--vp-c-brand-1);
}

.tool-link.secondary:hover {
  background: var(--vp-c-brand-soft);
}

.no-results {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--vp-c-text-2);
}

.no-results-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  opacity: 0.5;
}

.no-results p {
  font-size: 1.1rem;
  margin: 0.5rem 0;
}

@media (max-width: 768px) {
  .tools-grid {
    grid-template-columns: 1fr;
  }
  
  .categories {
    gap: 0.5rem;
  }
  
  .category-btn {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
}
</style>

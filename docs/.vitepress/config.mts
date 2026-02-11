import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    // Google Analytics 4
    ['script', { 
      async: '', 
      src: 'https://www.googletagmanager.com/gtag/js?id=G-35F4M5E22Q' 
    }],
    ['script', {}, `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-35F4M5E22Q');
    `],
    // SEO Meta Tags
    ['meta', { name: 'keywords', content: 'AI教程,人工智能,机器学习,深度学习,大语言模型,ChatGPT,Python,神经网络,数据科学' }],
    ['meta', { name: 'author', content: 'creb.ai' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'CreB.ai - AI 学习平台' }],
    ['meta', { property: 'og:description', content: '系统化的人工智能学习资源，涵盖机器学习、深度学习、大语言模型等核心技术' }],
    ['meta', { property: 'og:site_name', content: 'CreB.ai' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'CreB.ai - AI 学习平台' }],
    ['meta', { name: 'twitter:description', content: '系统化的人工智能学习资源，涵盖机器学习、深度学习、大语言模型等核心技术' }],
    ['link', { rel: 'canonical', href: 'https://creb.ai' }]
  ],
  lang: 'zh-CN',
  title: "CreB.ai",
  description: "系统化的人工智能学习资源，涵盖机器学习、深度学习、大语言模型、ChatGPT 等核心技术，提供完整代码示例和实战项目",
  
  // 启用 sitemap
  sitemap: {
    hostname: 'https://creb.ai'
  },
  cleanUrls: true,
  lastUpdated: true,
  locales: {
    root: {
      label: '中文',
      lang: 'zh-CN'
    }
  },
  themeConfig: {
    
    nav: [
      { text: '首页', link: '/' },
      { text: 'AI 基础', link: '/basics/what-is-ai' },
      { text: '机器学习', link: '/machine-learning/introduction' },
      { text: '深度学习', link: '/deep-learning/neural-networks' },
      { text: '大语言模型', link: '/llm/introduction' },
      { 
        text: 'AI 工具', 
        items: [
          { text: 'AI 工具大全', link: '/tools/ai-tools-directory' },
          { text: 'ChatGPT 指南', link: '/tools/chatgpt' },
          { text: 'Midjourney', link: '/tools/midjourney' },
          { text: 'Stable Diffusion', link: '/tools/stable-diffusion' },
          { text: '编程助手', link: '/tools/coding-assistants' },
          { text: '其他工具', link: '/tools/other-tools' }
        ]
      },
      { text: '实战项目', link: '/projects/overview' }
    ],

    sidebar: {
      '/basics/': [
        {
          text: 'AI 基础入门',
          collapsed: false,
          items: [
            { text: '什么是人工智能', link: '/basics/what-is-ai' },
            { text: 'AI 发展历史', link: '/basics/history' },
            { text: 'AI 应用场景', link: '/basics/applications' },
            { text: '数学基础', link: '/basics/math-foundation' }
          ]
        }
      ],
      '/machine-learning/': [
        {
          text: '机器学习',
          collapsed: false,
          items: [
            { text: '机器学习简介', link: '/machine-learning/introduction' },
            { text: '监督学习', link: '/machine-learning/supervised-learning' },
            { text: '无监督学习', link: '/machine-learning/unsupervised-learning' },
            { text: '强化学习', link: '/machine-learning/reinforcement-learning' },
            { text: '常用算法', link: '/machine-learning/algorithms' }
          ]
        }
      ],
      '/deep-learning/': [
        {
          text: '深度学习',
          collapsed: false,
          items: [
            { text: '神经网络基础', link: '/deep-learning/neural-networks' },
            { text: '卷积神经网络 (CNN)', link: '/deep-learning/cnn' },
            { text: '循环神经网络 (RNN)', link: '/deep-learning/rnn' },
            { text: 'Transformer 架构', link: '/deep-learning/transformer' },
            { text: '训练技巧', link: '/deep-learning/training-tips' }
          ]
        }
      ],
      '/llm/': [
        {
          text: '大语言模型',
          collapsed: false,
          items: [
            { text: 'LLM 简介', link: '/llm/introduction' },
            { text: 'GPT 系列', link: '/llm/gpt' },
            { text: 'Claude 与其他模型', link: '/llm/claude' },
            { text: '提示工程', link: '/llm/prompt-engineering' },
            { text: 'RAG 技术', link: '/llm/rag' },
            { text: '微调与训练', link: '/llm/fine-tuning' }
          ]
        }
      ],
      '/tools/': [
        {
          text: 'AI 工具实战',
          collapsed: false,
          items: [
            { text: 'AI 工具大全', link: '/tools/ai-tools-directory' },
            { text: 'ChatGPT 使用指南', link: '/tools/chatgpt' },
            { text: 'Midjourney 绘画', link: '/tools/midjourney' },
            { text: 'Stable Diffusion', link: '/tools/stable-diffusion' },
            { text: 'AI 编程助手', link: '/tools/coding-assistants' },
            { text: '其他实用工具', link: '/tools/other-tools' }
          ]
        }
      ],
      '/projects/': [
        {
          text: '实战项目',
          collapsed: false,
          items: [
            { text: '项目概览', link: '/projects/overview' },
            { text: '图像分类器', link: '/projects/image-classifier' },
            { text: '聊天机器人', link: '/projects/chatbot' },
            { text: '文本生成应用', link: '/projects/text-generation' },
            { text: '推荐系统', link: '/projects/recommendation-system' }
          ]
        }
      ]
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索教程',
            buttonAriaLabel: '搜索教程'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换'
            }
          }
        }
      }
    },

    outline: {
      label: '本页目录',
      level: [2, 3]
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short'
      }
    }
  }
})

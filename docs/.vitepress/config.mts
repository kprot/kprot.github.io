import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // 忽略死链检查（允许 localhost 等示例链接）
  ignoreDeadLinks: [
    // 忽略所有 localhost 链接
    /^https?:\/\/localhost/,
    // 忽略所有 127.0.0.1 链接
    /^https?:\/\/127\.0\.0\.1/,
  ],
  
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
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
    ['meta', { name: 'author', content: 'CreB' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'CreB — Creative Builder' }],
    ['meta', { property: 'og:description', content: '我学 AI、造产品的笔记本。' }],
    ['meta', { property: 'og:site_name', content: 'CreB' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'CreB — Creative Builder' }],
    ['meta', { name: 'twitter:description', content: '我学 AI、造产品的笔记本。' }],
    ['link', { rel: 'canonical', href: 'https://lhsen.com' }]
  ],
  lang: 'zh-CN',
  title: "CreB",
  description: "CreB（Creative Builder）—— 我学 AI、造产品的笔记本。",
  
  // 启用 sitemap
  sitemap: {
    hostname: 'https://lhsen.com'
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
    logo: '/logo.svg',
    
    nav: [
      { text: '博客', link: '/posts/' },
      { text: '在造的', link: '/products/coming-soon' },
      { text: '关于', link: '/about' }
    ],


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

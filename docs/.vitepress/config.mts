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
    ['meta', { name: 'keywords', content: 'HSEN,Hongsen,AI,独立开发,做产品,个人博客,思考' }],
    ['meta', { name: 'author', content: 'HSEN' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'HSEN' }],
    ['meta', { property: 'og:description', content: '我学 AI、造产品的笔记本。' }],
    ['meta', { property: 'og:site_name', content: 'HSEN' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'HSEN' }],
    ['meta', { name: 'twitter:description', content: '我学 AI、造产品的笔记本。' }],
    ['link', { rel: 'canonical', href: 'https://lhsen.com' }]
  ],
  lang: 'zh-CN',
  title: "HSEN",
  description: "HSEN —— 我学 AI、造产品的笔记本。",
  
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
    siteTitle: 'HSEN',
    
    nav: [
      { text: '文章', link: '/posts/' },
      { text: '碎念', link: '/notes/' }
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

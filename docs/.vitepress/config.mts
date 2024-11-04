import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [['link', { rel: 'icon', href: '/loading.png' }]],
  lang: 'zh-CN',
  title: "思考，快与慢",
  description: "思考，快与慢",
  cleanUrls: true,
  lastUpdated: false,
  locales: {
    root: {
      label: '中文',
      lang: 'cn'
    }
  },
  themeConfig: {
    logo: '/loading.png',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '关于', link: '/markdown-examples' },
      { text: '文章', link: '/api-examples' }
    ],

    sidebar: [
      {
        text: '关于',
        collapsed: false,
        items: [
          { text: '关于', link: '/markdown-examples' },
        ]
      },
      {
        text: '思维',
        collapsed: false,
        items: [
          { text: '文章', link: '/api-examples' }
        ]
      }
    ],
    footer: {
      message: '思考，快与慢',
      copyright: 'Copyright © 2024 LHS'
    },
    search: {
      provider: 'local'
    }

    // socialLinks: [
    //   { icon: 'x', link: 'https://github.com/vuejs/vitepress' }
    // ]
  }
})

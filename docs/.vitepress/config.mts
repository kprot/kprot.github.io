import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [['link', { rel: 'icon', href: '/logo.png' }]],
  lang: 'zh-CN',
  title: "creb.ai",
  description: "",
  cleanUrls: true,
  lastUpdated: false,
  locales: {
    root: {
      label: '中文',
      lang: 'cn'
    }
  },
  themeConfig: {
    logo: '/logo.png',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      // { text: 'home', link: '/' },
    ],

    // sidebar: [
    //   {
    //     text: '关于',
    //     collapsed: false,
    //     items: [
    //       { text: '关于', link: '/markdown-examples' },
    //     ]
    //   },
    //   {
    //     text: '思维',
    //     collapsed: false,
    //     items: [
    //       { text: '文章', link: '/api-examples' }
    //     ]
    //   }
    // ],
    footer: {
      message: 'contact@creb.ai',
      copyright: 'Copyright © 2025 深圳创兔科技有限公司'
    },
    // search: {
    //   provider: 'local'
    // }

    // socialLinks: [
    //   { icon: 'x', link: 'https://github.com/vuejs/vitepress' }
    // ]
  }
})

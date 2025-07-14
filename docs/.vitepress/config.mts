import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [['link', { rel: 'icon', href: '/loading.png' }]],
  lang: 'zh-CN',
  title: "HONGSEN",
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
    logo: '',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'HOME', link: '/' },
    ],

    sidebar: [
      // {
      //   text: '关于',
      //   collapsed: false,
      //   items: [
      //     { text: '关于', link: '/markdown-examples' },
      //   ]
      // },
      // {
      //   text: '思维',
      //   collapsed: false,
      //   items: [
      //     { text: '文章', link: '/api-examples' }
      //   ]
      // }
    ],
    footer: {
      message: '',
      copyright: 'Copyright © 2025 HS'
    },
    search: {
      provider: 'local'
    }

    // socialLinks: [
    //   { icon: 'x', link: 'https://github.com/vuejs/vitepress' }
    // ]
  }
})

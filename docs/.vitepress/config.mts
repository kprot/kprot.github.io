import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "思考，快与慢",
  description: "思考，快与慢",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '关于', link: '/markdown-examples' },
      { text: '文章', link: '/api-examples' }
    ],

    sidebar: [
      {
        text: '导航',
        items: [
          { text: '关于', link: '/markdown-examples' },
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

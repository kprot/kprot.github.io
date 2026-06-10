import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import CustomFooter from '../components/CustomFooter.vue'
import PostList from '../components/PostList.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册全局组件
    app.component('CustomFooter', CustomFooter)
    app.component('PostList', PostList)
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => h(CustomFooter),
      'layout-top': () => h('script', {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: '鴻森',
          description: '鴻森 —— 我学 AI、造产品的笔记本。',
          url: 'https://lhsen.com',
          author: {
            '@type': 'Person',
            name: '鴻森',
            url: 'https://lhsen.com'
          }
        })
      })
    })
  }
}

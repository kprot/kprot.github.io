import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import CustomFooter from '../components/CustomFooter.vue'
import PostList from '../components/PostList.vue'
import NotesList from '../components/NotesList.vue'
import HomeTabs from '../components/HomeTabs.vue'
import DraftBanner from '../components/DraftBanner.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册全局组件
    app.component('CustomFooter', CustomFooter)
    app.component('PostList', PostList)
    app.component('NotesList', NotesList)
    app.component('HomeTabs', HomeTabs)
    app.component('DraftBanner', DraftBanner)
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-before': () => h(DraftBanner),
      'layout-bottom': () => h(CustomFooter),
      'layout-top': () => h('script', {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'HSEN',
          description: 'HSEN —— 我学 AI、造产品的笔记本。',
          url: 'https://lhsen.com',
          author: {
            '@type': 'Person',
            name: 'HSEN',
            url: 'https://lhsen.com'
          }
        })
      })
    })
  }
}

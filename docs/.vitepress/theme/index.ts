import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import AIToolsDirectory from '../components/AIToolsDirectory.vue'
import HomePage from '../components/HomePage.vue'
import CustomFooter from '../components/CustomFooter.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册全局组件
    app.component('AIToolsDirectory', AIToolsDirectory)
    app.component('HomePage', HomePage)
    app.component('CustomFooter', CustomFooter)
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => h(CustomFooter),
      'layout-top': () => h('script', {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'EducationalOrganization',
          name: 'CreB.ai',
          description: '系统化的人工智能学习资源',
          url: 'https://creb.ai',
          sameAs: [
            'https://github.com/yourusername/repo'
          ],
          offers: {
            '@type': 'Offer',
            category: 'Education',
            price: '0',
            priceCurrency: 'CNY'
          }
        })
      })
    })
  }
}

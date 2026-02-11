import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import AIToolsDirectory from '../components/AIToolsDirectory.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册全局组件
    app.component('AIToolsDirectory', AIToolsDirectory)
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-top': () => h('script', {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'EducationalOrganization',
          name: 'creb.ai',
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

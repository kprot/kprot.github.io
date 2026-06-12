import { createContentLoader } from 'vitepress'

export interface Post {
  title: string
  url: string
  date: { time: number; string: string }
  excerpt: string | undefined
  draft?: boolean
}

declare const data: Post[]
export { data }

function formatDate(raw: string): Post['date'] {
  const date = new Date(raw)
  date.setUTCHours(12)
  return {
    time: +date,
    string: date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
}

// 生产构建时隐藏草稿；本地 dev 仍然显示，方便预览
const isProd = process.env.NODE_ENV === 'production'

export default createContentLoader('posts/*.md', {
  transform(raw): Post[] {
    return raw
      .filter(({ url, frontmatter }) =>
        url !== '/posts/' && url !== '/posts' && (!isProd || !frontmatter.draft))
      .map(({ url, frontmatter }) => ({
        title: frontmatter.title,
        url,
        excerpt: frontmatter.description,
        draft: !!frontmatter.draft,
        date: formatDate(frontmatter.date)
      }))
      .sort((a, b) => b.date.time - a.date.time)
  }
})

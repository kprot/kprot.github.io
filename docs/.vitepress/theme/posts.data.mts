import { createContentLoader } from 'vitepress'

export interface Post {
  title: string
  url: string
  date: { time: number; string: string }
  excerpt: string | undefined
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

export default createContentLoader('posts/*.md', {
  transform(raw): Post[] {
    return raw
      .filter(({ url }) => url !== '/posts/' && url !== '/posts')
      .map(({ url, frontmatter }) => ({
        title: frontmatter.title,
        url,
        excerpt: frontmatter.description,
        date: formatDate(frontmatter.date)
      }))
      .sort((a, b) => b.date.time - a.date.time)
  }
})

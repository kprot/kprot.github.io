import { createContentLoader } from 'vitepress'

export interface Note {
  url: string
  date: { time: number; string: string }
  html: string
}

declare const data: Note[]
export { data }

function formatDate(raw: string): Note['date'] {
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

export default createContentLoader('notes/*.md', {
  render: true,
  transform(raw): Note[] {
    return raw
      .filter(({ url }) => url !== '/notes/' && url !== '/notes')
      .map(({ url, frontmatter, html }) => ({
        url,
        html: html || '',
        date: formatDate(frontmatter.date)
      }))
      .sort((a, b) => b.date.time - a.date.time)
  }
})

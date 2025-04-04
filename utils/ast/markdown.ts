import { remark } from 'remark'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMdx from 'remark-mdx'

interface ParseMarkdownOptions {
  gfm?: boolean
  mdx?: boolean
  frontmatter?: boolean
}

export async function parseMarkdown(code: string, options: ParseMarkdownOptions = { gfm: true, mdx: true, frontmatter: true }) {
  const processor = await remark()

  if (options.gfm) {
    processor.use(remarkGfm)
  }
  if (options.mdx) {
    processor.use(remarkMdx)
  }
  if (options.frontmatter) {
    processor.use(remarkFrontmatter)
  }

  return await processor.parse(code)
}

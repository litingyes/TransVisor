import { remark } from 'remark'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMdx from 'remark-mdx'

export function parseMarkdownToAst(code: string, parseBy: string = 'remark', options?: any) {
  switch (parseBy) {
    case 'remark': {
      return parseMarkdownByRemark(code, options)
    }
    default: {
      return parseMarkdownByRemark(code, options)
    }
  }
}

export interface ParseMarkdownByRemarkOptions {
  gfm?: boolean
  mdx?: boolean
  frontmatter?: boolean
}
export async function parseMarkdownByRemark(code: string, options: ParseMarkdownByRemarkOptions = { gfm: true, mdx: true, frontmatter: true }) {
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

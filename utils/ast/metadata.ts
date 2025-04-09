import javascriptTemplate from '~/templates/javascript.js?raw'
import markdownTemplate from '~/templates/markdown.md?raw'

interface Metadata {
  icon: string
  link: string
  template: string
  parsers: Record<string, {
    icon: string
    link: string
    version: string
  }>
}

export const AST_LANGUAGE_METADATA: Record<string, Metadata | undefined> = {
  javascript: {
    icon: 'i-logos:javascript',
    link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/',
    template: javascriptTemplate,
    parsers: {
      acorn: {
        icon: 'i-custom:acorn',
        link: 'https://github.com/acornjs/acorn',
        version: ACORN_PARSER_VERSION,
      },
    },
  },
  markdown: {
    icon: 'i-logos:markdown',
    link: 'https://commonmark.org/',
    template: markdownTemplate,
    parsers: {
      remark: {
        icon: 'i-vscode-icons:file-type-light-remark',
        link: 'https://remark.js.org/',
        version: REMARK_VERSION,
      },
    },
  },
}

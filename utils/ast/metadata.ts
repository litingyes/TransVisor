interface Metadata {
  icon: string
  link: string
  parsers: Record<string, {
    icon: string
    link: string
    version: string
  }>
}

export const AST_LANGUAGE_METADATA: Record<string, Metadata | undefined> = {
  markdown: {
    icon: 'i-logos:markdown',
    link: 'https://commonmark.org/',
    parsers: {
      remark: {
        icon: 'i-vscode-icons:file-type-light-remark',
        link: 'https://remark.js.org/',
        version: REMARK_VERSION,
      },
    },
  },
}

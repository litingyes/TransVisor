import type { Jsonifiable } from 'type-fest'

export function useAst() {
  const { language, hashData } = useUrlInfo()

  const parse = async (code: string) => {
    let ast: Jsonifiable = null
    let timeConsuming = 0

    switch (language.value) {
      case 'markdown': {
        const start = performance.now()
        ast = await parseMarkdownToAst(code, hashData.value.parseBy, hashData.value) as unknown as Jsonifiable
        timeConsuming = performance.now() - start
        break
      }
    }

    return {
      ast,
      timeConsuming,
    }
  }

  return {
    parse,
  }
}

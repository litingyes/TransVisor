import type { Jsonifiable } from 'type-fest'

export function useAst(language: MaybeRefOrGetter<string>) {
  const parse = async (code: string, options?: any) => {
    let ast: Jsonifiable = null
    let timeConsuming = 0

    switch (toValue(language)) {
      case 'markdown': {
        const start = performance.now()
        ast = await parseMarkdown(code, options) as unknown as Jsonifiable
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

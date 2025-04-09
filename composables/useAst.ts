import type { Jsonifiable } from 'type-fest'
import JavascriptAcorn from '~/components/ast/javascript/Acorn.vue'
import MdRemark from '~/components/ast/md/Remark.vue'

export function useAst() {
  const { language, hashData } = useUrlInfo()

  const parse = async (code: string) => {
    let ast: Jsonifiable = null
    let timeConsuming = 0

    const start = performance.now()

    switch (language.value) {
      case 'markdown': {
        ast = await parseMarkdownToAst(code, hashData.value.parseBy, hashData.value.parseOption) as unknown as Jsonifiable
        break
      }
      case 'javascript': {
        ast = await parseJavascriptToAst(code, hashData.value.parseBy, hashData.value.parseOption) as unknown as Jsonifiable
        break
      }
    }

    timeConsuming = Math.ceil((performance.now() - start) * 10) / 10

    return {
      ast,
      timeConsuming,
    }
  }

  const Parser = computed(() => {
    switch (hashData.value.parseBy) {
      case 'acorn': {
        return JavascriptAcorn
      }
      case 'remark':{
        return MdRemark
      }
      default: {
        return 'div'
      }
    }
  })

  return {
    parse,
    Parser,
  }
}

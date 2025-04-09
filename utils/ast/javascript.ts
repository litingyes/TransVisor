import type { Options as AcornParseOption } from 'acorn'
import { parse as acornParse } from 'acorn'

export function parseJavascriptToAst(code: string, parseBy: string = 'acorn', options?: any) {
  switch (parseBy) {
    case 'acorn': {
      return parseJavascriptByAcorn(code, options)
    }
    default: {
      return parseJavascriptByAcorn(code, options)
    }
  }
}

export type parseJavascriptByAcornOptions = AcornParseOption
export function parseJavascriptByAcorn(code: string, options: parseJavascriptByAcornOptions = { ecmaVersion: 'latest', sourceType: 'module' }) {
  return acornParse(code, options)
}

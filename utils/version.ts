/* eslint-disable antfu/no-import-node-modules-by-path */
import acornParser from '../node_modules/acorn/package.json'
import remarkInfo from '../node_modules/remark/package.json'
import pkgInfo from '../package.json'

export const APP_VERSION = pkgInfo.version
export const REMARK_VERSION = remarkInfo.version
export const ACORN_PARSER_VERSION = acornParser.version

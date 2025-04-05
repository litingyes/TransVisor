/* eslint-disable antfu/no-import-node-modules-by-path */
import remarkInfo from '../node_modules/remark/package.json'
import pkgInfo from '../package.json'

export const APP_VERSION = pkgInfo.version
export const REMARK_VERSION = remarkInfo.version

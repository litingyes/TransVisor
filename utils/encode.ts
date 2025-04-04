import { strFromU8, strToU8, unzlibSync, zlibSync } from 'fflate'
import { isBrowser } from 'usexx'

// decode
export function utoa(data: string): string {
  const buffer = strToU8(data)
  const zipped = zlibSync(buffer, { level: 9 })
  const binary = strFromU8(zipped, true)

  if (!isBrowser()) {
    return binary
  }
  return btoa(binary)
}

// encode
export function atou(base64: string): string {
  if (!isBrowser()) {
    return base64
  }

  const binary = atob(base64)

  // zlib header (x78), level 9 (xDA)
  if (binary.startsWith('\x78\xDA')) {
    const buffer = strToU8(binary, true)
    const unzipped = unzlibSync(buffer)
    return strFromU8(unzipped)
  }

  // old unicode hacks for backward compatibility
  // https://base64.guru/developers/javascript/examples/unicode-strings
  return decodeURIComponent(escape(binary))
}

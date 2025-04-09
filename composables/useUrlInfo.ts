import { isBrowser, isString } from 'usexx'

interface HashData {
  type: string
  code: string
  parseBy: string
  parseOption?: any
}

export function useUrlInfo() {
  const route = useRoute()

  const language = computed({
    get() {
      return (route.params.language ?? '') as string
    },
    set(value) {
      navigateTo(`/ast/${value}`)
    },
  })

  const hashData = computed<Partial<HashData>>(() => {
    const data = destr<HashData | string>(atou(route.hash.slice(1)))

    return isString(data) ? {} : data
  })
  const updateHash = (data: Partial<HashData>) => {
    const hash = `#${utoa(JSON.stringify({
      ...hashData.value,
      ...data,
    }))}`

    if (hash === route.hash || !isBrowser()) {
      return
    }

    navigateTo({
      hash,
    })
  }

  return {
    language,

    hashData,
    updateHash,
  }
}

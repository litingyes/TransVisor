<script lang="ts" setup>
import type { TabsItem } from '@nuxt/ui'

useHeadSafe({
  title: 'AST Explorer',
})

const { language, hashData, updateHash } = useUrlInfo()
const languageMetadata = computed(() => AST_LANGUAGE_METADATA[language.value])

const { parse } = useAst()

const tc = ref(0)
const ast = ref()
const editorRef = useTemplateRef('editorRef')
watch([hashData, editorRef], ([data]) => {
  if (!data.code) {
    nextTick(() => {
      editorRef.value?.editor?.setValue(languageMetadata.value?.template ?? '')
    })
    return
  }

  if (!data.parseBy) {
    const parsers = AST_LANGUAGE_METADATA[language.value]?.parsers
    if (!parsers) {
      return
    }

    updateHash({
      parseBy: Object.keys(parsers)[0],
    })

    return
  }

  parse(data.code ?? '').then(({ timeConsuming, ast: data }) => {
    tc.value = timeConsuming
    ast.value = data
  })
}, {
  immediate: true,
  deep: true,
})

function onCodeChange(value: string) {
  updateHash({
    code: value,
  })
}

const tabItems: TabsItem[] = [
  {
    label: 'Tree',
    icon: 'i-lucide:tree-deciduous',
  },
  {
    label: 'JSON',
    icon: 'i-lucide:file-json',
  },
]

const { copy, copied } = useClipboard({
  source: location?.href,
})
function shareLink() {
  copy(location.href)
}
</script>

<template>
  <div class="h-full">
    <header class="h-12 flex items-center justify-between px-4 border-b border-solid border-ui-border-muted">
      <div class="flex items-center gap-6">
        <div class="flex items-center gap-2">
          <UChip :text="APP_VERSION" :ui="{ base: 'p-1 h-3' }">
            <ULink to="/">
              <div class="font-bold text-xl text-ui-text ">
                TransVisor
              </div>
            </ULink>
          </UChip>
          <div>👉</div>
          <div class="font-semibold">
            AST Explorer
          </div>
        </div>
        <AstLanguageTitle :language="language" />
        <AstLanguageParser />
      </div>
      <div class="flex items-center gap-1">
        <UTooltip v-if="tc" text="Time consuming">
          <span class="text-ui-text-muted text-xs">
            <AnimateNumber :value="tc" />
            ms
          </span>
        </UTooltip>
        <ThemePicker />
        <UTooltip text="Copy share link">
          <UButton class="cursor-pointer" :icon="copied ? 'i-lucide:check' : 'i-lucide:share-2'" variant="ghost" @click="shareLink" />
        </UTooltip>
        <UTooltip text="Star in GitHub">
          <UButton
            size="lg"
            class="cursor-pointer" icon="i-mdi:github" variant="ghost" @click="navigateTo('https://github.com/litingyes/TransVisor.git', {
              open: {
                target: '_blank',
              },
            })"
          />
        </UTooltip>
      </div>
    </header>
    <main class="h-[calc(100%-3rem)] grid grid-cols-2">
      <div class="h-full">
        <MonacoEditor ref="editorRef" :model-value="hashData.code" :language="language" @change="onCodeChange" />
      </div>
      <div class="px-4 py-2 overflow-auto h-full">
        <UTabs :items="tabItems" :ui="{ root: 'h-full', content: 'h-[calc(100%-3rem)] overflow-auto' }">
          <template #content="{ item }">
            <div>
              <AstTree v-if="item.label === 'Tree'" :value="ast" />
              <JsonViewer v-else :data="ast" show-length show-line-number show-icon />
            </div>
          </template>
        </UTabs>
      </div>
    </main>
  </div>
</template>

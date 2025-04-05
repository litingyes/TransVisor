<script lang="ts" setup>
const { language, hashData, updateHash } = useUrlInfo()

const code = ref(hashData.value.code)

const { parse } = useAst()

const tc = ref(0)
const ast = ref()
watch(code, (code) => {
  parse(code ?? '').then(({ timeConsuming, ast: data }) => {
    tc.value = timeConsuming
    ast.value = data
  })
}, {
  immediate: true,
})

function onCodeChange(value: string) {
  updateHash({
    code: value,
  })
}
</script>

<template>
  <div class="h-full">
    <header class="h-12 flex items-center justify-between px-4 border-b border-solid border-neutral-300 dark:border-neutral-700">
      <div class="flex items-center gap-6">
        <UChip :text="APP_VERSION" :ui="{ base: 'p-1 h-3' }">
          <div class="font-bold">
            AST Explorer
          </div>
        </UChip>
        <AstLanguageTitle :language="language" />
        <AstMdRemark />
      </div>
      <div class="flex items-center gap-1">
        <span v-if="tc">
          <AnimateNumber :value="tc" />
          ms
        </span>
        <ToggleTheme />
        <UButton
          class="cursor-pointer" icon="i-mdi:github" variant="ghost" @click="navigateTo('https://github.com/litingyes/TransVisor.git', {
            open: {
              target: '_blank',
            },
          })"
        />
      </div>
    </header>
    <main class="h-[calc(100%-3rem)] grid grid-cols-2">
      <div class="h-full">
        <MonacoEditor v-model="code" @change="onCodeChange" />
      </div>
      <div class="px-4 py-2 overflow-auto">
        <AstTree :value="ast" />
      </div>
    </main>
  </div>
</template>

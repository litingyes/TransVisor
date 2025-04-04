<script lang="ts" setup>
const route = useRoute()
const language = computed(() => route.params.language as string)
const code = ref('')

const { parse } = useAst(language)

const tc = ref(0)
const ast = ref()
watch(code, (code) => {
  parse(code).then(({ timeConsuming, ast: data }) => {
    tc.value = timeConsuming
    ast.value = data
  })
})
</script>

<template>
  <div class="h-full">
    <header class="h-10 flex items-center justify-between px-4 border-b border-solid border-gray-300">
      <div class="flex items-center gap-2">
        <div class="font-bold">
          AST Explorer
        </div>
        <div>
          {{ language }}
        </div>
      </div>
      <div class="flex items-center gap-1">
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
    <main class="h-[calc(100%-2.5rem)] grid grid-cols-2">
      <div class="h-full">
        <MonacoEditor @change="val => (code = val)" />
      </div>
      <div class="px-1 overflow-auto">
        <AstTree :data="ast" />
      </div>
    </main>
  </div>
</template>

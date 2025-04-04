<script lang="ts" setup>
import { shikiToMonaco } from '@shikijs/monaco'
import * as monaco from 'monaco-editor-core'
import { createHighlighterCoreSync } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'
import markdown from 'shiki/langs/markdown.mjs'
import catppuccinLatte from 'shiki/themes/catppuccin-latte.mjs'

const props = withDefaults(defineProps<{
  language?: 'plaintext' | 'markdown'
  value?: string
}>(), {
  language: 'plaintext',
  value: '',
})
const emit = defineEmits<{
  (e: 'change', value: string): void
}>()

const highlighter = createHighlighterCoreSync({
  themes: [
    catppuccinLatte,
  ],
  langs: [
    markdown,
  ],
  engine: createJavaScriptRegexEngine(),
})

monaco.languages.register({ id: 'markdown' })

shikiToMonaco(highlighter, monaco)

const editor = shallowRef<monaco.editor.IStandaloneCodeEditor>()
const model = shallowRef<monaco.editor.ITextModel>()
watch(() => [props.language, props.value], ([language, value]) => {
  if (!editor.value) {
    return
  }

  model.value = monaco.editor.createModel(value, language)
  editor.value?.setModel(model.value)
})

const container = useTemplateRef('container')
watch(() => container.value, (container) => {
  if (!container) {
    return
  }

  editor.value?.dispose()
  editor.value = monaco.editor.create(container, {
    theme: catppuccinLatte.name,
    language: props.language,
    value: props.value,
  })
  editor.value.onDidChangeModelContent(() => {
    emit('change', editor.value!.getValue())
  })
})

useResizeObserver(document.body, () => {
  editor.value?.layout()
})

onBeforeUnmount(() => {
  editor.value?.dispose()
  model.value?.dispose()
})

defineExpose({
  editor,
})
</script>

<template>
  <div ref="container" class="h-full" />
</template>

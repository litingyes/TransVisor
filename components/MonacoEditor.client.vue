<script lang="ts" setup>
import { shikiToMonaco } from '@shikijs/monaco'
import * as monaco from 'monaco-editor-core'
import { createHighlighterCoreSync } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'
import javascript from 'shiki/langs/javascript.mjs'
import markdown from 'shiki/langs/markdown.mjs'
import catppuccinLatte from 'shiki/themes/catppuccin-latte.mjs'
import catppuccinMocha from 'shiki/themes/catppuccin-mocha.mjs'

const props = withDefaults(defineProps<{
  language?: string
}>(), {
  language: 'plaintext',
})
const emit = defineEmits<{
  (e: 'change', value: string): void
}>()

const model = defineModel({ type: String })

const highlighter = createHighlighterCoreSync({
  themes: [
    catppuccinLatte,
    catppuccinMocha,
  ],
  langs: [
    markdown,
    javascript,
  ],
  engine: createJavaScriptRegexEngine(),
})

monaco.languages.register({ id: 'markdown' })
monaco.languages.register({ id: 'javascript' })

shikiToMonaco(highlighter, monaco)

const editor = shallowRef<monaco.editor.IStandaloneCodeEditor>()
const editorModel = shallowRef<monaco.editor.ITextModel>()
watch(() => props.language, (language) => {
  if (!editor.value) {
    return
  }

  editorModel.value = monaco.editor.createModel(model.value ?? '', language)
  editor.value?.setModel(editorModel.value)
})

const colorMode = useColorMode()
watch(() => colorMode.value, (color) => {
  if (!editor.value) {
    return
  }

  monaco.editor.setTheme(color === 'dark' ? catppuccinMocha.name! : catppuccinLatte.name!)
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
    value: model.value,
    fontSize: 16,
  })
  editor.value.onDidChangeModelContent(() => {
    const value = editor.value!.getValue()
    model.value = value
    emit('change', value)
  })
})

useResizeObserver(document.body, () => {
  editor.value?.layout()
})

onBeforeUnmount(() => {
  editor.value?.dispose()
  editorModel.value?.dispose()
})

defineExpose({
  editor,
})
</script>

<template>
  <div ref="container" class="h-full" />
</template>

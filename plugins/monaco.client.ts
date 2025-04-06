import type { Environment } from 'monaco-editor-core'
import EditorWorker from 'monaco-editor-core/esm/vs/editor/editor.worker?worker'

declare global {
  interface Window {
    MonacoEnvironment: Environment
  }
}

export default defineNuxtPlugin(() => {
  window.MonacoEnvironment = {
    getWorker() {
      return new EditorWorker()
    },
  }
})

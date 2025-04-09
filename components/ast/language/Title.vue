<script lang="ts" setup>
const { language } = useUrlInfo()
const languageMetadata = computed(() => AST_LANGUAGE_METADATA[language.value])

const languages = [
  {
    label: 'Javascript',
    value: 'javascript',
  },
  {
    label: 'Markdown',
    value: 'markdown',
  },
]
</script>

<template>
  <div class="flex items-center gap-1">
    <UIcon
      v-if="languageMetadata"
      :name="languageMetadata!.icon"
      :size="12"
    />
    <ULink :href="languageMetadata?.link" target="_blank">
      <span class="text-base font-semibold text-ui-text">{{ language }}</span>
    </ULink>
    <USelectMenu v-model="language" :items="languages" value-key="value" />
  </div>
</template>

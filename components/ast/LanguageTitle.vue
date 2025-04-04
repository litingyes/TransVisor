<script lang="ts" setup>
defineProps<{
  language: string
}>()
</script>

<template>
  <div class="flex items-center gap-1">
    <UIcon
      v-if="AST_LANGUAGE_METADATA[language]"
      :name="AST_LANGUAGE_METADATA[language]!.icon"
      :size="12"
    />
    <span class="text-base font-semibold">{{ language }}</span>
  </div>
</template>

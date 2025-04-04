<script lang="ts" setup>
import type { Jsonifiable } from 'type-fest'

defineProps<{
  data: Jsonifiable
}>()
</script>

<template>
  <ul v-if="data" class="p-2">
    <AstTreeNode v-for="field in Object.keys(data)" :key="field" :field="field" :value="data[field as keyof Jsonifiable]" />
  </ul>
</template>

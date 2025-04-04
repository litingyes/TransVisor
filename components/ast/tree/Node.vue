<script lang="ts" setup>
import type { JsonObject, JsonValue } from 'type-fest'
import { isArray, isObject } from 'usexx'

const props = defineProps<{
  field: string
  value: JsonValue
}>()

const isObjectValue = computed(() => isObject(props.value))

const isFold = ref(false)
const foldChildrenText = computed(() => {
  if (!isObjectValue.value) {
    return ''
  }

  if (isArray(props.value)) {
    return `[ ${props.value.length} elements ]`
  }

  return `{ ${Object.keys(props.value!).join(', ')} }`
})
</script>

<template>
  <li class="pl-2 relative">
    <div v-if="!isObjectValue" class="flex items-center gap-2">
      <span class="text-orange-400 font-medium">{{ field }}:</span>
      <span>{{ value }}</span>
    </div>
    <div v-else>
      <div class="flex items-center gap-2">
        <span class="absolute -left-2 font-semibold" :class="[isFold ? 'text-green-500' : 'text-red-500']">{{ isFold ? '+' : '-' }}</span>
        <span class="cursor-pointer hover:underline select-none" @click="isFold = !isFold">{{ field }}:</span>
        <span v-if="(value as JsonObject).type" class="text-green-400">{{ (value as JsonObject).type }}</span>
        <span v-if="isFold" class="text-neutral-500 italic">{{ foldChildrenText }}</span>
      </div>
      <div v-if="!isFold">
        <ul v-if="value" class="pl-2">
          <AstTreeNode v-for="item in Object.keys(value)" :key="item" :field="item" :value="value[item as keyof JsonValue]" />
        </ul>
      </div>
    </div>
  </li>
</template>

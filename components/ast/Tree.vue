<script lang="ts" setup>
import type { JsonObject, JsonValue } from 'type-fest'
import { isArray, isBoolean, isNumber, isObject, isString } from 'usexx'

const props = defineProps<{
  field?: string
  value: JsonValue | object
}>()

const isObjectValue = computed(() => isObject(props.value))
const isArrayValue = computed(() => isArray(props.value))
const primitiveValueColor = computed(() => {
  if (isString(props.value)) {
    return 'text-blue-700 dark:text-blue-300'
  }
  if (isNumber(props.value)) {
    return 'text-teal-700 dark:text-teal-300'
  }
  if (isBoolean(props.value)) {
    return 'text-purple-700 dark:text-purple-300'
  }

  return 'text-yellow-700 dark:text-yellow-300'
})

const isFold = ref(false)
const foldChildrenText = computed(() => {
  if (!isObjectValue.value) {
    return ''
  }

  if (isArray(props.value)) {
    return `${props.value.length} elements`
  }

  return `${Object.keys(props.value!).join(', ')}`
})
</script>

<template>
  <div class="pl-2 relative">
    <div v-if="!isObjectValue" class="flex items-center gap-2">
      <span class="text-amber-700 dark:text-amber-300">{{ field }}:</span>
      <span :class="primitiveValueColor">{{ isString(value) ? `"${value}"` : value }}</span>
    </div>
    <div v-else>
      <div class="inline-flex items-center">
        <span class="absolute -left-2 font-semibold" :class="[isFold ? 'text-green-500' : 'text-red-500']">{{ isFold ? '+' : '-' }}</span>
        <span class="cursor-pointer select-none pr-2 hover:underline text-amber-700 dark:text-amber-300" @click="isFold = !isFold">
          <template v-if="field"> {{ field }}: </template>
          <span v-if="(value as JsonObject).type" class="text-green-700 dark:text-green-300">{{ (value as JsonObject).type }}</span>
        </span>
        <span>{{ isArrayValue ? '[' : '{' }}&nbsp;</span>
        <span v-if="isFold" class="text-neutral-500 italic">{{ foldChildrenText }}</span>
      </div>
      <div v-if="!isFold">
        <ul v-if="value" class="pl-2">
          <AstTree v-for="item in Object.keys(value)" :key="item" :field="item" :value="value[item as keyof JsonValue]" />
        </ul>
      </div>
      <span>&nbsp;{{ isArrayValue ? ']' : '}' }}</span>
    </div>
  </div>
</template>

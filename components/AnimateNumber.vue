<script lang="ts" setup>
import { animate } from 'motion-v'

const props = withDefaults(defineProps<{
  value?: number
}>(), {
  value: 0,
})

const currentValue = ref(0)

watch(() => props.value, (value) => {
  animate(currentValue.value, value, {
    duration: 0.3,
    onUpdate(latest) {
      currentValue.value = Math.ceil(latest * 10) / 10
    },
  })
}, {
  immediate: true,
})
</script>

<template>
  <div class="inline-block">
    {{ currentValue }}
  </div>
</template>

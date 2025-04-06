<script lang="ts" setup>
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'
</script>

<template>
  <VueJsonPretty v-if="$attrs.data || $attrs.modelValue" v-bind="$attrs" :theme="$colorMode.value as ('light' |'dark')" />
</template>

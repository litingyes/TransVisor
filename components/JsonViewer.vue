<script lang="ts" setup>
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'
</script>

<template>
  <VueJsonPretty v-bind="$attrs" />
</template>

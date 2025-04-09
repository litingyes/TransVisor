<script lang="ts" setup>
const { Parser } = useAst()
</script>

<template>
  <component :is="Parser" />
</template>

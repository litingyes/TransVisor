<script lang="ts" setup>
import { Analytics } from '@vercel/analytics/nuxt'
</script>

<template>
  <div class="w-screen h-screen overflow-auto">
    <NuxtLoadingIndicator />
    <UApp>
      <NuxtPage />
    </UApp>
    <Analytics />
    <NuxtPwaManifest />
  </div>
</template>

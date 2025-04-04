<script lang="ts" setup>
const colorMode = useColorMode()
const iconClass = computed(() => {
  switch (colorMode.preference) {
    case 'light': {
      return 'i-carbon:sun'
    }
    case 'dark': {
      return 'i-carbon:moon'
    }
    case 'system': {
      return 'i-ic:outline-desktop-windows'
    }
    default: {
      return 'i-ic:outline-desktop-windows'
    }
  }
})
function toggleTheme() {
  switch (colorMode.preference) {
    case 'light': {
      colorMode.preference = 'dark'
      break
    }
    case 'dark': {
      colorMode.preference = 'system'
      break
    }
    case 'system': {
      colorMode.preference = 'light'
      break
    }
    default: {
      colorMode.preference = 'system'
    }
  }
}

function enableTransitions() {
  return 'startViewTransition' in document
    && window.matchMedia('(prefers-reduced-motion: no-preference)').matches
}
async function toggleAppearance({ clientX: x, clientY: y }: MouseEvent) {
  if (!enableTransitions()) {
    toggleTheme()
    return
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    )}px at ${x}px ${y}px)`,
  ]

  await document.startViewTransition(async () => {
    toggleTheme()
    await nextTick()
  }).ready

  document.documentElement.animate(
    { clipPath: colorMode.value === 'dark' ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: 'ease-in',
      pseudoElement: `::view-transition-${colorMode.value === 'dark' ? 'old' : 'new'}(root)`,
    },
  )
}
</script>

<template>
  <UButton class="cursor-pointer" :icon="iconClass" variant="ghost" @click="toggleAppearance" />
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}
</style>

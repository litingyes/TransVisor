<script setup lang="ts">
import colors from 'tailwindcss/colors'
import { omit } from 'usexx'

const appConfig = useAppConfig()
const colorMode = useColorMode()

const neutralColors = ['slate', 'gray', 'zinc', 'neutral', 'stone']
const neutral = computed({
  get() {
    return appConfig.ui.colors.neutral
  },
  set(option) {
    appConfig.ui.colors.neutral = option
    window.localStorage.setItem('nuxt-ui-neutral', appConfig.ui.colors.neutral)
  },
})

const colorsToOmit = ['inherit', 'current', 'transparent', 'black', 'white', ...neutralColors]
const primaryColors = Object.keys(omit(colors, colorsToOmit as any))
const primary = computed({
  get() {
    return appConfig.ui.colors.primary
  },
  set(option) {
    appConfig.ui.colors.primary = option
    window.localStorage.setItem('nuxt-ui-primary', appConfig.ui.colors.primary)
  },
})

const radiuses = [0, 0.125, 0.25, 0.375, 0.5]
const radius = computed({
  get() {
    return appConfig.theme.radius
  },
  set(option) {
    appConfig.theme.radius = option
    window.localStorage.setItem('nuxt-ui-radius', String(appConfig.theme.radius))
  },
})

const modes = [
  { label: 'light', icon: 'i-lucide:sun' },
  { label: 'dark', icon: 'i-lucide:moon' },
  { label: 'system', icon: 'i-lucide:monitor' },
]
const mode = computed({
  get() {
    return colorMode.value
  },
  set(option) {
    colorMode.preference = option
  },
})
function enableTransitions() {
  return 'startViewTransition' in document
    && window.matchMedia('(prefers-reduced-motion: no-preference)').matches
}
async function toggleAppearance({ clientX: x, clientY: y }: MouseEvent, value: string) {
  if (!enableTransitions()) {
    mode.value = value
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
    mode.value = value
    await nextTick()
  }).ready

  document.documentElement.animate(
    { clipPath: colorMode.value === 'dark' ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: 'ease-in',
      pseudoElement: `::view-transition-${mode.value === 'dark' ? 'old' : 'new'}(root)`,
    },
  )
}
</script>

<template>
  <UPopover :ui="{ content: 'w-72 px-6 py-4 flex flex-col gap-4' }">
    <template #default="{ open }">
      <UTooltip text="Theme picker">
        <UButton
          class="cursor-pointer"
          icon="i-lucide-swatch-book"
          color="neutral"
          :variant="open ? 'soft' : 'ghost'"
          square
          aria-label="Color picker"
          :ui="{ leadingIcon: 'text-(--ui-primary)' }"
        />
      </UTooltip>
    </template>
    <template #content>
      <fieldset>
        <legend class="text-[11px] leading-none font-semibold mb-2">
          Primary
        </legend>
        <div class="grid grid-cols-3 gap-1 -mx-2">
          <ThemePickerButton
            v-for="color in primaryColors"
            :key="color"
            :label="color"
            :chip="color"
            :selected="primary === color"
            @click="primary = color"
          />
        </div>
      </fieldset>
      <fieldset>
        <legend class="text-[11px] leading-none font-semibold mb-2">
          Neutral
        </legend>
        <div class="grid grid-cols-3 gap-1 -mx-2">
          <ThemePickerButton
            v-for="color in neutralColors"
            :key="color"
            :label="color"
            :chip="color === 'neutral' ? 'old-neutral' : color"
            :selected="neutral === color"
            @click="neutral = color"
          />
        </div>
      </fieldset>
      <fieldset>
        <legend class="text-[11px] leading-none font-semibold mb-2">
          Radius
        </legend>
        <div class="grid grid-cols-5 gap-1 -mx-2">
          <ThemePickerButton
            v-for="r in radiuses"
            :key="r"
            :label="String(r)"
            class="justify-center px-0"
            :selected="radius === r"
            @click="radius = r"
          />
        </div>
      </fieldset>
      <fieldset>
        <legend class="text-[11px] leading-none font-semibold mb-2">
          Theme
        </legend>
        <div class="grid grid-cols-3 gap-1 -mx-2">
          <ThemePickerButton
            v-for="m in modes"
            :key="m.label"
            v-bind="m"
            :selected="colorMode.preference === m.label"
            @click="e => toggleAppearance(e, m.label)"
          />
        </div>
      </fieldset>
    </template>
  </UPopover>
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

<script lang="ts" setup>
useHeadSafe({
  title: 'TransVisor',
})
</script>

<template>
  <div class="flex items-center justify-center h-full w-full overflow-auto">
    <div class="-translate-y-1/6">
      <InspiraBlurReveal :duration="0.6" :delay="0.6" :y-offset="60">
        <div class="font-bold text-6xl bg-gradient-to-r from-primary-700 to-primary-300 bg-clip-text  text-transparent">
          TransVisor
        </div>
        <p class="text-neutral-500 text-2xl">
          Focus on data conversion and visualization
        </p>
        <div class="mt-6">
          <div
            class="relative p-4 rounded-lg border border-ui-border cursor-pointer transition-all hover:bg-ui-bg-muted"
            @click="navigateTo('/ast/markdown')"
          >
            <InspiraGlowingEffect
              :spread="40"
              :glow="true"
              :disabled="false"
              :proximity="64"
              :inactive-zone="0.01"
            />
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide:tree-deciduous" />
              AST Explorer
            </div>
          </div>
        </div>
      </InspiraBlurReveal>
    </div>
  </div>
</template>

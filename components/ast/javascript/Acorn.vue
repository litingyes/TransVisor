<script lang="ts" setup>
import { pick } from 'usexx'

const metadata = AST_LANGUAGE_METADATA.javascript!.parsers.acorn

const { hashData, updateHash } = useUrlInfo()

const config = ref<parseJavascriptByAcornOptions>({
  sourceType: 'module',
  allowReturnOutsideFunction: true,
  allowImportExportEverywhere: true,
  allowAwaitOutsideFunction: true,
  allowHashBang: true,
  allowSuperOutsideMethod: true,
  checkPrivateFields: false,
  locations: true,
  ranges: true,
  preserveParens: true,
  ...hashData.value.parseOption,
  ecmaVersion: String(hashData.value.parseOption?.ecmaVersion ?? 'latest'),
  allowReserved: hashData.value.parseOption?.allowReserved ?? 'true',
})

watch(config, (parseOption) => {
  const ecmaVersion = parseOption.ecmaVersion === 'latest' ? 'latest' : Number(parseOption.ecmaVersion)

  let allowReserved: parseJavascriptByAcornOptions['allowReserved'] = true
  if (String(parseOption.allowReserved) === 'false') {
    allowReserved = false
  }
  else if (parseOption.allowReserved === 'never') {
    allowReserved = 'never'
  }

  updateHash({
    parseOption: {
      ...pick(parseOption, [
        'sourceType',
        'allowAwaitOutsideFunction',
        'allowImportExportEverywhere',
        'allowAwaitOutsideFunction',
        'allowHashBang',
        'allowSuperOutsideMethod',
        'checkPrivateFields',
        'locations',
        'ranges',
        'preserveParens',
      ]),
      ecmaVersion,
      allowReserved,
    },
  })
}, {
  deep: true,
  immediate: true,
})
</script>

<template>
  <div class="flex items-center gap-1">
    <NuxtImg class="size-4 inline-block" src="https://cdn.jsdelivr.net/gh/acornjs/acorn@master/logo.svg" />
    <ULink :href="metadata.link" target="_blank" class="text-ui-text">
      Acorn
    </ULink>
    <UPopover arrow>
      <UTooltip text="Parse settings">
        <UButton class="cursor-pointer" icon="i-ant-design:setting-outlined" variant="ghost" />
      </UTooltip>
      <template #content>
        <div class="p-2 flex flex-col gap-1">
          <UBadge variant="soft">
            v{{ metadata.version }}
          </UBadge>
          <hr class="border-ui-border">
          <label class="text-sm font-semibold">ECMA version</label>
          <USelectMenu
            v-model="(config.ecmaVersion) as string"
            :items="
              [
                'latest',
                ...Array.from({ length: 16 - 3 + 1 }).fill(0).map((_, i) => i + 3).reverse(),
                ...Array.from({ length: 2025 - 2015 + 1 }).fill(0).map((_, i) => i + 2015).reverse(),
              ]
            "
          />
          <hr class="border-ui-border">
          <label class="text-sm font-semibold">Source type</label>
          <URadioGroup v-model="config.sourceType" :items="['module', 'script']" orientation="horizontal" />
          <hr class="border-ui-border">
          <label class="text-sm font-semibold">Allow reserved</label>
          <URadioGroup v-model="(config.allowReserved as string)" :items="['true', 'false', 'never']" orientation="horizontal" />
          <hr class="border-ui-border">
          <UCheckbox v-model="config.allowReturnOutsideFunction" label="Allow return outside function" />
          <UCheckbox v-model="config.allowImportExportEverywhere" label="Allow import export everywhere" />
          <UCheckbox v-model="config.allowAwaitOutsideFunction" label="Allow await outsize function" />
          <UCheckbox v-model="config.allowHashBang" label="Allow hash bang" />
          <UCheckbox v-model="config.allowSuperOutsideMethod" label="Allow super outsize method" />
          <UCheckbox v-model="config.checkPrivateFields" label="Check private fields" />
          <UCheckbox v-model="config.locations" label="Locations" />
          <UCheckbox v-model="config.ranges" label="Ranges" />
          <UCheckbox v-model="config.preserveParens" label="Check private fields" />
        </div>
      </template>
    </UPopover>
  </div>
</template>

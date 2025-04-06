<script lang="ts" setup>
import { pick } from 'usexx'

const metadata = AST_LANGUAGE_METADATA.markdown!.parsers.remark

const { hashData, updateHash } = useUrlInfo()

const config = ref<ParseMarkdownByRemarkOptions>({
  gfm: true,
  mdx: true,
  frontmatter: true,
  ...hashData.value.parseOption,
})

watch(config, (parseOption) => {
  updateHash({
    parseOption: pick(parseOption, ['gfm', 'mdx', 'frontmatter']),
  })
}, {
  deep: true,
  immediate: true,
})
</script>

<template>
  <div class="flex items-center gap-1">
    <UIcon :name="metadata.icon" />
    <ULink :href="metadata.link" target="_blank" class="text-ui-text">
      Remark
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
          <UCheckbox v-model="config.gfm" label="remark-gfm" />
          <UCheckbox v-model="config.mdx" label="remark-mdx" />
          <UCheckbox v-model="config.frontmatter" label="remark-frontmatter" />
        </div>
      </template>
    </UPopover>
  </div>
</template>

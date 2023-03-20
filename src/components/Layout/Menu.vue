<template>
  <n-space vertical>
    <n-layout has-sider>
      <n-layout-sider
        bordered
        h-90vh
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :collapsed="collapsed"
        show-trigger
        @collapse="collapsed = true"
        @expand="collapsed = false"
      >
        <n-menu
          :collapsed="collapsed"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
        />
      </n-layout-sider>
      <n-layout p-8>
        <RouterView />
      </n-layout>
    </n-layout>
  </n-space>
</template>

<script setup lang="ts">
import type { MenuOption } from 'naive-ui'
import { RouterLink } from 'vue-router'

const collapsed = ref(false)

const renderLinkLabel = (label: string, name: string) => {
  return () => h(RouterLink, { to: { name } }, { default: () => label })
}

const menuOptions: MenuOption[] = [
  {
    label: renderLinkLabel('首页', 'Home'),
    key: 'Home',
  },
  {
    label: renderLinkLabel('Prompt管理', 'Prompt'),
    key: 'Prompt',
  },
  {
    label: renderLinkLabel('AI工具管理', 'Tool'),
    key: 'Tool',
  },
  {
    label: renderLinkLabel('Key管理', 'Key'),
    key: 'Key',
  },
]
</script>

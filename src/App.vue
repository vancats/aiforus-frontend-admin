<template>
  <n-message-provider>
    <message-api />
  </n-message-provider>
  <n-dialog-provider>
    <dialog-api />
  </n-dialog-provider>
  <n-config-provider :theme-overrides="appTheme">
    <NavBar />
    <main font-sans text="gray-700 dark:gray-200" h-screen>
      <RouterView />
    </main>
  </n-config-provider>
</template>

<script setup lang="ts">
import { appTheme } from './config/themeOverrides'
defineOptions({ name: 'AppPage' })
</script>

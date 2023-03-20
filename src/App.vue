<template>
  <n-message-provider>
    <message-api />
  </n-message-provider>
  <n-dialog-provider>
    <dialog-api />
  </n-dialog-provider>
  <n-config-provider>
    <div font-sans bg-gray-100 text="gray-700 dark:gray-200" h-screen w-screen>
      <NavBar />
      <Menu />
    </div>
  </n-config-provider>
</template>

<script setup lang="ts">
defineOptions({ name: 'AppPage' })
</script>

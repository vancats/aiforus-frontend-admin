<template>
  <div h-10vh p-8 bg-gray-200 flex-center-between>
    <div flex-center cursor text-xl @click="goHome">
      <div i-mingcute:planet-line mx-2 py-1 />
      <div>
        后台管理系统 - AI FOR US
      </div>
    </div>
    <!-- <div text-lg cursor>
      admin
    </div> -->
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'NavBar' })
const router = useRouter()
const goHome = () => router.push('/')
</script>

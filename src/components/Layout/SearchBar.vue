<template>
  <div main-title>
    百度一下 使用每一种AI
  </div>

  <n-input
    :value="searchValue"
    class="p-2 my-6 box-border rounded-lg"
    placeholder="搜索你想找的相关应用" size="small" clearable
    :on-input="handleInput"
    @keydown.enter="handleSearch"
  >
    <template #prefix>
      <span i-carbon:search style="color: #ffffff" />
    </template>
  </n-input>
</template>

<script setup lang="ts">
defineOptions({ name: 'SearchBar' })

const { searchValue } = defineModel<{ searchValue: string }>()

const handleInput = (value: string) => searchValue.value = value

const handleSearch = useThrottleFn(() => {
  // TODO 发起请求
}, 1000)
</script>

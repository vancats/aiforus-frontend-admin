<template>
  <n-space py-4>
    <n-tag
      v-for="tag in tags" :key="tag.id"
      p-4 border rounded-lg cursor
      :class="tag.active && 'border-blue'"
      @click="handleClick(tag.id)"
    >
      {{ tag.name }}
    </n-tag>
  </n-space>
  <ListBar
    v-for="list in listsData" :key="list.title"
    :list-title="list.title" :list-icon="list.icon" :card-list="list.cardList"
  />
</template>

<script setup lang='ts'>
import type { ListType, TagType } from './Layout'
defineProps<{
  tags: TagType[]
  listsData: ListType[]
}>()
const emit = defineEmits(['tagChange'])

defineOptions({ name: 'Content' })

function handleClick(id: number) {
  emit('tagChange', id)
}
</script>

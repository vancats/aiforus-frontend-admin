<template>
  <div py-2 flex-center>
    <img :src="listIcon" mr-1 wh-5>
    <div text-5>
      {{ listTitle }}
    </div>
  </div>
  <div flex-wrap>
    <ListCard v-for="card in cardList" :key="card.id" :card-info="card" />
  </div>
</template>

<script setup lang='ts'>
import type { CardType } from './Layout'

defineProps<{
  listTitle: string
  listIcon: string
  cardList: CardType[]
}>()

defineOptions({ name: 'ListBar' })
</script>

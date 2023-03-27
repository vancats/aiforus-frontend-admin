<template>
  <n-button mb-4 @click="showModal = true">
    新增 Key
  </n-button>
  <n-data-table :columns="columns" :data="listData" :pagination="pagination" />

  <n-modal
    v-model:show="showModal"
    preset="dialog"
    title="新建key"
    w="140!"
    :show-icon="false"
    auto-focus
    positive-text="确认"
    negative-text="取消"
    :on-positive-click="confirm"
    :on-click="keyValue = ''"
  >
    <n-input v-model:value="keyValue" />
  </n-modal>
</template>

<script setup lang="ts">
import type { DataTableColumns } from 'naive-ui'
import { getKeys, insertKey } from '~/api/key'
import { createOptionalColumn } from '~/utils'
defineOptions({ name: 'KeyPage' })

const columns: DataTableColumns<{ key: string }> = [
  createOptionalColumn('key', 'key'),
]
const listData = ref<Array<{ key: string }>>([])
async function fetchKeys() {
  try {
    const data = await getKeys()
    listData.value = data || []
  }
  catch (e) {
    console.warn(e)
  }
}
fetchKeys()
const pagination = reactive({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [10, 20, 50],
  onChange: (page: number) => {
    pagination.page = page
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize
    pagination.page = 1
  },
})

// Modal
const showModal = ref(false)
const keyValue = ref('')

const confirm = async () => {
  if (keyValue) {
    await insertKey(keyValue.value)
    fetchKeys()
  }
}
</script>

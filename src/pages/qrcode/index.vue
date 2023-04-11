<template>
  <div h-full overflow-y-auto>
    <div text-2xl>
      已有二维码（点击图片可删除）
    </div>
    <div flex-wrap>
      <div v-for="(qrcode, index) in qrcodeList" :key="index">
        <n-popconfirm
          @positive-click="handleDelete(qrcode)"
        >
          <template #trigger>
            <div flex-center-col>
              <img :src="qrcode.qrcodeUrl" wh-30>
              <span>
                {{ qrcode.qrcodeName }}
              </span>
            </div>
          </template>
          确认删除这张二维码吗？
        </n-popconfirm>
      </div>
    </div>
    <div text-2xl my-10>
      上传二维码
    </div>
    <div flex-center mt-4 w-100>
      <span w-30>
        二维码:
      </span>
      <Upload v-model:url="qrcodeUrl" :max="100" />
    </div>
    <div flex-center mt-4 w-100>
      <span w-30>
        社群名称:
      </span>
      <n-input v-model:value="qrcodeName" />
    </div>
    <n-button type="primary" mt-4 @click="submit">
      确认提交
    </n-button>
  </div>
</template>

<script setup lang='ts'>
import type { QRCodeInfo } from './type'
import naiveui from '~/utils/naiveui'
import { deleteQRCode, getQRCode, insertQRCode } from '~/api/qrcode'
const qrcodeList = ref<QRCodeInfo[]>([])
const fetchQRCode = async () => {
  try {
    const data = await getQRCode()
    qrcodeList.value = data || []
  }
  catch (e) {
    console.warn(e)
  }
}
onMounted(() => {
  fetchQRCode()
})
const qrcodeUrl = ref('')
const qrcodeName = ref('')
const handleDelete = async (qrcode: QRCodeInfo) => {
  try {
    await deleteQRCode(qrcode)
    naiveui.message.success('删除成功')
    location.reload()
  }
  catch (e) {
    console.warn(e)
  }
}
const submit = async () => {
  if (!qrcodeUrl.value) {
    naiveui.message.warning('请上传二维码！')
    return
  }
  if (!qrcodeName.value) {
    naiveui.message.warning('请填写社群名称！')
    return
  }
  try {
    await insertQRCode({ qrcodeUrl: qrcodeUrl.value, qrcodeName: qrcodeName.value })
    naiveui.message.success('上传成功！')
    location.reload()
  }
  catch (e) {
    console.warn(e)
  }
}
</script>

import type { QRCodeInfo } from '~/pages/qrcode/type'
import axios from '~/utils/axios'

export const getQRCode = async () => {
  return await axios.get<Array<QRCodeInfo>>('/qrcode/community/query').then(res => res?.data)
}

export const insertQRCode = async (qrcode: QRCodeInfo) => {
  return await axios.post('/qrcode/community/insert', qrcode)
}

export const deleteQRCode = async (qrcode: QRCodeInfo) => {
  return await axios.post('/qrcode/community/delete', qrcode)
}

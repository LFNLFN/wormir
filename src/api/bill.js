import request from '@/utils/request'
import store from '@/store'

// 发送货单
export function sendOrderBill(mergeOrderNo, emails) {
  return request({
    // url: '/user/login.json',
    url: 'xxx',
    method: 'post',
    data: {
      mergeOrderNo,
      emails
    }
  })
}

// 确认并单
export function mergeOrder() {
  return request({
    url: 'xxx',
    method: 'post'
  })
}

// 更改运输方式
export function changeTransportation() {
  return request({
    url: 'xxxxxx',
    method: 'post',
  })
}

// 取消并单
export function cancelMergeOrder() {
  return request({
    url: 'xxxxxx',
    method: 'post',
  })
}

// 拆单
export function splitOrderMerged(order) {
  return request({
    url: 'xxxxxx',
    method: 'post',
  })
}






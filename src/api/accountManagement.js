import request from '@/utils/request'

// 修改密码
export function modifyPwd(relevanceNo, newPassword) {
  return request({
    url: '/user/modifyPasswordAction.do',
    method: 'post',
    data: { relevanceNo, newPassword }
  })
}

// 注销渠道
export function deleteChannel(applyReason, operateType, applyTime) {
  return request({
    url: '/channelInfo/applyCancellationAction.do',
    method: 'post',
    data: {
      applyReason,
      terminationType: operateType,
      terminationDate: applyTime }
  })
}

// 用来取mock数据的
export function issueGoods(data) {
  return request({
    url: '/issueGoods/list.do',
    method: 'post',
    data
  })
}

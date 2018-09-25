import request from '@/utils/request'

// 通过渠道编号模糊检索渠道号列表
export function channel_BlurSearch(channelNo = '', page = 1, rows = 10) {
  return request({
    url: '/channelInfo/list.do',
    method: 'post',
    params: { channelNo, page, rows }
  })
}

// 带有时间参数的channel模糊查询
export function channel_BlurSearch_withTime(channelNo = '', openingTime = null, page = 1, row = 10) {
  return request({
    url: '/channelInfo/ChannelNoListBySearch.do',
    method: 'get',
    params: { channelNo, openingTime, page, row }
  })
}

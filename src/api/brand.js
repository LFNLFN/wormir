import request from '@/utils/request'

// 通过渠道编号模糊检索渠道号列表
export function brand_BlurSearch(brandNo = '', page = 1, row = 10) {
  return request({
    url: '/brand/list.do',
    method: 'post',
    params: { brandNo, page, row }
  })
}

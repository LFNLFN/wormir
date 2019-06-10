// 运输方式
export const transportationFilters = [
  { text: '空运', value: 1 },
  { text: '海运', value: 2 },
]

// 渠道属性
export const channelPropFilters = [
  { text: 'DLQD', value: 1 },
  { text: 'DFQD', value: 2 },
  { text: 'FXQD', value: 3 },
  { text: 'FXZQD', value: 4 },
]

// 货款类型
export const paymentTypeFilters = [
  { text: '30%订金', value: 30 },
  { text: '70%余款', value: 40 },
]

// 付款类型
export const paymentStatusFilters = [
  { text: '待付货款', value: 1 },
  { text: '待确认到账', value: 2 },
  { text: '货款已到账', value: 3 },
]

// 补款状态
export const compensationStatusFilters = [
  { text: '申请补款', value: 0 },
  { text: '待审核', value: 1 },
  { text: '待补款', value: 2 },
  { text: '已补款', value: 3 },
  { text: '驳回申请', value: 4 },
  { text: '申诉中', value: 5 },
  { text: '协商中', value: 6 },
  { text: '驳回申诉', value: 7 }
]

// 补款类型
export const compensationTypeFilters = [
  { text: '--', value: 1 },
  { text: '不支持补款', value: 2 },
  { text: '申请后补款', value: 3 },
  { text: '申诉后补款', value: 4 },
  { text: '破损转补款', value: 5 },
]

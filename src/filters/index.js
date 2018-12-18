// set function parseTime,formatTime to filter
export { parseTime, formatTime } from '@/utils'

function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/* 数字 格式化*/
export function numberFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

export function toThousandslsFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

// 经营主体
export function businessEntity(value) {
  const statusMap = {
    1: '个人',
    2: '企业',
  }
  return statusMap[value]
}
// 渠道属性
export function channelProp(value) {
  const statusMap = {
    1: 'DLQD(独立渠道)',
    2: 'DFQD(代发渠道)',
    3: 'FXQD(分销渠道)',
    4: 'FXZQD(分销子渠道)',
  }
  return statusMap[value]
}
// 渠道属性
export function cooperationType(value) {
  const statusMap = {
    1: '渠道入驻',
    2: '渠道变更',
  }
  return statusMap[value]
}
// 渠道类别
export function channelType(value) {
  const statusMap = {
    1: '淘宝C店',
    2: '淘宝企业店',
    3: '天猫店',
    4: 'B2C平台',
  }
  return statusMap[value]
}
// 渠道级别
export function channelLevel(value) {
  const statusMap = {
    1: 'A级渠道',
    2: 'B级渠道',
    3: 'C级渠道',
    4: 'D级渠道',
  }
  return statusMap[value]
}

// 合同状态
export function contractStatus(value) {
  const statusMap = {
    100: '生效',
    '-100': '到期终止',
    '-200': '提前终止',
    '-300': '违规终止',
    '-400': '强制注销',
  }
  return statusMap[value]
}

// 保证金状态
export function securityAmountStatus(value) {
  const statusMap = {
    0: '未缴纳',
    1: '已缴纳',
  }
  return statusMap[value]
}

// 合同属性
export function contractProp(value) {
  const statusMap = {
    1: '首次签订',
    10: '自动续约',
    20: '再次签订',
  }
  return statusMap[value]
}

// 职务
export function job(value) {
  const statusMap = {
    1: '渠道联系人',
    2: '技术对接人',
    3: '采购',
    4: '收货人',
    5: '业务',
    6: '财务',
    7: '其他',
  }
  return statusMap[value]
}

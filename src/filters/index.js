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
export function channelPropFilter(value) {
  const statusMap = {
    1: '独立渠道（DLQD）',
    // 2: 'DFQD',
    3: '分销渠道（FXQD）',
    4: '分销子渠道（FXZQD）',
    5: '吾蜜（WORMIR）'
  }
  return statusMap[value]
}
// 渠道属性
export function cooperationTypeFilter(value) {
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
    5: '--',
    0: '--',
  }
  return statusMap[value]
}

// 合同状态
export function contractStatus(value) {
  const statusMap = {
    10: '未生效',
    100: '自动续签',
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

// 订单状态
export function orderStatus(value) {
  const statusMap = {
    10: '待付定金',
    20: '已付定金，待平台方审核',
    25: '已付定金，待品牌方审核',
    30: '待备货',
    35: '缺货等待',
    40: '完成备货，待付尾款',
    50: '已付尾款，待平台方审核',
    55: '已付尾款，待品牌方审核',
    60: '等待发货',
    70: '等待收货',
    200: '完成订单',
    '-10': '申请取消',
    '-50': '取消订单，待退款',
    '-100': '取消订单',
    '-110': '取消订单，待退订金',
    '-120': '取消订单，已退订金',
    '-130': '取消订单，待退全款',
    '-140': '取消订单，已退全款',
  }
  return statusMap[value]
}


// 操作类型
export function operateType(value) {
  const statusMap = {
    1: '强制注销',
    2: '注销审核',
    3: '终止审核',
    4: '注销渠道',
    5: '终止渠道',
  }
  return statusMap[value]
}

// 品牌状态
export function brandStatusFilter(value) {
  const statusMap = {
    1: '正常供货',
    2: '停止供货',
    3: '待定'
  }
  return statusMap[value]
}

// 商品属性
export function propertyOfGoodsFilter(value) {
  const statusMap = {
    1: '新品',
    2: '常规',
    3: '促销',
  }
  return statusMap[value]
}

// 商品状态
export function goodsStatusFilter(value) {
  const statusMap = {
    1: '正常销售',
    2: '停止销售',
  }
  return statusMap[value]
}

// 渠道状态
export function channelStatusFilter(value) {
  const statusMap = {
    50: '待审核',
    '-50': '停止审核',
    '-40': '驳回申请',
    100: '待签合同',
    '-100': '停止签合同',
    200: '待激活账号',
    '-200': '停止激活账号',
    300: '待付保证金',
    400: '待接系统',
    '-300': '停止付保证金',
    '-400': '停止接系统',
    '-350': '不返还保证金',
    '-950': '待返还保证金',
    '-900': '已返还保证金',
  }
  return statusMap[value]
}

// 渠道终止类型
export function channelTerminationTypeFilter(value) {
  const statusMap = {
    '-100': '到期终止',
    '-200': '提前终止',
    '-300': '违规终止',
    '-400': '强制终止',
  }
  return statusMap[value]
}

// 技术对接类型
export function technologyTransferStatusFilter(value) {
  const statusMap = {
    '-1': '未系统对接',
    1: '完成系统对接',
    2: '继续系统对接',
    3: '停止系统对接',
  }
  return statusMap[value]
}

// 合同属性类型
export function contractSigningTypeFilter(value) {
  const statusMap = {
    1: '首次签订',
    2: '再次签订',
  }
  return statusMap[value]
}

// 渠道终止类型
export function channelTypeFilter(value) {
  const statusMap = {
    1: '淘宝C店',
    2: '淘宝企业店',
    3: '天猫店',
    4: 'B2C平台',
  }
  return statusMap[value]
}

// 品牌转授权类型
export function sublicenseFilter(value) {
  const statusMap = {
    1: '转授权',
    2: '非转授权',
  }
  return statusMap[value]
}

// 供货类型
export function discountTargetObjFilter(value) {
  const statusMap = {
    1: '一般贸易',
    2: '跨境贸易',
    3: '一般贸易+跨境贸易',
  }
  return statusMap[value]
}

// 系统使用
export function flowFilter(value) {
  const statusMap = {
    1: '全部使用常规流程',
    2: '部分使用特殊流程',
  }
  return statusMap[value]
}

// 商品组成
export function makeUpOfGoodsFilter(value) {
  const statusMap = {
    1: '单品',
    2: '套组',
  }
  return statusMap[value]
}

// 运输方式
export function transportationFilter(value) {
  const statusMap = {
    1: 'By Air',
    2: 'By Sea',
  }
  return statusMap[value]
}
export function transportationFilterZh(value) {
  const statusMap = {
    1: '空运',
    2: '海运',
  }
  return statusMap[value]
}

// 货款类型
export function paymentTypeFilter(value) {
  const statusMap = {
    30: '30%订金',
    60: '70%余款',
  }
  return statusMap[value]
}

// 付款类型
export function paymentStatusFilter(value) {
  const statusMap = {
    1: '待付货款',
    2: '待确认到帐',
    3: '已确认到账',
  }
  return statusMap[value]
}


// 瑕疵订单-补款状态
export function compensationStatusFilter(value) {
  const statusMap = {
    0: '申请补款',
    1: '待审核',
    2: '待补款',
    3: '已补款',
    4: '驳回申请',
    5: '申诉中',
    6: '协商中',
    7: '驳回申诉',
  }
  return statusMap[value]
}

// 补款类型（方式）
export function compensationTypeFilter(value) {
  const statusMap = {
    1: '——',
    2: '不支持补款',
    3: '申请后补款',
    4: '申诉后补款',
    5: '破损转补款',
  }
  return statusMap[value]
}

// 申诉理由
export function appealReasonFilter(value) {
  const statusMap = {
    1: '给予顾客补款，顾客体验相对好',
    2: '给予顾客补款，尽力避免退货',
    3: '给予顾客补款，减少带来投诉',
    4: '请求吾蜜公司介入协商',
    5: '商品有瑕疵，申请转补款继续销售',
    6: '商品破损严重，只能接受退款',
  }
  return statusMap[value]
}

// 破损订单-退款状态
export function refundStatusFilter(value) {
  const statusMap = {
    0: '申请退款',
    1: '待审核',
    2: '待退款',
    3: '已退款',
    4: '驳回申请',
    5: '申诉中',
    6: '协商中',
    7: '驳回申诉',
  }
  return statusMap[value]
}

// 退款类型（方式）
export function refundTypeFilter(value) {
  const statusMap = {
    1: '——',
    2: '不支持退款',
    3: '申请后退款',
    4: '申诉后退款',
  }
  return statusMap[value]
}

// 申请审核结果
export function applicationReviewResultFilter(value) {
  const statusMap = {
    1: '同意申请',
    2: '驳回申请',
    3: '破损转补款',
  }
  return statusMap[value]
}

// 申诉审核结果
export function appealReviewResultFilter(value) {
  const statusMap = {
    1: '同意申请',
    2: '驳回申请',
    3: '破损转补款',
  }
  return statusMap[value]
}

// 少货商品退款状态
export function lessCargoRefundStatusFilter(value) {
  const statusMap = {
    0: '申请退款',
    1: '待审核',
    2: '待退款',
    3: '已退款',
  }
  return statusMap[value]
}

// 少货退款类型（方式）
export function lessCargoRefundTypeFilter(value) {
  const statusMap = {
    1: '——',
    2: '少货退款',
  }
  return statusMap[value]
}

import request from '@/utils/request'

export function fetchGoods(data) {
  return request({
    url: '/stocks/list.do',
    method: 'post',
    data
  })
}

// 商品库存详情
export function getGoodsInventory(data) {
  return request({
    url: '/stocks/stockDetailIndex.do',
    method: 'post',
    data
  })
}

// 商品箱码
export function getBoxNo(data) {
  return request({
    url: '/stocks/boxCodeIndex.do',
    method: 'post',
    data
  })
}

// 商品箱码溯源码
export function getSourceCode(goodsNo, boxCode) {
  return request({
    url: '/stocks/boxCodeSourceCode.do',
    method: 'post',
    data: { goodsNo, boxCode }
  })
}

// 扫码入库页,得到要执行扫码操作的商品和规格数据
export function scanWarehouseEntryView(goodsNo) {
  return request({
    url: '/stocks/scanWarehouseEntryView.do',
    method: 'post',
    data: { goodsNo }
  })
}

// 扫码入库操作
export function scanWarehouseEntry(data) {
  return request({
    url: '/stocks/scanWarehouseEntry.do',
    method: 'post',
    data
  })
}

// 箱码检查
export function checkBoxNo(brandNo, boxCode) {
  return request({
    url: '/stocks/checkBoxCodeAction.do',
    method: 'post',
    data: { brandNo, boxCode }
  })
}

// 问题商品

export function issueGoods(data) {
  return request({
    url: '/issueGoods/list.do',
    method: 'post',
    data
  })
}

// 溯源码生成
export function generateCode(brandNo, batchNum, batchNo = 123) {
  return request({
    url: '/backSourceCode/generateCodeAction.do',
    method: 'post',
    data: { brandNo, batchNum, batchNo }
  })
}

// 溯源码列表
export function backSourceCodeList(brandNo) {
  return request({
    url: '/backSourceCode/list.do',
    method: 'post',
    data: { brandNo }
  })
}

// 获取已发送溯源码批次列表
export function sourceCodeToEmail(page = 0, order = 'desc', sort = 'createTime') {
  return request({
    url: '/sourceCodeToEmail/list.do',
    method: 'post',
    data: { page, order, sort }
  })
}

export function sourceCodeSendEmail(brandNo, emailObj, batchNo) {
  return request({
    url: '/backSourceCode/sendMailAction.do',
    method: 'post',
    data: { brandNo, emailObj, batchNo }
  })
}

// 重发溯源码
export function sourceCodeResend(data) {
  return request({
    url: '/sourceCodeToEmail/resendEmail.do',
    method: 'post',
    data
  })
}

// 箱码生成
export function generateBoxCode(brandNo, batchNum, batchNo = 123) {
  return request({
    url: '/boxCode/generateCodeAction.do',
    method: 'post',
    data: { brandNo, batchNum, batchNo }
  })
}

export function boxCodeSendEmail(brandNo, emailObj, batchNo) {
  return request({
    url: '/boxCode/sendMailAction.do',
    method: 'post',
    data: { brandNo, emailObj, batchNo }
  })
}

// 获取已发送箱码批次列表
export function boxCodeToEmail(page = 0, order = 'desc', sort = 'createTime') {
  return request({
    url: '/boxCodeToEmail/list.do',
    method: 'post',
    data: { page, order, sort }
  })
}

// 重发箱码
export function boxCodeResend(data) {
  return request({
    url: '/boxCodeToEmail/resendEmail.do',
    method: 'post',
    data
  })
}
export function boxCodeList(brandNo, keyword = '') {
  return request({
    url: '/boxCode/list.do',
    method: 'post',
    data: { brandNo, keyword }
  })
}

export function getGoodsListStore(brandNo, keyword = '', sqlColumn = '') {
  return request({
    url: '/stocks/getGoodsList.do',
    method: 'post',
    data: { brandNo, keyword, sqlColumn }
  })
}

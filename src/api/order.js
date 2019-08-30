/* eslint-disable */

import request from '@/utils/request'

export function requestOrderGenerate(params) {
    return request({
        url: '/goodsInfo/list.do',
        method: 'post',
        data: params
    })
}
export function requestOrderList(params) {
    return request({
        url: '/order/orderList.do',
        method: 'post',
        data: params
    })
}
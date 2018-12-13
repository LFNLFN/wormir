import request from '@/utils/request'
import store from '@/store'

export function loginByUsername(username, password) {
  return request({
    url: '/user/login.do',
    method: 'post',
    data: {
      'employeeNumber': username,
      'password': password
    }
  })
}

export function logout() {
  return request({
    url: '/user/logout.do',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/userinfo.do',
    method: 'post',
    data: { 'token': store.getters.token }
  })
}


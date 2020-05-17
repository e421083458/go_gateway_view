import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin_login/login',
    method: 'post',
    data
  })
}

export function changePwd(data) {
  return request({
    url: '/admin/change_pwd',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/admin/admin_info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/admin_login/logout',
    method: 'get'
  })
}

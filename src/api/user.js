import request from '@/utils/request'

// login
export function login(data) {
  return request({
    url: '/admin_login/login',
    method: 'post',
    data
  })
}

// change_pwd
export function changePwd(data) {
  return request({
    url: '/admin/change_pwd',
    method: 'post',
    data
  })
}

// admin_info
export function getInfo(token) {
  return request({
    url: '/admin/admin_info',
    method: 'get',
    params: { token }
  })
}

// logout
export function logout() {
  return request({
    url: '/admin_login/logout',
    method: 'post'
  })
}

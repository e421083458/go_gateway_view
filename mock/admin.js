const adminInfo = { 'errno': 0, 'errmsg': '', 'data': { 'id': 1, 'name': 'admin', 'avatar': 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif', 'introduction': 'I am a super administrator', 'roles': ['admin'], 'login_time': '2020-04-17T09:05:12.86868+08:00' }, 'trace_id': '', 'stack': null }

export default [
  // admin_info
  {
    url: '/admin/admin_info',
    type: 'get',
    response: config => {
      return adminInfo
    }
  },
  // change_pwd
  {
    url: '/admin/change_pwd',
    type: 'post',
    response: config => {
      return { 'errno': 0, 'errmsg': '', 'data': '', 'trace_id': '', 'stack': null }
    }
  },

  // user login
  {
    url: '/admin_login/login',
    type: 'post',
    response: config => {
      return { 'errno': 0, 'errmsg': '', 'data': { 'token': 'admin' }, 'trace_id': '', 'stack': null }
    }
  },

  // user logout
  {
    url: '/admin_login/logout',
    type: 'post',
    response: config => {
      return { 'errno': 0, 'errmsg': '', 'data': '', 'trace_id': '', 'stack': null }
    }
  }
]

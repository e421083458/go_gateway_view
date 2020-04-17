
export default [
  // app_list
  {
    url: '/app/app_list',
    type: 'get',
    response: config => {
      return { 'errno': 0, 'errmsg': '', 'data': { 'list': [{ 'id': 32, 'app_id': 'app_id_b', 'name': '租户A', 'secret': '8d7b11ec9be0e59a36b52f32366c09cb', 'white_ips': '', 'qpd': 0, 'qps': 0, 'real_qpd': 0, 'real_qps': 0, 'create_at': '0001-01-01T00:00:00Z', 'update_at': '0001-01-01T00:00:00Z', 'is_delete': 0 }, { 'id': 31, 'app_id': 'app_id_a', 'name': '租户B', 'secret': '449441eb5e72dca9c42a12f3924ea3a2', 'white_ips': 'white_ips', 'qpd': 100000, 'qps': 100, 'real_qpd': 100, 'real_qps': 2, 'create_at': '0001-01-01T00:00:00Z', 'update_at': '0001-01-01T00:00:00Z', 'is_delete': 0 }], 'total': 2 }, 'trace_id': '', 'stack': null }
    }
  },
  // app_detail
  {
    url: '/app/app_detail\.*',
    type: 'get',
    response: config => {
      return { 'errno': 0, 'errmsg': '', 'data': { 'id': 32, 'app_id': 'app_id_b', 'name': '租户A', 'secret': '8d7b11ec9be0e59a36b52f32366c09cb', 'white_ips': '', 'qpd': 0, 'qps': 0, 'create_at': '2020-04-15T21:40:52+08:00', 'update_at': '2020-04-15T21:57:31+08:00', 'is_delete': 0 }, 'trace_id': '', 'stack': null }
    }
  },
  // app_delete
  {
    url: '/app/app_delete\.*',
    type: 'get',
    response: config => {
      return { 'errno': 0, 'errmsg': '', 'data': '', 'trace_id': '', 'stack': null }
    }
  },
  // app_stat
  {
    url: '/app/app_stat\.*',
    type: 'get',
    response: config => {
      return { 'errno': 0, 'errmsg': '', 'data': { 'today': [5, 10, 20, 48, 50, 55, 60, 80, 100, 180, 200], 'yesterday': [12, 20, 23, 57, 25, 48, 76, 69, 140, 200, 250, 345, 500, 550, 780, 670, 650, 500, 488, 480, 440, 360, 200, 105] }, 'trace_id': '', 'stack': null }
    }
  }

]

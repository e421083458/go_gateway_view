
export default [
  // get flow_stat
  {
    url: '/dashboard/flow_stat',
    type: 'get',
    response: config => {
      return { 'errno': 0, 'errmsg': '', 'data': { 'today': [78, 23, 78, 123, 325, 378, 456, 478, 500, 800, 760], 'yesterday': [120, 50, 10, 57, 59, 48, 76, 69, 200, 400, 580, 1500, 2500, 2300, 1300, 1700, 1900, 1000, 800, 570, 500, 360, 200, 105] }, 'trace_id': '', 'stack': null }
    }
  },

  // get service_stat
  {
    url: '/dashboard/service_stat',
    type: 'get',
    response: config => {
      return { 'errno': 0, 'errmsg': '', 'data': { 'data': [{ 'name': 'HTTP', 'value': 1 }, { 'name': 'TCP', 'value': 2 }, { 'name': 'GRPC', 'value': 3 }], 'legend': ['HTTP', 'TCP', 'GRPC'] }, 'trace_id': '', 'stack': null }
    }
  },

  // get panel_group_data
  {
    url: '/dashboard/panel_group_data',
    type: 'get',
    response: config => {
      return { 'errno': 0, 'errmsg': '', 'data': { 'appNum': 5, 'currentQps': 13, 'serviceNum': 5, 'todayRequestNum': 2000 }, 'trace_id': '', 'stack': null }
    }
  }
]

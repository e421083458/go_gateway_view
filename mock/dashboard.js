
export default [
  // get flow_stat
  {
    url: '/dashboard/flow_stat',
    type: 'get',
    response: config => {
      return { 'errno': 0, 'errmsg': '', 'data': { 'today': [78, 23, 78, 123, 325, 378, 456, 478, 500, 800, 760], 'yesterday': [120, 140, 160, 180, 200, 250, 300, 500, 900, 1200, 1500, 1600, 1550, 1300, 1100, 900, 800, 750, 600, 570, 500, 360, 200, 105] }, 'trace_id': '', 'stack': null }
    }
  },

  // get service_stat
  {
    url: '/dashboard/service_stat',
    type: 'get',
    response: config => {
      return { 'errno': 0, 'errmsg': '', 'data': { 'data': [{ 'name': 'HTTP', 'value': 1 }, { 'name': 'TCP', 'value': 1 }, { 'name': 'GRPC', 'value': 1 }], 'legend': ['HTTP', 'TCP', 'GRPC'] }, 'trace_id': '', 'stack': null }
    }
  },

  // get panel_group_data
  {
    url: '/dashboard/panel_group_data',
    type: 'get',
    response: config => {
      return { 'errno': 0, 'errmsg': '', 'data': { 'appNum': 2, 'currentQps': 13, 'serviceNum': 3, 'todayRequestNum': 2000 }, 'trace_id': '', 'stack': null }
    }
  }
]

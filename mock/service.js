
export default [
  // admin_info
  {
    url: '/service/service_list',
    type: 'get',
    response: config => {
      return { 'errno': 0, 'errmsg': '', 'data': { 'list': [{ 'id': 58, 'load_type': 2, 'service_addr': '127.0.0.1:8012', 'service_name': 'test_grpc_service', 'service_desc': '测试GRPC服务', 'create_at': '2020-04-15T08:13:58+08:00', 'update_at': '2020-04-15T07:59:46+08:00', 'qps': 0, 'qpd': 50, 'total_node': 2 }, { 'id': 57, 'load_type': 1, 'service_addr': '127.0.0.1:8011', 'service_name': 'test_tcp_service', 'service_desc': '测试TCP代理', 'create_at': '2020-04-16T00:55:05+08:00', 'update_at': '2020-04-15T07:58:39+08:00', 'qps': 0, 'qpd': 25, 'total_node': 2 }, { 'id': 56, 'load_type': 0, 'service_addr': '127.0.0.1:8081/test_http_service', 'service_name': 'test_http_service', 'service_desc': '测试HTTP代理', 'create_at': '2020-04-16T00:54:45+08:00', 'update_at': '2020-04-15T07:55:07+08:00', 'qps': 1, 'qpd': 200, 'total_node': 2 }], 'total': 3 }, 'trace_id': '', 'stack': null }
    }
  },

  // change_pwd
  {
    url: '/service/service_detail\.*',
    type: 'get',
    response: config => {
      return { 'errno': 0, 'errmsg': '', 'data': { 'info': { 'id': 58, 'load_type': 2, 'service_name': 'test_grpc_service', 'service_desc': '测试GRPC服务', 'create_at': '2020-04-15T08:13:58+08:00', 'update_at': '2020-04-15T07:59:46+08:00', 'is_delete': 0 }, 'http_rule': { 'id': 0, 'service_id': 0, 'rule_type': 0, 'rule': '', 'need_https': 0, 'need_websocket': 0, 'need_strip_uri': 0, 'url_rewrite': '', 'header_transfor': '' }, 'tcp_rule': { 'id': 0, 'service_id': 0, 'port': 0 }, 'grpc_rule': { 'id': 173, 'service_id': 58, 'port': 8012, 'header_transfor': 'add meta_name meta_value' }, 'load_balance': { 'id': 186, 'service_id': 58, 'check_method': 0, 'check_timeout': 2, 'check_interval': 5, 'round_type': 2, 'ip_list': '127.0.0.1:50001,127.0.0.1:50002', 'weight_list': '50,50', 'forbid_list': '', 'upstream_connect_timeout': 0, 'upstream_header_timeout': 0, 'upstream_idle_timeout': 0, 'upstream_max_idle': 0 }, 'access_control': { 'id': 186, 'service_id': 58, 'open_auth': 0, 'black_list': '', 'white_list': '', 'white_host_name': '', 'clientip_flow_limit': 0, 'service_flow_limit': 0 }}, 'trace_id': '', 'stack': null }
    }
  },
  // app_delete
  {
    url: '/service/service_delete\.*',
    type: 'get',
    response: config => {
      return { 'errno': 0, 'errmsg': '', 'data': '', 'trace_id': '', 'stack': null }
    }
  },
  // change_pwd
  {
    url: '/service/service_stat\.*',
    type: 'get',
    response: config => {
      return { 'errno': 0, 'errmsg': '', 'data': { 'today': [78, 23, 78, 123, 325, 378, 456, 478, 500, 800, 760], 'yesterday': [120, 50, 10, 57, 59, 48, 76, 69, 200, 400, 580, 1500, 2500, 2300, 1300, 1700, 1900, 1000, 800, 570, 500, 360, 200, 105] }, 'trace_id': '', 'stack': null }
    }
  }
]

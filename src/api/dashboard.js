import request from '@/utils/request'

export function panelGroupData(query) {
  return request({
    url: '/dashboard/panel_group_data',
    method: 'get',
    params: query
  })
}

export function flowStat(query) {
  return request({
    url: '/dashboard/flow_stat',
    method: 'get',
    params: query
  })
}

export function serviceStat(query) {
  return request({
    url: '/dashboard/service_stat',
    method: 'get',
    params: query
  })
}

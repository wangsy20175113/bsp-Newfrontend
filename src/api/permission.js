import request from '@/utils/request'

export function getPermissionRoute(data) {
  return request({
    url: '/permission/getPermissionRoute',
    method: 'post',
    data
  })
}

import request from '@/utils/request'

export function getAllRoles() {
  return request({
    url: '/permission/getAllRoles',
    method: 'get',
  })
}

export function addOrUpdateRole(role, operationFlag) {
  return request({
    url: '/permission/addOrUpdateRole',
    method: 'post',
    data: role,
    params: {
      operationFlag: operationFlag
    }
  })
}


export function deleteRole(role) {
  return request({
    url: '/permission/deleteRole',
    method: 'post',
    data: role,
  })
}

export function getAllPermission(data) {
  return request({
    url: '/permission/getAllPermissions',
    method: 'post',
    data
  })
}


export function getAllParentRoute() {
  return request({
    url: '/permission/getAllParentRoute',
    method: 'post',
  })
}


export function getAllChildrenRouteByParent(data) {
  return request({
    url: '/permission/getChildrenRouteByParent',
    method: 'post',
    data
  })
}



export function addOrUpdatePermission(data, operationFlag) {
  return request({
    url: '/permission/addOrUpdatePermission',
    method: 'post',
    data,
    params: {
      operationFlag: operationFlag
    }
  })
}


export function deletePermission(data) {
  return request({
    url: '/permission/deletePermission',
    method: 'post',
    data
  })
}

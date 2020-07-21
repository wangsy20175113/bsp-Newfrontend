import request from '@/utils/request'

export function getFlow() {
    return request({
      url: 'wallet/getFlow',
      method: 'post',
    })
  }

  export function auditFlow(data) {
    return request({
      url: 'wallet/auditFlow',
      method: 'post',
      data: data
    })
  }

import request from '../utils/request'

export function checkAccount(wdata) {
  return request({
    url: '/wallet/checkAccount',
    method: 'post',
    data:
    wdata
  })
}

export function addAccount(wdata) {
  return request({
    url: '/wallet/addAccount',
    method: 'post',
    data: wdata
  })
}



export function getFund(data) {
  return request({
    url: '/wallet/getFund',
    method: 'post',
    data: data
  })
}

export function withdraw(wdata) {
  return request({
    url: '/wallet/withdraw',
    method: 'post',
    data: wdata
  })
}

export function getTransactionalRecord(data) {
  return request({
    url: '/wallet/getTransactionalRecord',
    method: 'post',
    data: data
  })
}



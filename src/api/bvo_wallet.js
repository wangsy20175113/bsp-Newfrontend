import request from '@/utils/request'

export function login(loginInfo) {
  return request({
    url: '/wallet/checkAccount',
    method: 'post',
    data: loginInfo
  })
}

export function register(data) {
  return request({
    url: '/wallet/addAccount',
    method: 'post',
    data: data
  })
}

export function getBalance(data) {
  return request({
    url: '/wallet/getFund',
    method: 'post',
    data: data
  })
}

export function changePassword(data,newPassword) {
  return request({
    url: '/wallet/changePassword',
    method: 'post',
    data: data,
    params: {
      'newPassword': newPassword
    }
  })
}


export function loadTransactionRecords(data) {
  return request({
    url: '/wallet/getTransactionalRecord',
    method: 'post',
    data: data
  })
}

export function deposit(data) {
  return request({
    url: '/wallet/deposit',
    method: 'post',
    data: data
  })
}


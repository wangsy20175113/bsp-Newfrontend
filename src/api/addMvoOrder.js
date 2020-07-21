import request from '@/utils/request'

export function getAwaitingPayment(data) {
    return request({
      url: 'order/getAwaitingPayment',
      method: 'post',
      data: data
    })
  }

export function getAwaitingShipment(data) {
    return request({
      url: 'order/getAwaitingShipment',
      method: 'post',
      data: data
    })
  }

export function getShiped(data) {
    return request({
      url: 'order/getShiped',
      method: 'post',
      data: data
    })
  }

  export function getCompleted(data) {
    return request({
      url: 'order/getCompleted',
      method: 'post',
      data: data
    })
  }
  export function getCancelled(data) {
    return request({
      url: 'order/getCancelled',
      method: 'post',
      data: data
    })
  }
  export function deliver(data) {
    return request({
      url: 'order/deliver',
      method: 'post',
      data: data
    })
  }
  export function cancelOrder(data) {
    return request({
      url: 'order/cancelOrder',
      method: 'post',
      data: data
    })
  }

  export function getTrack(data) {
    return request({
      url: 'order/getTrack',
      method: 'post',
      data: data
    })
  }

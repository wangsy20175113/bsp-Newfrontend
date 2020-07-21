import request from '@/utils/request'

export function getDsrId(user_id) {
  console.log("api--getDsr:"+user_id);
  return request({
    url: '/order/getDsr',
    method: 'post',
    data: user_id
  })
}

export function getAwaitingPaymentData(dsr_id) {
  console.log("api--getAwaitingPaymentData:"+dsr_id);
  return request({
    url: '/order/getBvoAwaitingPayment',
    method: 'post',
    data:{dsr_id}
  })
}

export function getAwaitingShipmentData(dsr_id) {
  console.log("api--getAwaitingShipmentData:"+dsr_id);
  return request({
    url: '/order/getBvoAwaitingShipment',
    method: 'post',
    data:{dsr_id}
  })
}

export function getShipmentData(dsr_id) {
  return request({
    url: '/order/getBvoShiped',
    method: 'post',
    data:{dsr_id}
  })
}

export function getCompletedData(dsr_id) {
  return request({
    url: '/order/getBvoCompleted',
    method: 'post',
    data:{dsr_id}
  })
}

export function getCanceledData1(dsr_id) {
  return request({
    url: '/order/getBvoCancelled',
    method: 'post',
    data:{
      dsr_id
    }
  })
}

export function getTrack(data) {
  return request({
    url: 'order/getTrack',
    method: 'post',
    data: data
  })
}

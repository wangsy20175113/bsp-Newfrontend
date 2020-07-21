import request from '@/utils/request'

export function loadAddressData(sto_id) {
  console.log("api--loadAddressData:"+sto_id);
  return request({
    url: '/order/getShippingAddress',
    method: 'post',
    data: {sto_id}
  })
}

export function pay(data,man_id) {
  return request({
    url: '/wallet/pay',
    method: 'post',
    data: data,
    params: {
      'man_id': man_id
    }
  })
}

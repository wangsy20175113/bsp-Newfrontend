import request from '@/utils/request'

export function  getEbayStoreList(store) {
  console.log("---api/getEbayStoreList----")
  return request({
    url: '/bvo/getEbayStore',
    method: 'post',
    data:store
  })
}

export function  getAmazonStoreList(store) {
  console.log("getAmazonStoreList")
  return request({
    url: '/bvo/getAmazonStore',
    method: 'post',
    data:store

  })
}

export function  pushEbayStores(items) {
  console.log("getAmazonStoreList")
  return request({
    url: '/bvo/addDropShipItem',
    method: 'post',
    data:items
  })
}

export function  pushAmazonStores(items) {
  console.log("getAmazonStoreList")
  return request({
    url: '/bvo/addDropShipItem',
    method: 'post',
    data:items
  })
}

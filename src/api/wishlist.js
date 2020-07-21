import request from '@/utils/request'

export function getWishListProducts(dsr_id) {
  console.log("调用getWishListProducts");
  return request({
    url: '/bvo/getWishListProducts',
    method: 'post',
    data:{
      dsr_id
    }
  })
}

export function removeWishlist(wit_id) {
  console.log("调用getWishListProducts");
  return request({
    url: '/bvo/deleteWishList',
    method: 'post',
    data:wit_id
  })
}

export function addToWishList(data) {
  console.log("调用addWishListProducts");
  return request({
    url: '/bvo/addWishList',
    method: 'post',
    data:data
  })
}


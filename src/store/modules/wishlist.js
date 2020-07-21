import { getWishListProducts,removeWishlist,addToWishList } from '@/api/wishlist'

const wishlist = {
  actions:{
    GetWishListProducts({commit},dsr_id){
      console.log("wishlist-----调用getWishListProducts")
      return new Promise((resolve,reject)=>{
        getWishListProducts(dsr_id).then(response => {
          commit('')
          resolve(response)
        }).catch(error => {
          console.log("获取失败");
          reject(error)
        })
      })
    },
    RemoveWishlist({commit},wit_id){
      console.log("wishlist-----调用RemoveWishlist")
      return new Promise((resolve,reject)=>{
        removeWishlist(wit_id).then(response => {
          commit('')
          resolve(response)
        }).catch(error => {
          console.log("删除失败");
          reject(error)
        })
      })
    },
    AddToWishList({commit},form){
      console.log("wishlist-----调用AddWishlist")
      return new Promise((resolve,reject)=>{
        addToWishList(form).then(response => {
          commit('')
          resolve(response)
        }).catch(error => {
          console.log("添加失败");
          reject(error)
        })
      })
    }
  }
}

export default wishlist


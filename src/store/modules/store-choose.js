import { getEbayStoreList,getAmazonStoreList,pushEbayStores,pushAmazonStores} from '@/api/store-choose'

const storechoose = {

  actions:{
    GetEbayStoreList({commit},store){
      console.log("------GetEbayStoreList-----")
      return new Promise((resolve,reject)=>{
        getEbayStoreList(store).then(response => {
          commit('')
          resolve(response)
        }).catch(error => {
          console.log("获取失败");
          reject(error)
        })
      })
    },
    GetAmazonStoreList({commit},store){
      console.log("调用GetProductList")
      return new Promise((resolve,reject)=>{
        getAmazonStoreList(store).then(response => {
          commit('')
          resolve(response)
        }).catch(error => {
          console.log("获取失败");
          reject(error)
        })
      })
    },
    PushEbayStores({commit},items){
      return new Promise((resolve,reject)=>{
        pushEbayStores(items).then(response => {
          commit('')
          resolve(response)
        }).catch(error => {
          console.log("获取失败");
          reject(error)
        })
      })
    },
    PushAmazonStores({commit},items){
      return new Promise((resolve,reject)=>{
        pushAmazonStores(items).then(response => {
          commit('')
          resolve(response)
        }).catch(error => {
          console.log("获取失败");
          reject(error)
        })
      })
    },

  }
}

export default storechoose


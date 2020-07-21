import { loadProductDetailByPRO_ID } from '@/api/product-detail'

const productdetail = {

  actions:{
    LoadProductDetailByPRO_ID({commit},title){
      return new Promise((resolve,reject)=>{
        loadProductDetailByPRO_ID(title).then(response => {
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

export default productdetail


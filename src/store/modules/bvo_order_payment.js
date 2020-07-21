import { loadAddressData,pay} from '@/api/bvo_order_payment'

const bvo_order_payment = {
  actions:{
    LoadAddressData({commit},sto_id){
      console.log("LoadAddressData:"+sto_id)
      return new Promise((resolve,reject)=>{
        loadAddressData(sto_id).then(response => {
          commit('')
          resolve(response)
        }).catch(error => {
          console.log("获取失败");
          reject(error)
        })
      })
    },
    Pay({commit},data){
      return new Promise((resolve,reject)=>{
        pay(data.WalletAccount,data.man_id).then(response => {
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

export default bvo_order_payment

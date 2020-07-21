import { getAwaitingPaymentData,
  getAwaitingShipmentData,
  getShipmentData,
  getCompletedData,
  getDsrId,
  getTrack} from '@/api/bvo_orderlist'

const bvo_orderlist = {
  actions:{
    GetDsrId({commit},user_id){
      console.log("store--GetDsr:"+user_id);
      return new Promise((resolve,reject)=>{
        getDsrId(user_id).then(response => {
          commit('')
          resolve(response)
        }).catch(error => {
          console.log("获取失败");
          reject(error)
        })
      })
    },
    GetAwaitingPaymentData({commit},dsr_id){
      return new Promise((resolve,reject)=>{
        getAwaitingPaymentData(dsr_id).then(response => {
          commit('')
          resolve(response)
        }).catch(error => {
          console.log("获取失败");
          reject(error)
        })
      })
    },
    GetAwaitingShipmentData({commit},dsr_id){
      return new Promise((resolve,reject)=>{
        getAwaitingShipmentData(dsr_id).then(response => {
          commit('')
          resolve(response)
        }).catch(error => {
          console.log("删除失败");
          reject(error)
        })
      })
    },
    GetShipmentData({commit},dsr_id){
      return new Promise((resolve,reject)=>{
        getShipmentData(dsr_id).then(response => {
          commit('')
          resolve(response)
        }).catch(error => {
          console.log("添加失败");
          reject(error)
        })
      })
    },
    GetCompletedData({commit},dsr_id){
      return new Promise((resolve,reject)=>{
        getCompletedData(dsr_id).then(response => {
          commit('')
          resolve(response)
        }).catch(error => {
          console.log("获取失败");
          reject(error)
        })
      })
    },
    GetCanceledData({commit},dsr_id){
      return new Promise((resolve,reject)=>{
        getCanceledData1(dsr_id).then(response => {
          commit('')
          resolve(response)
        }).catch(error => {
          console.log("获取失败");
          reject(error)
        })
      })
    },
    GetTrack({ commit }, data) {
      console.log("进入GetTrack:"+data)
      return new Promise((resolve, reject) => {
        getTrack(data).then(response => {
          commit('')
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default bvo_orderlist


import { getAwaitingPayment,getAwaitingShipment,getShiped,getCompleted,
    getCancelled,deliver,cancelOrder,getTrack} from '../../api/addMvoOrder'
  
    const mvoOrder = {
      actions: {
        GetAwaitingPayment({ commit }, data) {
            console.log("进入getAwaitingPayment:"+data)
              return new Promise((resolve, reject) => {
                getAwaitingPayment(data).then(response => {
                  commit('')
                  resolve(response)
              }).catch(error => {
                  reject(error)
              })
              })
          },
          GetAwaitingShipment({ commit }, data) {
            console.log("进入GetAwaitingShipment:"+data)
            return new Promise((resolve, reject) => {
                getAwaitingShipment(data).then(response => {
                commit('')
                resolve(response)
            }).catch(error => {
                reject(error)
            })
            })
        },
        GetShiped({ commit }, data) {
            console.log("进入GetShiped:"+data)
            return new Promise((resolve, reject) => {
                getShiped(data).then(response => {
                commit('')
                resolve(response)
            }).catch(error => {
                reject(error)
            })
            })
        },
        GetCompleted({ commit }, data) {
            console.log("进入GetCompleted:"+data)
            return new Promise((resolve, reject) => {
                getCompleted(data).then(response => {
                commit('')
                resolve(response)
            }).catch(error => {
                reject(error)
            })
            })
        },
        GetCancelled({ commit }, data) {
            console.log("进入 GetCancelled:"+data)
            return new Promise((resolve, reject) => {
                getCancelled(data).then(response => {
                commit('')
                resolve(response)
            }).catch(error => {
                reject(error)
            })
            })
        },
        Deliver({ commit }, data) {
            console.log("进入Deliver:"+data)
            return new Promise((resolve, reject) => {
                deliver(data).then(response => {
                commit('')
                resolve(response)
            }).catch(error => {
                reject(error)
            })
            })
        },
        CancelOrder({ commit }, data) {
            console.log("进入CancelOrder:"+data)
            return new Promise((resolve, reject) => {
                cancelOrder(data).then(response => {
                commit('')
                resolve(response)
            }).catch(error => {
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
  export default mvoOrder
  
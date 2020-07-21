import {getAmazonStores, getEBayStores, addStore, getDsr} from '../../api/storeHandler'

const product = {
  actions: {

    GetAmazonStores({ commit },data) {
      return new Promise((resolve, reject) => {
        getAmazonStores(data).then(response => {
          commit('')
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetEBayStores({ commit },data) {
      return new Promise((resolve, reject) => {
        getEBayStores(data).then(response => {
          commit('')
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    AddStore({ commit }, data) {
      return new Promise((resolve, reject) => {
        addStore(data.store).then(response => {
          commit('')
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetDsr ({ commit },user_id) {
      return new Promise((resolve, reject) => {
        getDsr(user_id).then(response => {
          commit('')
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default product

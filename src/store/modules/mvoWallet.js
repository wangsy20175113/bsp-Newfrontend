import {checkAccount, addAccount, getFund, withdraw, getTransactionalRecord} from '../../api/mvowalletHandler'

const product = {
  actions: {

    CheckAccount({ commit },data) {
      return new Promise((resolve, reject) => {
        checkAccount(data).then(response => {
          commit('')
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    AddAccount({ commit },data) {
      return new Promise((resolve, reject) => {
        addAccount(data).then(response => {
          commit('')
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetFund({ commit }, data) {
      return new Promise((resolve, reject) => {
        getFund(data).then(response => {
          commit('')
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    Withdraw ({ commit },data) {
      return new Promise((resolve, reject) => {
        withdraw(data).then(response => {
          commit('')
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetTransactionRecord ({ commit },data) {
      return new Promise((resolve, reject) => {
        getTransactionalRecord(data).then(response => {
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

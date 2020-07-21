import { getProducts, getProductsByTitle, addAndupdateProduct, deleteProduct } from '../../api/productHandler'

const product = {
  actions: {

    GetProducts({ commit }) {
      return new Promise((resolve, reject) => {
        getProducts().then(response => {
          commit('')
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    AddAndUpdateProduct({ commit }, data) {
      return new Promise((resolve, reject) => {
        addAndupdateProduct(data.product, data.operationFlag).then(response => {
          commit('')
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DeleteProduct({ commit }, data) {
      return new Promise((resolve, reject) => {
        deleteProduct(data).then(response => {
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

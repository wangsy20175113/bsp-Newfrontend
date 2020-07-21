import { getFlow,auditFlow} from '../../api/addAdminWallet'
const adminWallet = {
    actions: {
        GetFlow({ commit }) {
          console.log("进入getFlow:")
            return new Promise((resolve, reject) => {
                getFlow().then(response => {
                commit('')
                resolve(response)
            }).catch(error => {
                reject(error)
            })
            })
        },
        AuditFlow({ commit }, data) {
          console.log("进入AuditFlow:")
          console.log(data)
          return new Promise((resolve, reject) => {
            auditFlow(data).then(response => {
              commit('')
              resolve(response)
          }).catch(error => {
              reject(error)
          })
          })
      }
   
     
  }
}
export default adminWallet

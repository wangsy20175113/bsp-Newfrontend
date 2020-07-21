import { login,register,getBalance,loadTransactionRecords,changePassword,deposit} from '@/api/bvo_wallet'

const bvo_wallet = {
  actions:{
    WalletLogin({commit},loginInfo){
      console.log("Login"+loginInfo);
      return new Promise((resolve,reject)=>{
        login(loginInfo).then(response => {
          commit('')
          resolve(response)
        }).catch(error => {
          console.log("登录失败");
          reject(error)
        })
      })
    },
    Register({commit},data){
      return new Promise((resolve,reject)=>{
        register(data).then(response => {
          commit('')
          resolve(response)
        }).catch(error => {
          console.log("注册失败");
          reject(error)
        })
      })
    },
    GetBalance({commit},data){
      return new Promise((resolve,reject)=>{
        getBalance(data).then(response => {
          commit('')
          resolve(response)
        }).catch(error => {
          console.log("获取失败");
          reject(error)
        })
      })
    },
    LoadTransactionRecords({commit},data){
      return new Promise((resolve,reject)=>{
        loadTransactionRecords(data).then(response => {
          commit('')
          resolve(response)
        }).catch(error => {
          console.log("获取失败");
          reject(error)
        })
      })
    },
    ChangePassword({commit},data){
      return new Promise((resolve,reject)=>{
        changePassword(data,data.newpassword).then(response => {
          commit('')
          resolve(response)
        }).catch(error => {
          console.log("获取失败");
          reject(error)
        })
      })
    },

    Deposit({commit},data){
      return new Promise((resolve,reject)=>{
        deposit(data).then(response => {
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



export default bvo_wallet


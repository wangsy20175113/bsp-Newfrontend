import {
  fetchList,
  deleteRecord,
  addRecord,
  updateRecord,
  searchRecord,
  changeState,
  addAndUpdateProductCategory
} from '../../api/product-category'
import { getAllProductCategory } from '@/api/product-category'


const productCategory = {

  actions: {
    DeleteRecord({commit},data){
      return new Promise((resolve,reject)=>{
        deleteRecord(data).then(response=>{
          commit('')
          resolve(response)
        }).catch(error=>{
          console.log("获取失败");
          reject(error)
        })
      })
    },
    AddRecord({commit},productInfo){
      return new Promise((resolve,reject)=>{
        console.log(productInfo)
        addRecord(productInfo.PRC_ID, productInfo.TITLE, productInfo.CATEGORY_NAME,productInfo.SECOND_CATEGORY, productInfo.image).then(response=>{
          commit('')
          resolve(response)
        }).catch(error=>{

          console.log("添加失败");
          reject(error);
        })
      })
    },
    UpdateRecord({commit},productInfo){
      return new Promise((resolve,reject)=>{
        updateRecord(productInfo.PRC_ID, productInfo.TITLE, productInfo.CATEGORY_NAME, productInfo.SECOND_CATEGORY, productInfo.image).then(response=>{
          commit('')
          resolve(response)
        }).catch(error=>{
          console.log("更新失败");
          reject(error);
        })
      })
    },
   SearchRecord({commit},TITLE){
      return new Promise((resolve,reject)=>{
        searchRecord(TITLE).then(response=>{
          commit('')
          resolve(response)
        }).catch(error=>{
          console.log("查询失败");
          reject(error);
        })
      })
    },
    ChangeState({commit},para){
      return new Promise((resolve,reject)=>{
        changeState(para.PRC_ID, para.state).then(response=>{
          commit('')
          resolve(response)
        }).catch(error=>{
          console.log("操作失败");
          reject(error);
        })
      })
    },
    addAndUpdateProductCategory({commit}, form) {
      return new Promise((resolve,reject)=>{
        addAndUpdateProductCategory(form.productCategory, form.operationFlag).then(response=>{
          commit('')
          resolve(response)
        }).catch(error=>{
          console.log("操作失败");
          reject(error);
        })
      })
    },
    getAllProductCategory({commit}) {
      return new Promise((resolve,reject)=>{
        getAllProductCategory().then(response=>{
          commit('')
          resolve(response)
        }).catch(error=>{
          console.log("操作失败");
          reject(error);
        })
      })
    }

  }
}

export default productCategory

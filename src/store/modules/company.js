import { addManufacturer ,updateManufacturer,deleteBrand,addBrand,updateBrand,getManByFilter,
  getBrandByFilter,deleteAllBrand} from '../../api/addCompany'

  const company = {
    actions: {
        AddManufacturer({ commit }, maninfo) {
            return new Promise((resolve, reject) => {
                addManufacturer(maninfo.name_en, maninfo.name_cn, maninfo.gmc_report_type, maninfo.gmc_report_url,
                  maninfo.description, maninfo.created_by, maninfo.creation_date, maninfo.last_update_by, maninfo.last_update_date, maninfo.call_cnt, maninfo.remark, maninfo.sts_cd, maninfo.user_id).then(response => {
                commit('')
                resolve(response)
            }).catch(error => {
                reject(error)
            })
            })
        },
      UpdateManufacturer({ commit }, maninfo) {
        console.log("进入UpdateManufacturer:name_en: "+maninfo.name_en+" name_cn:"+maninfo.name_cn+" man_id: "+maninfo.man_id)
        return new Promise((resolve, reject) => {
          updateManufacturer(maninfo.man_id,maninfo.name_en, maninfo.name_cn, maninfo.gmc_report_type, maninfo.gmc_report_url,
            maninfo.description, maninfo.created_by, maninfo.creation_date, maninfo.last_update_by, maninfo.last_update_date, maninfo.call_cnt, maninfo.remark, maninfo.sts_cd, maninfo.user_id).then(response => {
              commit('')
            resolve(response)
          }).catch(error => {
            reject(error)
          })
        })
      },

      DeleteBrand ({ commit }, brd_id) {
        return new Promise((resolve, reject) => {
          deleteBrand(brd_id).then(response => {
            commit('')
            resolve(response)
          }).catch(error => {
            reject(error)
          })
        })
      },
      UpdateBrand({ commit }, brandinfo) {
        console.log("进入UpdateBrand:",brandinfo)
        return new Promise((resolve, reject) => {
          updateBrand(brandinfo.brd_id,brandinfo.man_id,brandinfo.name_en,brandinfo.name_cn, brandinfo.img_url).then(response => {
            commit('')
            resolve(response)
          }).catch(error => {
            reject(error)
          })
        })
      },


    AddBrand({ commit }, brandinfo) {
      console.log("进入AddBrand:name_en: "+brandinfo.name_en+" name_cn:"+brandinfo.name_cn+" man_id: "+brandinfo.man_id)
      return new Promise((resolve, reject) => {
        addBrand(brandinfo.man_id,brandinfo.name_en,brandinfo.name_cn, brandinfo.img_url).then(response => {
          commit('')
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetManByFilter ({ commit },maninfo) {
      return new Promise((resolve, reject) => {
        getManByFilter(maninfo.man_id,maninfo.name_en, maninfo.name_cn, maninfo.gmc_report_type, maninfo.gmc_report_url,
          maninfo.description, maninfo.created_by, maninfo.creation_date, maninfo.last_update_by, maninfo.last_update_date, maninfo.call_cnt, maninfo.remark, maninfo.sts_cd, maninfo.user_id).then(response => {
          commit('')
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    GetBrandByFilter({ commit }, data) {
      return new Promise((resolve, reject) => {
        getBrandByFilter(data).then(response => {
          commit('')
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
     },
     DeleteAllBrand({ commit }, data) {
      return new Promise((resolve, reject) => {
        deleteAllBrand(data).then(response => {
          commit('')
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
     }
     
 
  }
}
export default company

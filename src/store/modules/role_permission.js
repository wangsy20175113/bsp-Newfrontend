import { getAllRoles, addOrUpdateRole, deleteRole, getAllPermission, getAllChildrenRouteByParent, getAllParentRoute, addOrUpdatePermission, deletePermission } from '@/api/role_permission'

const state = {
 role_list: [],
 current_role: ''
}

const mutations = {

  SET_ROLE_LIST(state, role_list) {
    state.role_list = role_list
  },

  SET_CURRENT_ROLE(state, role) {
    state.current_role = role
  }

}

const actions = {
  getAllRoles({ commit }) {
    return new Promise((resolve, reject) => {
      getAllRoles().then(response => {
        console.log(response)
        const {data} = response
        commit("SET_ROLE_LIST", data)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  addOrUpdateRole({commit}, roleForm) {
    return new Promise((resolve, reject) => {
      addOrUpdateRole(roleForm.role, roleForm.operationFlag).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  deleteRole({commit}, roleForm) {
    return new Promise((resolve, reject) => {
      deleteRole(roleForm).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  getAllPermissions({}, role){
    return new Promise((resolve, reject) => {
      getAllPermission(role).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },


  getAllParentRoute({}){
    return new Promise((resolve, reject) => {
      getAllParentRoute().then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },


  getAllChildrenRouteByParent({}, data){
    return new Promise((resolve, reject) => {
      getAllChildrenRouteByParent(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },


  addOrUpdatePermission({}, data){
    return new Promise((resolve, reject) => {
      addOrUpdatePermission(data.permission, data.operationFlag).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  deletePermission({}, data) {
    return new Promise((resolve, reject) => {
      deletePermission(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

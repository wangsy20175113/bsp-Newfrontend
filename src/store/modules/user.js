import { login, logout, getInfo, addUser,getVerifyCode } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import { addOrUpdateRole } from '@/api/role_permission'

const state = {
  role: '',
  username: '',
  response_status: '',
  user_id: '',
  token: getToken()
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ROLE: (state, role) => {
    state.role = role
  },
  SET_USERID: (state, user_id) => {
    state.user_id = user_id
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { token, data } = response
        // console.log("++++++++token+++++++++"+token)
        // console.log(data)
        commit('SET_TOKEN', token)
        // console.log("++++++++role+++++++++"+state.role)
        // console.log("++++++++user_id+++++++++"+state.user_id)
        setToken(state.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  getInfo({ commit }, token) {
    return new Promise((resolve, reject) => {
      getInfo(token).then(response => {
        // console.log("++++response+++++", response)
        const { data } = response
        console.log("data==================", data)
        commit('SET_ROLE', data.role)
        commit('SET_USERID', data.user_id)
        console.log(state.user_id)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },


  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLE', '')
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLE', '')
      removeToken()
      resolve()
    })
  },

  addUser({}, data) {
    return new Promise((resolve, reject) => {
      addUser(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  getVerifyCodeNumber({}) {
    return new Promise((resolve, reject) => {
      getVerifyCode().then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

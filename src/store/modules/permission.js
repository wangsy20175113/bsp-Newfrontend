import {asyncRoutes, constantRoutes, resetRouter} from '@/router'
import {getPermissionRoute} from '@/api/permission'
import {logout} from "@/api/user";
import {removeToken} from "@/utils/auth";

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(role, route) {
  // console.log(route.meta)
  if (route.meta && route.meta.roles) {
    return route.meta.roles.includes(role)
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: [],
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    // state.routes = constantRoutes.concat(routes)
    state.routes = routes
  }
}

const actions = {

  generateRoutes({commit}, role) {
    console.log(role)

    let permission_routes
    return new Promise((resolve, reject) => {
      if (role.role_id === 0) {
        let accessed_routes
        console.log('yes!!!!!!!!!!!!!!!!!!!!!!!!!')
        accessed_routes = asyncRoutes||[]
        commit('SET_ROUTES', accessed_routes)
        resolve(accessed_routes)
      } else {
        getPermissionRoute(role).then(response => {
          console.log(response)
          // reset visited views and cached views
          // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
          permission_routes = response.data
          const res = []
          permission_routes.forEach(permission_route => {
            asyncRoutes.forEach(route => {
              const tmp = {...route}
              // console.log(tmp)
              // console.log(permission_route)
              if (tmp.hidden || tmp.name === permission_route.parentRoute.parent_route_name) {
                if (!permission_route.childrenRoute) {
                  res.push(tmp)
                } else if(tmp.children) {
                  const childrenRes = []
                  tmp.children.forEach(children_route => {
                    const children_tmp = {...children_route}
                    // console.log(children_tmp)
                    if (children_tmp.hidden || children_tmp.name === permission_route.childrenRoute.children_route_name) {
                      // console.log("yesyes!!!!!!!!!!!!!!!!!!!!!!!")
                      childrenRes.push(children_tmp)
                    }
                  })
                  tmp.children = childrenRes
                  res.push(tmp)
                  //console.log("tmp========================")
                }
              }
            })
          })
          // console.log("res========"+res)
          for (let i = 1; i < res.length;) {
            console.log("res[i]==================", res[i])
            if (res[i].name === res[i-1].name) {
              res[i].children = res[i-1].children.concat(res[i].children)
              res.splice(i-1, 1)
            } else {
              i++;
            }
          }
          commit('SET_ROUTES', res)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      }
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

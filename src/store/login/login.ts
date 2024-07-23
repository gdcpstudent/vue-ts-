import { Module } from 'vuex'
import { IRootState } from '../types'
import { ILoginState } from './type'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoled
} from '@/service/login/login'
import router from '@/router'

import LocalCache from '@/utils/cache'
import { IAccount } from '@/service/login/type'
import { mapMenusToRoutes, mapMenuToPermissions } from '@/utils/map-menus'

// Module<本模块的类型，根模块的类型>,尖括号里面需要传入两个泛型
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
      //  将userMenus映射到 routes里面  userMenus => routes
      // 将routes 添加到  = >router.main.children
      const routes = mapMenusToRoutes(userMenus)
      // console.log(routes)
      routes.forEach((route) => {
        router.addRoute('main', route)
      })

      //获取用户按钮权限
      const permissions = mapMenuToPermissions(userMenus)
      state.permissions = permissions
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      // 1.实现登录逻辑
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      LocalCache.setCache('token', token)

      //发送初始化请求（完整的role/department）
      dispatch('getInitialDataAction', null, { root: true })

      //2.请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      // console.log(userInfoResult.data.token)
      const userInfo = userInfoResult.data
      // console.log(userInfo)
      commit('changeUserInfo', userInfo)
      LocalCache.setCache('userInfo', userInfo)

      //3.请求用户菜单信息
      const userMenuResult = await requestUserMenusByRoled(userInfo.role.id)
      const userMenus = userMenuResult.data
      commit('changeUserMenus', userMenus)
      LocalCache.setCache('userMenus', userMenus)
      // 4.跳到首页
      router.push('/main')
    },
    async loadLocalLogin({ commit, dispatch }) {
      const token = LocalCache.getCache('token')
      if (token) {
        commit('changeToken', token)
        //发送初始化请求（完整的role/department）
        dispatch('getInitialDataAction', null, { root: true })
      }

      const userInfo = LocalCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }

      const userMenus = LocalCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}
export default loginModule

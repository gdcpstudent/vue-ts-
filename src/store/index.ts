import { Store, createStore, useStore as useVuexStore } from 'vuex'
import { IRootState, IStoreType } from './types'

import system from './main/system/system'
import { getPageListData } from '@/service/main/system/system'
import login from './login/login'
import dashboard from './main/analysis/dashboard'
const store = createStore<IRootState>({
  //给createStore指定类型
  state: () => {
    return {
      name: 'zlj',
      password: '123456',
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  getters: {},
  mutations: {
    // 修改state中的数据，对部门和角色数据进行修改
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      //1. 请求部门数据
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentResult.data
      //2. 请求角色数据
      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data
      //3. 请求菜单数据
      const menuResult = await getPageListData('/menu/list', {})
      console.log(menuResult)
      const { list: menuList } = menuResult.data

      //2 保存数据
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
      commit('changeEntireMenu', menuList)
    }
  },
  modules: {
    login,
    system,
    dashboard
  }
})
// 初始化的时候，将本地的数据进行读取
export function setupStore() {
  //对store里面的数据进行初始化
  store.dispatch('login/loadLocalLogin')
  // store.dispatch('getInitialDataAction')
}

export function userStore(): Store<IStoreType> {
  return useVuexStore()
}
export default store

import { Module } from 'vuex'

import { IRootState } from '@/store/types'
import { IDashboardState } from './types'

import {
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getAddressGoodsSale
} from '@/service/analysis/dashboard'
const dashboardModule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: []
    }
  },
  mutations: {
    changeCategoryGoodsCount(state, list) {
      state.categoryGoodsCount = list
    },
    changeCategoryGoodsSale(state, list) {
      state.categoryGoodsSale = list
    },
    changeCategoryGoodsFavor(state, list) {
      state.categoryGoodsFavor = list
    },
    changeAddressGoodsSale(state, list) {
      state.addressGoodsSale = list
    }
  },
  actions: {
    // 请求数据，必修要发送action
    async getDashboardDataAction({ commit }) {
      const categoryGoodsCountResult = await getCategoryGoodsCount()
      const categoryGoodsSaleResult = await getCategoryGoodsSale()
      const categoryGoodsFavorResult = await getCategoryGoodsFavor()
      const getAddressGoodsSaleResult = await getAddressGoodsSale()
      // console.log(categoryGoodsCountResult)
      // console.log(categoryGoodsSaleResult)
      // console.log(categoryGoodsFavorResult)
      // console.log(getAddressGoodsSaleResult)
      commit('changeCategoryGoodsCount', categoryGoodsCountResult.data)
      commit('changeCategoryGoodsSale', categoryGoodsSaleResult.data)
      commit('changeCategoryGoodsFavor', categoryGoodsFavorResult.data)
      commit('changeAddressGoodsSale', getAddressGoodsSaleResult.data)
    }
  }
}

export default dashboardModule

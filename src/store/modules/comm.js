import Vue from 'vue'
import mutationTypes from '../mutationTypes'

export default {
  state: {
    globalLoadingCount: 0,
    globalLoading: false,
    globalError: false,
    loadingCount: {},
    loading: {},
    error: {}
  },
  mutations: {
    [mutationTypes.addLoading] (state, actionType) {
      state.globalLoadingCount++
      state.globalLoading = true
      if (actionType) {
        if (!state.loadingCount[actionType]) {
          Vue.set(state.loadingCount, actionType, 1)
          Vue.set(state.loading, actionType, true)
        } else {
          state.loadingCount[actionType]++
          state.loading[actionType] = true
        }
      }
    },
    [mutationTypes.subLoading] (state, actionType) {
      state.globalLoadingCount--
      state.globalLoading = (state.globalLoadingCount > 0)
      if (actionType) {
        if (!state.loadingCount[actionType]) {
          Vue.set(state.loadingCount, actionType, 0)
          Vue.set(state.loading, actionType, false)
        } else {
          state.loadingCount[actionType]--
          state.loading[actionType] = (state.loadingCount[actionType] > 0)
        }
      }
    },
    [mutationTypes.hasError] (state, actionType) {
      state.globalError = true
      if (actionType) {
        state.error[actionType] = true
      }
    },
    [mutationTypes.clearError] (state, actionType) {
      state.globalError = false
      if (actionType) {
        state.error[actionType] = false
      }
    }
  }
}

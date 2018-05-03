import untils from '../../shared/untils/index'
import mutationTypes from '../mutationTypes'
import actionTypes from '../actionTypes'

export default {
  state: {
    userInfo: {},
    allWorkInfo: []
  },
  mutations: {
    [mutationTypes.getUserInfo] (state, userInfo) {
      state.userInfo = userInfo
    },
    [mutationTypes.getAllWorkInfo] (state, allWorkInfo) {
      state.allWorkInfo = allWorkInfo
    }
  },
  actions: {
    increment (context) {
      untils.createApi.get({
        config: {
          url: '/getUserInfo'
        },
        success: (res) => {
          context.commit(mutationTypes.getUserInfo, res)
        }
      }, context)
    },
    [actionTypes.getTaskInfo] (context) {
      untils.createApi.get({
        config: {
          url: '/getTaskInfo',
          params: {
            taskId: '5ae6dc3eee920a00431b4449'
          }
        },
        success: (res) => {
          console.log(res)
        }
      }, context)
    },
    [actionTypes.getAllWorkInfo] (context) {
      untils.createApi.get({
        config: {
          url: '/getAllWorkInfo'
        },
        success: (res) => {
          context.commit(mutationTypes.getAllWorkInfo, res)
        }
      }, context)
    },
    [actionTypes.logOut] (context) {
      untils.createApi.get({
        config: {
          url: '/logOut'
        },
        success: () => {
          context.commit(mutationTypes.getUserInfo, {})
        }
      }, context)
    }
  }
}

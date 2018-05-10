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
    [actionTypes.getUserInfo] (context) {
      untils.createApi.get({
        config: {
          url: '/getUserInfo'
        },
        success: (res) => {
          context.commit(mutationTypes.getUserInfo, res)
        }
      }, context)
    },
    [actionTypes.saveWork] (context, workInfo) {
      untils.createApi.post({
        config: {
          url: '/saveWork',
          data: {
            name: workInfo.name,
            url: workInfo.url,
            desc: workInfo.desc,
            cycleTime: workInfo.cycleTime,
            cycleTimeType: workInfo.cycleTimeType
          }
        },
        success: () => {
          context.dispatch(actionTypes.getAllWorkInfo)
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

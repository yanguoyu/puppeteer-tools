import untils from '../../shared/untils/index'
import mutationTypes from '../mutationTypes'
import actionTypes from '../actionTypes'

export default {
  state: {
    userInfo: {},
    allWorkInfo: [],
    activeIndex: '1',
    activeName: null
  },
  mutations: {
    [mutationTypes.getUserInfo] (state, userInfo) {
      state.userInfo = userInfo
    },
    [mutationTypes.getAllWorkInfo] (state, allWorkInfo) {
      state.allWorkInfo = allWorkInfo
    },
    [mutationTypes.changeActiveIndex] (state, { curIndex, curWorkName }) {
      console.log(curIndex)
      state.activeIndex = curIndex
      state.activeName = curWorkName
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
            ...workInfo,
            dbInfo: workInfo.useSql ? workInfo.dbInfo : null
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
    [actionTypes.loginByGithub] (context) {
      window.location.href = `${process.env.HOST_APT}login/loginIn`
    },
    [actionTypes.hasLogin] (context) {
      untils.createApi.get({
        config: {
          url: '/login/hasLogin'
        },
        success: (res) => {
          if (res) {
            window.location.href = '#/'
          }
        }
      })
    },
    [actionTypes.logOut] (context) {
      untils.createApi.get({
        config: {
          url: '/logOut'
        },
        success: () => {
          window.location.href = '#/login'
        }
      }, context)
    }
  }
}

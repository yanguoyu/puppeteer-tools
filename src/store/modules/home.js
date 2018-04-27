import untils from '../../shared/untils/index'
import mutationTypes from '../mutationTypes'

export default {
  state: {
    userInfo: {}
  },
  mutations: {
    [mutationTypes.getUserInfo] (state, userInfo) {
      state.userInfo = userInfo
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
    }
  }
}

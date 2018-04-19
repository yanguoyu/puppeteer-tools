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
          url: 'http://127.0.0.1:7001/getUserInfo'
        },
        success: (res) => {
          context.commit(mutationTypes.getUserInfo, res)
        }
      }, context)
    }
  }
}

import untils from '../../shared/untils/index'
import mutationTypes from '../mutationTypes'
import actionTypes from '../actionTypes'

export default {
  state: {
    urlInfo: [],
    shotUrl: ''
  },
  mutations: {
    [mutationTypes.getUrlPage] (state, urlInfo) {
      state.urlInfo = urlInfo
    },
    [mutationTypes.shotUrl] (state, shotUrl) {
      state.shotUrl = shotUrl
    }
  },
  actions: {
    [actionTypes.getUrlPageAc] (context, { pageUrl, selector }) {
      untils.createApi.get({
        config: {
          url: '/getHtmlModel',
          params: {
            url: pageUrl,
            selector
          }
        },
        success: (res) => {
          context.commit(mutationTypes.getUrlPage, res)
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
            desc: workInfo.desc
          }
        },
        success: () => {
          context.dispatch(actionTypes.getAllWorkInfo)
        }
      }, context)
    },
    [actionTypes.excuteWork] (context, { workId }) {
      untils.createApi.get({
        config: {
          url: '/shotEle',
          params: {
            workId
          }
        },
        success: (res) => {
          context.commit(mutationTypes.shotUrl, res)
        }
      }, context)
    }
  }
}

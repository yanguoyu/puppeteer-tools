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
    [actionTypes.saveWork] (context) {
      untils.createApi.post({
        config: {
          url: '/saveWork',
          data: {
            name: 'firTest',
            url: 'https://github.com/login',
            operatorItems: [
              {
                selector: {
                  select: '.auth-form-body>input',
                  sameSelectIndex: 0
                },
                eventType: 'Input',
                value: '841185308@qq.com'
              },
              {
                selector: {
                  select: '.auth-form-body>input',
                  sameSelectIndex: 1
                },
                eventType: 'Input',
                value: '149162ygy'
              },
              {
                selector: {
                  select: '.auth-form-body>input',
                  sameSelectIndex: 2
                },
                eventType: 'Click',
                waitForNavigation: true
              }
            ]
          }
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

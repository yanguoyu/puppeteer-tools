import untils from '../../shared/untils/index'
import mutationTypes from '../mutationTypes'
import actionTypes from '../actionTypes'

export default {
  state: {
    urlInfo: [],
    shotUrl: '',
    allTaskInfo: []
  },
  mutations: {
    [mutationTypes.getUrlPage] (state, urlInfo) {
      state.urlInfo = urlInfo
    },
    [mutationTypes.shotUrl] (state, shotUrl) {
      state.shotUrl = shotUrl
    },
    [mutationTypes.getAllTask] (state, allTaskInfo) {
      state.allTaskInfo = allTaskInfo
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
    [actionTypes.excuteTask] (context, taskId) {
      untils.createApi.get({
        config: {
          url: '/excuteTask',
          params: {
            taskId
          }
        },
        success: (res) => {
          context.dispatch(actionTypes.getAllWorkInfo)
        }
      }, context)
    },
    [actionTypes.getAllTask] (context, workId) {
      untils.createApi.get({
        config: {
          url: '/getAllTask',
          params: {
            workId
          }
        },
        success: (res) => {
          context.commit(mutationTypes.getAllTask, res)
        }
      }, context)
    },
    [actionTypes.saveTask] (context, {taskInfo, workId}) {
      var opItem = []
      for (let i = 0; i < taskInfo.preOp.length; ++i) {
        opItem.push(...taskInfo.preOp[i].items.map(value => ({
          selector: value.selector,
          eventType: value.eventType,
          value: value.value,
          waitForNavigation: value.waitForNavigation
        })))
      }
      opItem.push(...taskInfo.operatorItems.map(value => ({
        selector: {
          select: value.selector,
          sameSelectIndex: value.selectIndex
        },
        eventType: value.eventType,
        value: value.value,
        waitForNavigation: value.waitForNavigation
      })))
      untils.createApi.post({
        config: {
          url: '/saveTask',
          data: {
            name: taskInfo.name,
            workId,
            expectModel: taskInfo.expectModel,
            operatorItems: opItem
          }
        },
        success: () => {
          context.dispatch(actionTypes.getAllWorkInfo)
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
    }
  }
}

import untils from '../../shared/untils/index'
import mutationTypes from '../mutationTypes'
import actionTypes from '../actionTypes'
import Vue from 'vue'

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
    },
    [mutationTypes.updateTask] (state, { index, task }) {
      Vue.set(state.allTaskInfo, index, task)
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
    [actionTypes.excuteTask] (context, {taskId, index, workId}) {
      const curTask = context.state.allTaskInfo[index]
      context.commit(mutationTypes.updateTask, {index, task: {...curTask, lastStatus: 'pending'}})
      untils.createApi.get({
        config: {
          url: '/excuteTask',
          params: {
            taskId: curTask.objectId
          }
        },
        success: (res) => {
          context.commit(mutationTypes.updateTask, {index, task: {...curTask, lastStatus: res.status}})
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
          select: value.select,
          sameSelectIndex: value.sameSelectIndex
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
            expectModel: {
              expectSelectKey: {
                select: taskInfo.expectModel.select,
                sameSelectIndex: taskInfo.expectModel.sameSelectIndex
              },
              ...taskInfo.expectModel
            },
            operatorItems: opItem
          }
        },
        success: () => {
          context.dispatch(actionTypes.getAllTask, workId)
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

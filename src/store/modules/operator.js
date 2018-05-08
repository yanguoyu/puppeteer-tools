import untils from '../../shared/untils/index'
import actionTypes from '../actionTypes'

export default {
  state: {
    allOperatorItems: []
  },
  mutations: {

  },
  actions: {
    [actionTypes.saveOperator] (context, operator) {
      untils.createApi.post({
        config: {
          url: '/saveOperatorItems',
          data: {
            name: operator.name,
            items: operator.items.map(value => ({
              selector: {
                select: value.select,
                sameSelectIndex: value.sameSelectIndex
              },
              eventType: value.eventType,
              value: value.value,
              waitForNavigation: value.waitForNavigation
            }))
          }
        }
      }, context)
    }
  }
}

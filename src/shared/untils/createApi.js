import axios from 'axios'
import mutationTypes from '../../store/mutationTypes'
import httpMethods from './httpMethods'

export function createAxois (httpMethod) {
  return (params, context) => {
    const config = {
      method: httpMethod,
      ...params.config,
      baseURL: 'http://127.0.0.1:7001/'
    }
    context && context.commit(mutationTypes.addLoading)
    context && context.commit(mutationTypes.clearError)
    axios
      .request(config)
      .then(res => {
        if (res.data.code === 30200) {
          window.location.href = res.data.redirectUrl
          return
        }
        context && context.commit(mutationTypes.subLoading)
        if (res.data.code === 20000) {
          params.success && params.success(res.data.result)
        } else {
          params.failed && params.failed(res.error)
        }
      })
      .catch(err => {
        context && context.commit(mutationTypes.hasError)
        params.failed && params.failed(err)
      })
  }
}

const createApi = {}

Object.keys(httpMethods).forEach(value => {
  createApi[httpMethods[value]] = createAxois(value)
})

export default createApi

import axios from 'axios'
import store from '@/store.js'

const API = axios.create({
  baseURL: 'http://localhost:5000/api/v1'
})

function wrapLoading (f) {
  return async () => {
    store.commit('loading', true)
    const result = await f(...arguments)
    store.commit('loading', false)
    return result
  }
}

const Pegawai = {
  list: wrapLoading (() => {
    return API.get('/employers').then(resp => resp.data)
  })
}

export default {
  Pegawai
}

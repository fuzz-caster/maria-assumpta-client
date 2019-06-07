import axios from 'axios'
// import store from '@/store.js'

const API = axios.create({
  baseURL: 'http://localhost:5000/api/v1'
})

// function wrapLoading (f) {
//   return async function() {
//     store.commit('loading', true)
//     const result = await f(...arguments)
//     store.commit('loading', false)
//     return result
//   }
// }

export const Pegawai = {
  list: () => {
    return API.get('/employers').then(resp => resp.data)
  },
  add: payload => {
    return API.post('/employers', payload).then(resp => resp.data)
  },
  remove: id => {
    return API.delete(`/employers/${id}`)
  }
}

export const Member = {
  list: () => {
    return API.get('/members').then(resp => resp.data)
  },
  add: payload => {
    return API.post('/members', payload).then(resp => resp.data)
  },
  remove: id => {
    return API.delete(`/members/${id}`)
  }
}

export const Question = {
  list: () => {
    return API.get('/questions').then(resp => resp.data)
  },
  add: payload => {
    return API.post('/questions', payload).then(resp => resp.data)
  },
  remove: id => {
    return API.delete(`/questions/${id}`)
  },
  update: ({id, payload}) => {
    console.log(payload)
    return API.put(`/questions/${id}`, payload).then(resp => resp.data)
  },
  getOneById: id => {
    return API.get(`/questions/${id}`).then(resp => resp.data)
  }
}

export const Answer = {
  byQuestion: questionId => {
    return API.get(`/questions/${questionId}/answers`).then(resp => resp.data)
  },
  add: payload => {
    return API.post('/answers', payload).then(resp => resp.data)
  },
  remove: id => {
    return API.delete(`/answers/${id}`)
  }
}

export const Criteria = {
  list: () => {
    return API.get('/criterias').then(resp => resp.data)
  }
}

export const CreditRequest = {
  list: () => {
    return API.get('/credit-requests').then(resp => resp.data)
  },
  add: payload => {
    return API.post('/credit-requests', payload).then(resp => resp.data)
  },
  remove: id => {
    return API.get(`/credit-requests/${id}`)
  }
}

export default {
  Pegawai,
  Member,
  Question,
  Answer,
  CreditRequest,
  Criteria
}

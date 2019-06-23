import axios from 'axios'
const API_URL = process.env.VUE_APP_API_URL
// import store from '@/store.js'

export const API = axios.create({
  baseURL: API_URL
})

export const Auth = {
  login: (username, password) => {
    const payload ={ username, password }
    return API.post('/auth', payload).then(resp => resp.data)
  }
}

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
  update: ({ id, payload }) => {
    return API.put(`/members/${id}`, payload).then(resp => resp.data)
  },
  remove: id => {
    return API.delete(`/members/${id}`)
  }
}

export const Question = {
  list: () => {
    return API.get('/questions').then(resp => resp.data)
  },
  listAllNested: () => {
    return API.get('/questions/allNested').then(resp => resp.data)
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
    return API.get(`/questions/${questionId}/answers`)
      .then(resp => resp.data)
      .then(items => items.map(it => ({
        ...it,
        questionId
      })))
  },
  getOneById: id => {
    return API.get(`/answers/${id}`).then(resp => resp.data)
  },
  add: payload => {
    return API.post('/answers', payload).then(resp => resp.data)
  },
  update: ({id, payload}) => {
    return API.put(`/answers/${id}`, payload).then(resp => resp.data)
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
  listSorted: () => {
    return API.get('/profile-matching/run').then(resp => resp.data)
  },
  getOneById: id => {
    return API.get(`/credit-requests/${id}`).then(resp => resp.data)
  },
  add: payload => {
    return API.post('/credit-requests', payload).then(resp => resp.data)
  },
  update: ({ id, payload }) => {
    return API.put(`/credit-requests/${id}`, payload).then(resp => resp.data)
  },
  remove: id => {
    return API.delete(`/credit-requests/${id}`)
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

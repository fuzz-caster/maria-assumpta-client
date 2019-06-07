import Vue from 'vue'
import Vuex from 'vuex'
import Services from '@/services'
import ACTIONS from './actions'

Vue.use(Vuex)

function withStateLoader (f, name) {
  return async (context, payload) => {
    context.commit('loading', true)
    try {
      await f(context, payload)
      context.commit('message', `SUCCESS[ ${name} ]`)
    } catch (err) {
      console.log(`FAIL: [${name}]`)
      context.commit('message', `FAIL[ ${name} ]`)
      console.log(err)
    } finally {
      context.commit('loading', false)
    }
  }
}

export default new Vuex.Store({
  state: {
    loading: false,
    employers: [],
    members: [],
    questions: [],
    answers: [],
    criterias: [],
    lastMessage: 'Hello, Good Person!'
  },
  mutations: {
    loading (state, v) {
      state.loading = v
    },
    employers (state, items) {
      state.employers = items
    },
    members (state, items) {
      state.members = items
    },
    message (state, msg) {
      const d = new Date()
      state.lastMessage = `${d}: ${msg}`
    },
    questions (state, items) {
      state.questions = items
    }
  },
  getters: {
    getQuestionById: (state) => (id) => {
      const intId = parseInt(id)
      // console.log(state)
      const result = state.questions.find(it => {
        // console.log(it)
        return it.id === intId
      })
      // console.log(result)
      return result
    }
  },
  actions: {
    [ACTIONS.EMPLOYERS_LOAD_ITEMS]: async context => {
      const items = await Services.Pegawai.list()
      context.commit('employers', items)
    },

    [ACTIONS.EMPLOYERS_ADD]: withStateLoader(async (context, payload) => {
      await Services.Pegawai.add(payload)
    }, 'add employers'),

    [ACTIONS.EMPLOYERS_DELETE]: withStateLoader(async (context, id) => {
      await Services.Pegawai.remove(id)
    }, 'remove employer'),

    [ACTIONS.MEMBERS_LOAD_ITEMS]: async context => {
      const items = await Services.Member.list()
      context.commit('members', items)
    },

    [ACTIONS.MEMBERS_ADD]: withStateLoader(async (context, payload) => {
      await Services.Member.add(payload)
    }, 'add member'),

    [ACTIONS.QUESTIONS_ADD]: withStateLoader(async (context, payload) => {
      return await Services.Question.add(payload)
    }, 'add question'),

    [ACTIONS.QUESTIONS_LOAD_ITEMS]: async context => {
      const items = await Services.Question.list()
      context.commit('questions', items)
    },

    [ACTIONS.QUESTIONS_UPDATE]: withStateLoader(async (context, { id, payload }) => {
      await Services.Question.update({ id, payload })
    }, 'update question')
  }
})

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
    },
    addAnswers (state, items) {
      const answersId = state.answers.map(it => it.id)
      const notIncluded = items.filter(it => {
        return !answersId.includes(it.id)
      })
      state.answers = [ state.answers, ...notIncluded ]
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
    },
    getAnswersByQuestion: (state) => id => {
      return state.answers.filter(an => an.questionId === id)
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

    [ACTIONS.MEMBER_DELETE]: withStateLoader(async (context, id) => {
      await Services.Member.remove(id)
    }, 'delete member'),

    [ACTIONS.MEMBER_UPDATE]: withStateLoader(async (context, payload) => {
      await Services.Member.update(payload)
    }, 'update member'),

    [ACTIONS.QUESTIONS_ADD]: withStateLoader(async (context, payload) => {
      return await Services.Question.add(payload)
    }, 'add question'),

    [ACTIONS.QUESTIONS_LOAD_ITEMS]: async context => {
      const items = await Services.Question.list()
      context.commit('questions', items)
    },

    [ACTIONS.QUESTIONS_REMOVE]: withStateLoader(async (context, id) => {
      return Services.Question.remove(id)
    }),

    [ACTIONS.QUESTIONS_UPDATE]: withStateLoader(async (context, { id, payload }) => {
      await Services.Question.update({ id, payload })
    }, 'update question'),

    [ACTIONS.QUESTION_LOAD_ANSWERS]: async (context, id) => {
      const answers = await Services.Answer.byQuestion(id)
      context.commit('addAnswers', answers)
    },

    [ACTIONS.QUESTION_ADD_ANSWER]: withStateLoader(async (context, payload) => {
      await Services.Answer.add(payload)
    }, 'add answer'),

    [ACTIONS.QUESTION_REMOVE_ANSWER]: withStateLoader(async (context, id) => {
      await Services.Answer.remove(id)
    }, 'remove answer'),

    [ACTIONS.QUESTION_UPDATE_ANSWER]: withStateLoader(async (context, { id, payload }) => {
      await Services.Answer.update({ id, payload })
    }, 'update answer'),

    [ACTIONS.CREDIT_REQUEST_ADD]: withStateLoader(async (context, payload) => {
      await Services.CreditRequest.add(payload)
    }),

    [ACTIONS.CREDIT_REQUEST_UPDATE]: withStateLoader(async (context, payload) => {
      await Services.CreditRequest.update(payload)
    }, 'update pengajuan pinjaman'),

    [ACTIONS.CREDIT_REQUEST_REMOVE]: withStateLoader(async (context, id) => {
      await Services.CreditRequest.remove(id)
    }, 'hapus pengajuan pinjaman')
  }
})

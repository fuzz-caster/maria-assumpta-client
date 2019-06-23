<template>
  <div id="credit-request-add">
    <v-layout row>
      <v-flex xs12 md6 class="mx-auto">
        <v-card>
          <v-toolbar flat height="70">
            <v-spacer></v-spacer>
            <v-toolbar-title>Detail Pengajuan Kredit</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-layout row>
              <v-flex xs12 class="text-xs-center">
                <v-avatar size="100" dark color="primary">
                  <span class="display-1 white--text">{{ member.nama[0] }}</span>
                </v-avatar>
                <div class="title my-2">{{ member.nama }}</div>
                <div class="body-2 grey--text">{{ member.tanggalLahir }}</div>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-text style="position: relative;">
            <v-btn
                :disabled="dataInvalid"
                @click="save"
                fixed
                dark
                fab
                top
                right
                color="primary"
                style="top: 80px;"
              >
              <v-icon>check</v-icon>
            </v-btn>
            <v-list class="outer-list">
              <template v-for="item in questions">
                <v-list-tile :key="`question-li-it-${item.id}`" avatar>
                  <v-list-tile-content>
                    <v-list-tile-sub-title class="body-2 grey--text text--darken-4"> 
                      <span>
                        {{ item.text }}
                      </span>
                    </v-list-tile-sub-title>
                    <v-radio-group :key="`ans-rad-group-${item.id}`" v-model="item.answerId">
                      <template v-for="answer in item.answers">
                        <v-radio :key="`ans-rad-item-${answer.id}`" :value="answer.id" :label="answer.text"></v-radio>
                      </template>
                    </v-radio-group>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider :key="`question-li-div-${item.id}`" class="my-4"/>
              </template>
            </v-list>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { CreditRequest } from '@/services'
import Actions from '@/store/actions'

export default {
  name: 'CreditRequestEdit',
  props: ['id'],
  data: () => ({
    member: {
      id: undefined,
      nama: ' ',
      tanggalLahir: undefined,
      sex: undefined
    },
    questions: [],
    answers: []
  }),
  computed: {
    dataInvalid () {
      if (this.member.id === undefined) {
        return true
      }
      return this.questions.some(q => q.answerId === undefined)
    }
  },
  methods: {
    async loadData () {
      this.$store.commit('loading', true)
      try {
        const cr = await CreditRequest.getOneById(this.id)
        let answers = cr.answers
        answers.sort(an => an.question.showOrder)
        let questions = answers.map(an => {
          let answerId = an.id
          return {
            ...an.question,
            answerId
          }
        })
        questions.sort(q => q.showOrder)
        this.member = cr.member
        this.questions = questions
      } catch (err) {
        alert('Gagal memuat data')
      } finally {
        this.$store.commit('loading', false)
      }
    },
    save () {
      const id = this.id
      const answerList = this.questions.map(q => q.answerId)
      const payload = {
        id,
        payload: {
          answerList
        }
      }
      this.$store.dispatch(Actions.CREDIT_REQUEST_UPDATE, payload)
        .then(() => {
          this.$router.back()
        })
    }
  },
  mounted () {
    this.loadData()
  }
}
</script>

<style lang="scss">
#credit-request-add {

  .outer-list {
    .v-list__tile__avatar {
      align-self: self-start;
    }
  }

  .v-list__tile--avatar {
    height: auto;
  }

  .v-list__tile__title, .v-list__tile__sub-title {
    white-space: normal;
    overflow: initial;
  }

  .v-list__tile__sub-title {
    display: flex;
    flex-direction: row;
    margin-top: 0px;
  }

  .v-list__tile__content {
    .layout.row {
      flex-grow: 1;
      width: 100%;
    }
  }
}
</style>

<template>
  <div id="credit-request-add">
    <v-layout row>
      <v-flex xs12 md6 class="mx-auto">
        <v-card>
          <v-toolbar flat height="70">
            <v-toolbar-title>Input Data Pengajuan Kredit</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-select label="Pilih Anggota" :items="membersOptions" v-model="memberId"/>
          </v-card-text>
          <v-card-text style="position: relative;">
            <v-btn
                :disabled="dataInvalid"
                @click="add"
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
              <template v-for="(item, index) in questions">
                <v-list-tile :key="`question-li-it-${item.id}`" avatar>
                  <v-list-tile-content>
                    <v-list-tile-sub-title class="body-2 grey--text text--darken-4"> 
                      <span>
                        {{ index + 1 }}. {{ item.text }}
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
import { Member, Question } from '@/services'
import Actions from '@/store/actions'

export default {
  data: () => ({
    memberId: undefined,
    membersOptions: [],
    questions: [],
    answers: []
  }),
  computed: {
    dataInvalid () {
      if (this.memberId === undefined) {
        return true
      }
      return this.questions.some(q => q.answerId === undefined)
    }
  },
  methods: {
    async loadData () {
      this.$store.commit('loading', true)
      try {
        const members = await Member.list()
        const questions = await Question.listAllNested()
        this.membersOptions = members.map(it => ({
          text: it.nama,
          value: it.id
        }))
        this.questions = questions.map(q => {
          let answers = q.answers.map(ans => ({
            ...ans,
            selected: false
          }))
          return { ...q, answers, answerId: undefined }
        })
      } catch (err) {
        alert('Gagal memuat data')
      } finally {
        this.$store.commit('loading', false)
      }
    },
    createPayload () {
      const memberId = this.memberId
      const answerList = this.questions.map(q => q.answerId)
      return {
        memberId,
        answerList
      }
    },
    add () {
      const payload = this.createPayload()
      this.$store.dispatch(Actions.CREDIT_REQUEST_ADD, payload)
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

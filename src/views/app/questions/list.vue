<template>
  <div id="questions-list">
    <v-dialog v-model="deleteQuestionWarning">
      <v-card>
        <v-card-text>
          Hapus data?
        </v-card-text>
        <v-card-actions>
          <v-btn flat @click="remove(deleteQuestionId)">Ya</v-btn>
          <v-btn flat @click="deleteQuestionWarning = false; deleteQuestionId = undefined;">Tidak</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-layout>
      <v-flex md8 class="mx-auto">
        <v-card class="my-4">
          <v-toolbar flat height="72">
            <v-toolbar-title class="subtitle font-weight-bold grey--text pl-3">Pertanyaan</v-toolbar-title>
            <v-spacer/>
            <v-btn icon dark flat class="prim-1-text" to="/app/questions/add">
              <v-icon>add</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider/>
          <v-list class="outer-list">
            <template v-for="item in items">
              <v-list-tile :key="`question-li-it-${item.id}`" avatar>
                <v-list-tile-avatar>

                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-avatar tile size="32" color="primary" v-on="on">
                        <span class="title white--text">{{ item.profileTarget }}</span>
                      </v-avatar>
                    </template>
                    <span>Profile Target: {{item.profileTarget}}</span>
                  </v-tooltip>

                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-layout row justify-space-between align-center class="ma-0 pa-0">
                    <div>
                      <span class="grey--text text--darken-3">{{ item.type }}</span>
                      <span> / {{ item.isCf ? 'CF' : 'SF' }}</span>
                      <span class="body-1 grey--text">--- {{ item.base.created }}</span>
                    </div>

                    <!-- Vuetify add v-menu to dom event though it's not displayed.
                        And it breaks the layout. So we should wrap it into div.
                    -->
                    <div>
                      <v-menu offset-y>
                        <template v-slot:activator="{ on }">
                          <v-btn small icon v-on="on" class="my-0">
                            <font-awesome-icon icon="ellipsis-h"></font-awesome-icon>
                          </v-btn>
                        </template>
                        <v-list dense>
                          <v-list-tile :to="`/app/questions/${item.id}/edit`">
                            <v-list-tile-sub-title>Edit</v-list-tile-sub-title>
                          </v-list-tile>
                          <v-list-tile @click="showDeleteWarning(item.id)">
                            <v-list-tile-sub-title>Hapus</v-list-tile-sub-title>
                          </v-list-tile>
                          <v-list-tile :to="`/app/questions/${item.id}/add-answer`">
                            <v-list-tile-sub-title>Tambah Jawaban</v-list-tile-sub-title>
                          </v-list-tile>
                        </v-list>
                      </v-menu>
                    </div>
                  </v-layout>
                  <v-list-tile-sub-title class="body-2 grey--text text--darken-4"> 
                    <span>
                      {{ item.text }}
                    </span>
                    <v-btn small icon class="my-0" @click="toggleActive(item.id)">
                      <font-awesome-icon icon="angle-double-down"></font-awesome-icon>
                    </v-btn>
                  </v-list-tile-sub-title>
                  <list-answers v-if="activeId === item.id" :question-id="item.id" />
                </v-list-tile-content>
              </v-list-tile>
              <v-divider :key="`question-li-div-${item.id}`" class="my-4"/>
            </template>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Actions from '@/store/actions'
import ListAnswers from './list.answer'

export default {
  name: 'QuestionsList',
  components: {
    ListAnswers
  },
  data: () => ({
    events: [],
    input: null,
    nonce: 0,
    activeId: undefined,
    actives: [],

    deleteQuestionId: undefined,
    deleteQuestionWarning: false
  }),
  computed: {
    timeline () {
      return this.events.slice().reverse()
    },
    ...mapState({
      'items': state => state.questions.map(q => ({ ...q, active: false }))
      // 'items': state => state.questions
    })
  },

  methods: {
    toggleActive (id) {
      if (this.activeId === undefined) {
        this.activeId = id
      } else if (this.activeId !== id) {
        this.activeId = id
      } else if (this.activeId === id) {
        this.activeId = undefined
      } else {
        this.activeId = undefined
      }
    },
    comment () {
      const time = (new Date()).toTimeString()
      this.events.push({
        id: this.nonce++,
        text: this.input,
        time: time.replace(/:\d{2}\sGMT-\d{4}\s\((.*)\)/, (match, contents, offset) => {
          return ` ${contents.split(' ').map(v => v.charAt(0)).join('')}`
        })
      })

      this.input = null
    },
    showDeleteWarning (id) {
      this.deleteQuestionId = id
      this.deleteQuestionWarning = true
    },
    remove (id) {
      this.$store.dispatch(Actions.QUESTIONS_REMOVE, id)
        .then(() => {
          this.deleteQuestionWarning = false
          this.deleteQuestionId = undefined
          this.loadItems()
        })
    },
    ...mapActions({
      'loadItems': Actions.QUESTIONS_LOAD_ITEMS
    })
  },
  
  mounted () {
    this.loadItems()
  }
}
</script>

<style lang="scss">

#questions-list {

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

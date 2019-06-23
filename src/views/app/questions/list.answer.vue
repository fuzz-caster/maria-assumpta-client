<template>
  <v-list class="inner-list">
    <v-dialog v-model="deleteWarning">
      <v-card>
        <v-card-text>
          Hapus data?
        </v-card-text>
        <v-card-actions>
          <v-btn flat @click="remove(deleteId)">Ya</v-btn>
          <v-btn flat @click="deleteWarning = false; deleteId = undefined;">Tidak</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <template v-for="item in items">
      <v-list-tile :key="`question-li-it-${item.id}`" avatar>
        <v-list-tile-avatar>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-avatar tile size="32" color="info" v-on="on">
                <span class="title white--text">{{ item.weight }}</span>
              </v-avatar>
            </template>
            <span>Bobot: {{item.profileTarget}}</span>
          </v-tooltip>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-layout row justify-space-between align-center class="ma-0 pa-0">
            <span class="body-1 grey--text">--- {{ item.base.created }}</span>

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
                  <v-list-tile :to="`/app/answers/${item.id}/edit`">
                    <v-list-tile-sub-title>Edit</v-list-tile-sub-title>
                  </v-list-tile>
                  <v-list-tile @click="showDeleteWarning(item.id)">
                    <v-list-tile-sub-title>Hapus</v-list-tile-sub-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </div>
          </v-layout>
          <v-list-tile-sub-title class="body-2 grey--text text--darken-4">
            <span>
              {{ item.text }}
            </span>
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-list>
</template>

<script>
import Actions from '@/store/actions'
import { mapState } from 'vuex'

export default {
  name: 'AnswersList',
  props: ['questionId'],
  data: () => ({
    deleteWarning: false,
    deleteId: undefined
  }),
  computed: mapState({
    items (state) {
      let items = state.answers.filter(an => an.questionId === this.questionId)
      items.sort((a, b) => b.weight - a.weight)
      return items
    }
  }),
  methods: {
    loadItems () {
      this.$store.dispatch(Actions.QUESTION_LOAD_ANSWERS, this.questionId)
    },
    showDeleteWarning (id) {
      this.deleteId = id
      this.deleteWarning = true
    },
    remove (id) {
      this.$store.dispatch(Actions.QUESTION_REMOVE_ANSWER, id)
        .then(() => {
          this.deleteId = undefined
          this.deleteWarning = false
          this.loadItems()
        })
    }
  },
  mounted () {
    this.loadItems()
  }
}
</script>

<style lang="scss">
  .inner-list {
    .v-list__tile {
      margin-bottom: 20px;
    }
  }
</style>

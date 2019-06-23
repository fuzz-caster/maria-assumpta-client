<template>
  <div id="credit-requests-list">
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
    <v-layout row fill-height>
      <v-flex fill-height md6 class="mx-auto">
        <v-card class="my-4">
          <v-toolbar flat dense height="72">
            <v-toolbar-title class="subtitle font-weight-bold grey--text pl-3">Pengajuan Kredit</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon dark flat class="prim-1-text" to="/app/credit-requests/add">
              <v-icon>add</v-icon>
            </v-btn>
          </v-toolbar>
          <v-btn @click="reorder" block flat dark color="secondary">
            <v-icon>reorder</v-icon>
          </v-btn>
          <v-divider/>
          <v-list>
            <transition-group name="flip-list">
              <template v-for="(item, index) in items">
                <v-list-tile :key="`cr-list-${item.id}`" avatar class="pl-4" v-bind:class="{ 'red white--text': (item.rate < 7) }">
                  <v-list-tile-avatar>
                    <v-avatar size="32" tile>
                      {{ index + 1 }}
                    </v-avatar>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.member.nama }}</v-list-tile-title>
                    <v-list-tile-sub-title>{{ item.rate.toFixed(3) }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <div>
                      <v-menu offset-y>
                        <template v-slot:activator="{ on }">
                          <v-btn small icon v-on="on" class="my-0">
                            <font-awesome-icon icon="ellipsis-h"></font-awesome-icon>
                          </v-btn>
                        </template>
                        <v-list dense>
                          <v-list-tile :to="`/app/credit-requests/${item.id}/edit`">
                            <v-list-tile-sub-title>Edit</v-list-tile-sub-title>
                          </v-list-tile>
                          <v-list-tile @click="showDeleteWarning(item.id)">
                            <v-list-tile-sub-title>Hapus</v-list-tile-sub-title>
                          </v-list-tile>
                        </v-list>
                      </v-menu>
                    </div>
                  </v-list-tile-action>
                </v-list-tile>
                <v-divider :key="`cr-sep-${item.id}`"></v-divider>
              </template>
            </transition-group>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { CreditRequest } from '@/services'
import Actions from '@/store/actions'

const ascFunc = (a, b) => b.rate - a.rate

export default {
  name: 'CreditRequestList',
  data: () => ({
    items: [],
    order: 'asc',
    deleteId: undefined,
    deleteWarning: false
  }),
  methods: {
    async loadData () {
      this.$store.commit('loading', true)
      try {
        let items = await CreditRequest.listSorted()
        items.sort(ascFunc)
        this.order = 'asc'
        this.items = items
      } finally {
        this.$store.commit('loading', false)
      }
    },
    async reorder () {
      let items = this.items
      items.reverse()
      this.items = items
    },
    showDeleteWarning (id) {
      this.deleteId = id
      this.deleteWarning = true
    },
    async remove (id) {
      this.$store.dispatch(Actions.CREDIT_REQUEST_REMOVE, id)
        .then(() => {
          this.deleteId = undefined
          this.deleteWarning = false
          this.loadData()
        })
    }
  },
  mounted () {
    this.loadData()
  }
}
</script>

<style lang="scss">
.no-marg {
  .v-input__slot {
    margin: 0;
  }
}

.flip-list-move {
  transition: transform 1s;
}
</style>

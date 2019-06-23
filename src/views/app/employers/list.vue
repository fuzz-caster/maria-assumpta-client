<template>
  <div id="employers-list">
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
    <v-layout row class="pa-0 ma-0" fill-height>
      <v-flex fill-height md6 xs12 class="ma-0 pa-0 left-side mx-auto">
        <v-toolbar flat dense color="white" height="72">
          <v-toolbar-title class="subtitle font-weight-bold grey--text pl-3">Data Pegawai</v-toolbar-title>
          <v-spacer/>
          <v-btn icon dark flat class="prim-1-text" to="/app/employers/add">
            <v-icon>create</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider/>
        <v-list dense>
          <template v-for="item in items">
            <v-list-tile :key="item.id" avatar>
              <text-avatar :x="item.nama[0]" :size="32" class="mr-2"/>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.nama }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ item.username }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon dark flat color="pink" @click="showDeleteWarning(item.id)">
                  <v-icon>close</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ACTIONS from '@/store/actions.js'

export default {
  name: 'EmployersList',
  data: () => ({
    deleteWarning: false,
    deleteId: undefined
  }),
  methods: {
    ...mapActions({
      loadItems: ACTIONS.EMPLOYERS_LOAD_ITEMS
    }),
    showDeleteWarning (id) {
      this.deleteId = id
      this.deleteWarning = true
    },
    remove (id) {
      this.$store.dispatch(ACTIONS.EMPLOYERS_DELETE, id)
        .then(() => {
          this.deleteWarning = false
          this.deleteId = undefined
          this.loadItems()
        })
    }
  },
  computed: {
    ...mapState({
      items: 'employers'
    })
  },
  mounted () {
    this.loadItems()
  }
}
</script>

<style lang="scss">
#employers-list {
  height: 100%;

  .left-side {
    position: relative;
    border-right: 1px solid #ddd;
    height: 100%;

    .cover {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(255, 255, 255, 0.8);
      z-index: 2;
    }
  }
}
</style>

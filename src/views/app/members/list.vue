<template>
  <div id="members-list">
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
          <v-toolbar flat dense color="white" height="72">
            <v-toolbar-title class="subtitle font-weight-bold grey--text pl-3">Data Anggota</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon dark flat class="prim-1-text" to="/app/members/add">
              <v-icon>add</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider/>
          <v-toolbar flat dense color="white" height="72">
            <v-text-field prepend-icon="search" v-model="keyword" flat class="ml-3 no-marg" label="Keyword..."></v-text-field>
          </v-toolbar>
          <v-list>
            <template v-for="item in items">
              <v-list-tile :key="`member-list-${item.id}`" avatar class="pl-4">
                <v-list-tile-avatar>
                  <text-avatar :x="item.nama[0]" :size="40"></text-avatar>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.nama }}</v-list-tile-title>
                  <v-list-tile-sub-title>{{ item.tanggalLahir }}</v-list-tile-sub-title>
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
                        <v-list-tile :to="`/app/members/${item.id}/edit`">
                          <v-list-tile-sub-title>Edit</v-list-tile-sub-title>
                        </v-list-tile>
                        <v-list-tile @click="showDeleteWarning(item.id)">
                          <v-list-tile-sub-title>Hapus</v-list-tile-sub-title>
                        </v-list-tile>
                        <v-list-tile :to="`/app/members/${item.id}/add-credit-request`">
                          <v-list-tile-sub-title>Tambah Permintaan Kredit</v-list-tile-sub-title>
                        </v-list-tile>
                      </v-list>
                    </v-menu>
                  </div>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider :key="`member-sep-${item.id}`"></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ACTIONS from '@/store/actions.js'
import { columns } from './columns'

export default {
  name: 'MembersList',
  data: () => ({
    columns,
    keyword: '',
    deleteId: undefined,
    deleteWarning: false
  }),
  methods: {
    showDeleteWarning (id) {
      this.deleteId = id
      this.deleteWarning = true
    },
    remove (id) {
      this.$store.dispatch(ACTIONS.MEMBER_DELETE, id)
        .then(() => {
          this.deleteId = undefined
          this.deleteWarning = false
          this.loadItems()
        })
    },
    ...mapActions({
      loadItems: ACTIONS.MEMBERS_LOAD_ITEMS
    })
  },
  computed: {
    ...mapState({
      items (state) {
        const keywordUp = this.keyword.toUpperCase()
        return state.members.filter(it => {
          return it.nama.toUpperCase().includes(keywordUp)
        })
      }
    })
  },
  mounted () {
    this.loadItems()
  }
}
</script>

<style lang="scss">
.no-marg {
  .v-input__slot {
    margin: 0;
  }
}
</style>

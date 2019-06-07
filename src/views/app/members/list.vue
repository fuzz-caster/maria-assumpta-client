<template>
  <div id="members-list">
    <v-layout row class="pa-0 ma-0" fill-height>
      <v-flex fill-height md12 class="ma-0 pa-0 left-side" style="">
        <v-toolbar flat dense color="white" height="72">
          <v-toolbar-title class="subtitle font-weight-bold grey--text pl-3">Data Anggota</v-toolbar-title>
          <v-spacer/>
          <v-btn icon dark flat class="prim-1-text" to="/app/members/add">
            <v-icon>add</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider/>
        <v-data-table
          :headers="columns"
          :items="items"
        >
          <template v-slot:items="props">
            <td>{{ props.item.nama }}</td>
            <td>{{ props.item.noHp }}</td>
            <td>{{ props.item.alamat }}</td>
            <td>{{ props.item.statusTerakhir }}</td>
            <td>{{ props.item.limitKredit }}</td>
            <td>{{ props.item.jangkaWaktu }}</td>
            <td>{{ props.item.tempatLahir }}</td>
            <td>{{ props.item.tanggalLahir }}</td>
            <td>{{ props.item.sex }}</td>
          </template>
        </v-data-table>
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
    columns
  }),
  methods: {
    ...mapActions({
      loadItems: ACTIONS.MEMBERS_LOAD_ITEMS
    })
  },
  computed: {
    ...mapState({
      items: 'members'
    })
  },
  mounted () {
    this.loadItems()
  }
}
</script>

<style lang="scss">
</style>

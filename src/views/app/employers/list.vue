<template>
  <div id="employers-list">
    <v-layout row class="pa-0 ma-0" fill-height>
      <v-flex md3 class="ma-0 pa-0 left-side" style="">
        <v-toolbar flat dense color="white" height="72">
          <v-toolbar-title class="subtitle font-weight-bold grey--text pl-3">Data Pegawai</v-toolbar-title>
          <v-spacer/>
          <v-btn icon dark flat class="prim-1-text" to="/app/employers/add">
            <v-icon>create</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider/>
        <v-layout row>
          <v-flex md12 class="px-4">
            <v-list two-line>
              <template v-for="item in items">
                <v-list-tile :key="item.id" avatar>
                  <text-avatar :x="item.nama[0]" class="mr-2"/>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.nama }}</v-list-tile-title>
                    <v-list-tile-sub-title>{{ item.username }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>
            </v-list>
          </v-flex>
        </v-layout>
        <div v-if="cover" class="cover"></div>
      </v-flex>
      <v-flex md9 class="ma-0 pa-0 grey lighten-3" fill-height>
        <router-view/>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import API from '@/services'

export default {
  name: 'EmployersList',
  data: () => ({
    items: []
  }),
  methods: {
    loadItems () {
      API.Pegawai.list()
        .then(items => {
          this.items = items
        })
        .catch(err => {
          console.log(err)
        })
        // .then(() => {
        //   this.$store.commit('toggleLoading')
        // })
    }
  },
  computed: {
    cover () {
      return this.$route.name !== 'fill-employers'
    }
  },
  mounted () {
    this.loadItems()
    if (this.$route.name !== 'fill-employers') {
      this.cover = true
    }
  }
}
</script>

<style lang="scss">
#employers-list {
  display: table-cell;

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
      z-index: 90;
    }
  }
}
</style>

<template>
  <div id="assumpta--main-app">

    <!-- Toolbar -->
    <v-toolbar
      app
      dark
      extended
      extension-height="0"
      class="assumpta--main-toolbar"
      style="padding-left: 0 !important"
    >
      <v-toolbar-side-icon>
        <font-awesome-icon icon="signal" size="2x"></font-awesome-icon>
      </v-toolbar-side-icon>
      <v-toolbar-title class="title text-uppercase">
        <span>ASSUMPTA</span>
        <span class="font-weight-light"> / KOPDIT</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
      <v-progress-linear :active="loading" slot="extension" class="mx-0" indeterminate height="4"/>
    </v-toolbar>

    <!-- Left side drawer -->
    <v-navigation-drawer v-model="showNav" clipped app mini-variant mini-variant-width="72">
      <v-list class="pt-0 side-list-icons" two-line>
        <template v-for="nav in navItems">
          <v-list-tile :key="nav.path" class="px-0" :to="nav.path" avatar>
            <v-list-tile-action class="px-0">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon>{{nav.icon}}</v-icon>
                </template>
                <span>{{  nav.title}}</span>
              </v-tooltip>
            </v-list-tile-action>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>

    <!-- Last 5 actions messages, displayed as snackbars -->

    <!-- Main Content Goes Here -->
    <router-view/>

    <v-footer app height="8">
      <v-layout
      justify-center
      row
      wrap
    >
      <v-flex
        lighten-2
        py-2
        text-xs-right
        xs12
      >
        <span class="subtitle">{{ message }}</span>
      </v-flex>
    </v-layout>
    </v-footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MainApp',
  data: () => ({
    color: 'pink',
    navItems: [
      {
        path: '/app/employers',
        icon: 'person',
        title: 'Pegawai',
        color: 'blue darken-1'
      },
      {
        path: '/app/members',
        icon: 'group',
        title: 'Anggota',
        color: 'cyan darken-1'
      },
      {
        path: '/app/credit-requests',
        icon: 'share',
        title: 'Permintaan',
        color: 'teal darken-1'
      },
      {
        path: '/app/questions',
        icon: 'live_help',
        title: 'Pertanyaan',
        color: 'pink darken-1'
      },
      {
        path: '/logout',
        icon: 'power_settings_new',
        title: 'Logout',
        color: 'grey darken-3'
      }
    ],
    showNav: true
  }),
  computed: mapState({
    loading: 'loading',
    message: 'lastMessage'
  })
}
</script>

<style lang="scss">
#assumpta--main-app {
  background-color: white;
  height: 100%;
  width: 100%;

  .assumpta--main-toolbar {
    // background: linear-gradient(to right, #049bff 10%, #ff9b04 40%, #ff1d04 90%);
    background: linear-gradient(to right, $prim-2 40%, $prim-3 90%);
  }

  .side-list-icons {
    .v-list__tile {
      padding-left: 0;
      padding-right: 0;

      .v-list__tile__action {
        width: 100%;
      }
    }
  }

  .v-list__tile--active {
    background: $prim-1;

    .v-list__tile__action {
      color: white;
    }
  }
}

</style>

<template>
  <div id="assumpta--home">
    <v-toolbar app dark class="assumpta--main-toolbar">
      <v-toolbar-title class="headline text-uppercase">
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
    </v-toolbar>
    <v-layout row>
      <v-flex xs5 class="pa-4">
        <v-layout column fill-height justify-center>
          <v-card>
            <v-card-text>
              <v-text-field label="Username"/>
              <v-text-field label="Password" type="password"/>
              <v-btn to="/app" dark color="primary" depressed class="my-4">Login</v-btn>
            </v-card-text>
          </v-card>
        </v-layout>
      </v-flex>
      <v-flex xs7 fill-height>
        <v-layout column align-center justify-center fill-height class="text-xs-center">
          <div class="display-1 font-weight-light my-2">Sistem Perangkingan Permintaan Kredit</div>
          <div class="title mb-4">Studi Kasus Kopdit Maria Assumpta</div>
          <div>
            <font-awesome-icon size="10x" :icon="['fab', 'empire']"></font-awesome-icon>
          </div>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-footer
      app
      height="auto"
    >
      <v-card
        flat
        tile
        class="text-xs-center"
        style="width:100%;"
      >
        <v-divider></v-divider>
        <v-card-text>
          &copy;2019 — <strong>Powered by Bona</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style lang="scss">
#assumpta--home {
  min-height: 90vh;
  display: flex;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.8)),
              url('/bg.jpg');
  background-size: cover;

  .login-section {
    background: $prim-1;
  }
}
</style>

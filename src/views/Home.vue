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
    <v-layout row wrap>
      <v-flex xs12>
        <v-layout column align-center justify-center fill-height class="text-xs-center">
          <div class="display-1 font-weight-light my-2">Koperasi Simpan Pinjam (KSP) Kopdit Solidaritas Sta. Maria Assumpta</div>
          <div>
            <font-awesome-icon size="10x" :icon="['fab', 'empire']"></font-awesome-icon>
          </div>
        </v-layout>
      </v-flex>
      <v-flex xs12>
        <v-layout column justify-center>
          <v-card v-if="!loggedIn">
            <v-card-text>
              <v-text-field label="Username" v-model="username"/>
              <v-text-field label="Password" type="password" v-model="password"/>
              <v-btn @click="login" dark color="primary" depressed class="my-4">Login</v-btn>
            </v-card-text>
          </v-card>
          <v-btn v-else dark large color="primary" to="/app/members">
            Start here...
          </v-btn>
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
          &copy;2019 — <strong>Powered by Boni</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </div>
</template>

<script>
import { Auth } from '@/services'

export default {
  name: 'Home',
  data: () => ({
    username: '',
    password: '',
    loggedIn: false
  }),
  methods: {
    async login () {
      const result = await Auth.login(this.username, this.password)
      console.log(result)
      if (result) {
        localStorage.setItem('assumpta.user', result)
        this.checkLogin()
        console.log('OK')
      } else {
        console.log('FAIL')
      }
    },
    checkLogin () {
      const user = localStorage.getItem('assumpta.user')
      if (user) {
        this.loggedIn = true
        // this.$router.push('/app/members')
      }
    }
  },
  mounted () {
    this.checkLogin()
  }
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

<template>
  <div id="employers-add" class="pa-4">
    <v-layout row fill-height>
      <v-flex md6 offset-md3>
        <v-layout column justify-center fill-height>
          <v-card class="elevation-20">
            <v-card-text>
              <div class="headline text-xs-center">Input Data Pegawai Baru</div>
              <v-divider class="my-4"/>
              <v-text-field label="Nama" v-model="item.nama" />
              <v-text-field label="Username" v-model="item.username" />
              <v-text-field label="Password" type="password" v-model="item.password"/>
            </v-card-text>
            <v-card-actions>
              <v-btn flat color="blue" @click="add">Ok</v-btn>
              <v-btn flat>Batal</v-btn>
            </v-card-actions>
          </v-card>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import ACTIONS from '@/store/actions'

export default {
  name: 'employers-add',
  data: () => ({
    item: {
      nama: '',
      username: '',
      password: ''
    }
  }),
  methods: {
    add () {
      this.$store.dispatch(ACTIONS.EMPLOYERS_ADD, this.item)
        .then(() => this.$store.dispatch(ACTIONS.EMPLOYERS_LOAD_ITEMS, this.item))
        .then(() => {
          this.$router.back()
        })
    }
  }
}
</script>

<style lang="scss">
  #employers-add {
    height: 100%;
  }
</style>

<template>
  <div id="employers-add" class="pa-4">
    <v-layout row fill-height>
      <v-flex md6 offset-md3>
        <v-layout column justify-center fill-height>
          <v-card class="elevation-20">
            <v-card-text>
              <div class="headline text-xs-center">Input Data Pegawai Baru</div>
              <v-divider class="my-4"/>
              <v-text-field label="Nama"/>
              <v-text-field label="Username"/>
              <v-text-field label="Password"/>
            </v-card-text>
            <v-card-actions>
              <v-btn flat>Ok</v-btn>
              <v-btn flat>Batal</v-btn>
            </v-card-actions>
          </v-card>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'employers-add'
}
</script>

<style lang="scss">
  #employers-add {
    height: 100%;
  }
</style>

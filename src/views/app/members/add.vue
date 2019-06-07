<template>
  <v-dialog :value="true" width="500px">
    <v-card>
      <v-toolbar>
        <v-toolbar-title>Input Data Member</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-text-field box flat v-model="item.nama" label="Nama" />
        <v-text-field box flat v-model="item.noHp" label="No. HP" />
        <v-text-field box flat v-model="item.alamat" label="Alamat" />
        <v-text-field box flat v-model="item.statusTerakhir" label="Status Terakhir" />
        <v-text-field box flat v-model.number="item.limitKredit" label="Limit Kredit" />
        <v-text-field box flat v-model.number="item.jangkaWaktu" label="Jangka Waktu" />
        <v-text-field box flat v-model="item.tempatLahir" label="Tempat Lahir" />
        <v-text-field box flat v-model="item.tanggalLahir" type="date" label="Tanggal Lahir" />
      </v-card-text>
      <v-card-actions>
        <v-btn color="blue" dark @click="add">
          Ok
        </v-btn>
        <v-btn color="pink" dark @click="$router.back()">
          Batal
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Actions from '@/store/actions'

export default {
  data: () => ({
    item: {
      nama: '',
      noHp: '',
      alamat: '',
      statusTerakhir: '',
      limitKredit: 1,
      jangkaWaktu: 1,
      tempatLahir: '',
      tanggalLahir: new Date(),
      sex: 'pria'
    },
    options: {
      sex: ['pria', 'wanita']
    }
  }),
  methods: {
    add () {
      this.$store.dispatch(Actions.MEMBERS_ADD, this.item)
        .then(() => {
          this.$router.back()
        })
    }
  }
}
</script>

<style>

</style>

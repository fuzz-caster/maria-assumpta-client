<template>
  <v-dialog :value="true" width="500px">
    <v-card>
      <v-toolbar>
        <v-toolbar-title>Input Data Member</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-text-field box flat v-model="item.nama" label="Nama" />
        <v-text-field box flat v-model="item.noAnggota" label="No. Anggota" />
        <v-select :items="options.sex" v-model="item.sex" label="Jenis Kelamin"></v-select>
        <v-text-field box flat v-model="item.noHp" label="No. HP" />
        <v-text-field box flat v-model="item.alamat" label="Alamat" />
        <v-text-field box flat v-model="item.statusTerakhir" label="Status Terakhir" />
        <v-text-field box flat v-model.number="item.limitKredit" label="Limit Kredit" />
        <v-text-field box flat v-model.number="item.jangkaWaktu" label="Jangka Waktu" />
        <v-text-field box flat v-model="item.tempatLahir" label="Tempat Lahir" />
        <v-text-field box flat v-model="item.tanggalLahir" type="date" label="Tanggal Lahir" />
      </v-card-text>
      <v-card-actions>
        <v-btn color="blue" dark @click="update">
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
// import { mapState } from 'vuex'

export default {
  props: ['id'],
  data: () => ({
    item: {
      nama: '',
      noAnggota: '',
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
    update () {
      const payload = {
        id: this.id,
        payload: this.item
      }
      this.$store.dispatch(Actions.MEMBER_UPDATE, payload)
        .then(() => {
          this.$router.back()
        })
    },
    loadData () {
      const members = this.$store.state.members
      const intId = parseInt(this.id)
      console.log(members)
      const item = members.find(it => {
        console.log('it.id = ', it.id)
        console.log('id = ', intId)
        return it.id === intId
      })
      if (!item) {
        throw new Error('HERE')
      }
      this.item = item
    }
  },
  mounted () {
    this.loadData()
  }
}
</script>

<style>

</style>

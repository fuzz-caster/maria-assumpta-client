<template>
  <v-dialog :value="true" persistent width="500">
    <v-card>
      <v-toolbar dense flat>
        <v-toolbar-title>Input Data Pertanyaan</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-text-field v-model="item.type" label="Nama Kriteria"></v-text-field>
        <v-textarea v-model="item.text" label="Text"></v-textarea>
        <v-text-field type="number" v-model.number="item.profileTarget" label="Nilai Profil"></v-text-field>
        <v-text-field type="number" v-model.number="item.showOrder" label="Urutan"></v-text-field>
        <v-switch v-model="item.isCf" label="Core Factor?"></v-switch>
      </v-card-text>
      <v-card-actions>
        <v-btn flat dark color="primary" @click="save">
          Ok
        </v-btn>
        <v-btn flat @click="$router.back()">
          Batal
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Actions from '@/store/actions'

export default {
  props: ['id'],
  data: () => ({
    item: {
      text: '',
      profileTarget: 0,
      showOrder: 0,
      isCf: true,
      type: ''
    }
  }),
  methods: {
    save () {
      this.$store.dispatch(Actions.QUESTIONS_UPDATE, { id: this.id, payload: this.item })
        .then(() => {
          this.$store.dispatch(Actions.QUESTIONS_LOAD_ITEMS)
        })
        .then(() => {
          this.$router.back()
        })
    },
    loadData () {
      // console.log('id = ', this.id)
      let item = this.$store.getters.getQuestionById(this.id)
      // console.log('item = ', item)
      if (!item) {
        this.$store.dispatch(Actions.QUESTIONS_LOAD_ITEMS)
          .then(() => {
            item = this.$store.getters.getQuestionById(this.id)
            console.log('HERE')
            this.item = item
          })
      } else {
        this.item = item
      }
    }
  },
  mounted () {
    this.loadData()
  }
}
</script>

<style>

</style>

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
        <v-btn flat dark color="primary" @click="add">
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
  name: 'QuestionAdd',
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
    add () {
      this.$store.dispatch(Actions.QUESTIONS_ADD, this.item)
        .then(() => {
          this.$store.dispatch(Actions.QUESTIONS_LOAD_ITEMS)
        })
        .then(() => {
          this.$router.back()
        })
    }
  }
}
</script>

<style>

</style>

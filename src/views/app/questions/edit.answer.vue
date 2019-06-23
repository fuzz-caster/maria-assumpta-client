<template>
  <v-dialog :value="true" persistent width="500">
    <v-card>
      <v-toolbar dense flat>
        <v-toolbar-title>Input Data Jawaban</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-textarea v-model="item.text" label="Text"></v-textarea>
        <v-text-field type="number" v-model.number="item.weight" label="Bobot"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn flat dark color="primary" @click="update">
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
import { Answer } from '@/services'

export default {
  name: 'AnswerUpdate',
  props: ['id'],
  data: () => ({
    item: {
        text: '',
        weight: 0
    }
  }),
  methods: {
    update () {
      const payload = {
        id: this.id,
        payload: this.item
      }
      this.$store.dispatch(Actions.QUESTION_UPDATE_ANSWER, payload)
        .then(() => {
          this.$store.dispatch(Actions.QUESTIONS_LOAD_ITEMS)
        })
        .then(() => {
          this.$router.back()
        })
    },
    async loadData () {
      let item = this.$store.state.answers.find(an => an.id === this.id)
      if (!item) {
        try {
          item = await Answer.getOneById(this.id)
        } catch (err) {
          console.log(err)
          alert('Gagal mengambil data jawaban')
          this.$router.back()
        }
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

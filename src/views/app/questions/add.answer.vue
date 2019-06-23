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
  name: 'QuestionAnswerAdd',
  props: ['questionId'],
  data: () => ({
    item: {
        text: '',
        weight: 0
    }
  }),
  methods: {
    add () {
      const payload = {
        questionId: this.questionId,
        ...this.item
      }
      this.$store.dispatch(Actions.QUESTION_ADD_ANSWER, payload)
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

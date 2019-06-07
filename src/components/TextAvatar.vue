<template>
  <v-avatar :color="color" :size="size" tile>
    <span class="white--text">{{ x.toUpperCase() }}</span>
  </v-avatar>
</template>

<script>
const colors = [
  'red darken-1',
  'pink',
  'blue darken-2',
  'cyan',
  'brown',
  'indigo',
  'teal',
  'orange',
  'yellow darken-2'
]

export default {
  props: ['x', 'size'],
  name: 'TextAvatar',
  data: () => ({
    color: colors[0]
  }),
  mounted () {
    this.color = colors[Math.floor(Math.random() * colors.length)]
  }
}
</script>

<style>

</style>

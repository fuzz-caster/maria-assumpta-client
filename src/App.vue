<template>
  <v-app>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      //
    }
  }
}
</script>

<style lang="scss">
.assumpta--main-toolbar {
  // background: linear-gradient(to right, #049bff 10%, #ff9b04 40%, #ff1d04 90%);
  background: linear-gradient(to right, $prim-2 40%, $prim-3 90%);
}
</style>

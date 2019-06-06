<template>
  <v-layout column justify-center align-center fill-height>
    <font-awesome-icon class="placeholder--icon" size="10x" :icon="['fab', 'empire']"></font-awesome-icon>
    <div class="display-1 font-weight-light grey--text">St. Maria Assumpta</div>
  </v-layout>
</template>

<script>
export default {
  name: 'AssumptaPlaceholder'
}
</script>

<style lang="scss">
  .placeholder--icon {
    color: $prim-1;
  }
</style>

<template>
  <div id="app">
    <!-- <keep-alive > -->
      <!-- <router-view v-if="this.$route.meta.keepAlive"></router-view> -->
    	<router-view></router-view>
    <!-- </keep-alive> -->
    <!-- <router-view v-if="!this.$route.meta.keepAlive"></router-view> -->
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

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
*{
  margin:0px;
  padding: 0px;
}
a{
  text-decoration: none;
  -webkit-tap-highlight-color:rgba(255,0,0,0);
}
ul{
  list-style: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
}
</style>

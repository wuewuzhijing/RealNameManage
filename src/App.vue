<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
     <!--<leftnav></leftnav>-->
     <router-view/>
  </div>
</template>

<script>
  import leftnav from '@/components/common/nav'
export default {
  name: 'app',
  components:{
    leftnav
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

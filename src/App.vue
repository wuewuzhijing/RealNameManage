<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
     <!--<leftnav></leftnav>-->
    <!--<p>{{$route.name}}</p> 可以接受到index.js中的name参数-->
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

.clearfix:after{
  content:"";
  display:block;
  visibility:hidden;
  height:0;
  clear:both;
}
/*marginTop生效*/
.befo:before, .afte:after {
  content: '';
  display: table;
}

</style>

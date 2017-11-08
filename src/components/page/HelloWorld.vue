<template>
  <div class="main">
    <div>165465</div>
    <el-button onclick="isLogin" @click.native.prevent="isLogin">登陆</el-button>
  </div>

</template>

<script>
export default {
  name: 'HelloWorld',
  methods:{
    isLogin:function() {
      this.$router.push({ path: 'Login' })
    }
  }
}
</script>

<style scoped>
</style>

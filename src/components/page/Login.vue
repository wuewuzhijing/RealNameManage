<template>
  <div class="login">
    <div class="middle">
      <!--<i class="icon iconfont icon-zhiliang-xianxing"></i>-->
      <!--<h3 class="title"  >人脸识别系统</h3>-->
      <img class="icon" src="../../assets/logo.png"/>
      <el-form :model="ruleFormLogin" ref="ruleFormLogin" label-position="left" label-width="0px"  class="login-container">
        <el-form-item prop="account">
          <el-input type="text" v-model="ruleFormLogin.account" auto-complete="off" placeholder="账号" ref="inputUsername"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="ruleFormLogin.password" auto-complete="off" placeholder="密码" ref="inputPassword"></el-input>
        </el-form-item>
        <el-checkbox class="remember" checked v-model="checked" v-if="false">记住密码</el-checkbox>
        <el-form-item>
            <el-button type="primary" style="width:100%;" @click.native.prevent="loginSubmit" :loading="logining">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import net from "../../net"
export default {
  data () {
    return {
      logining: false,
      ruleFormLogin: {
        account: '',
        password: ''
      },
      checked: true  // 不使用该功能
    };
  },
  /*生命周期方法*/
  mounted () {
    var localTableData = JSON.parse(localStorage.getItem('loginData'));
    if(localTableData){
      this.ruleFormLogin = localTableData;
    }
  },
  methods: {
    loginSubmit () {
      let self = this; // 定义一个变量指向vue实例
      var username = this.$refs.inputUsername.value;
      var password = this.$refs.inputPassword.value;  //获取输入框中的内容

      console.log(username);
      console.log(password);

      if(username == ""){
        return
      }
      if(password == ""){
        return
      }

      net.getRquery('/manager/login', {
        account: username,
        password:password
      },function sucFn(response) {
        console.log(response);
        console.log('登陆成功！');
        var hotelId = response.data.hotelId;
        localStorage.setItem('loginData',JSON.stringify(self.ruleFormLogin));
        self.$router.push({ path: 'Main/' , query:{hotelId:hotelId}})
      },function errFn(response) {
        self.$message({
          message: response.data.returnMessage,
          type: 'warning'
        });
      })

    },

  }
}

</script>

<style scoped>
    .login {
        height: 100%;
        width: 100%;
        background: #0B6390;
        position: absolute;
        top: 0;
        left: 0;
        text-align: center;
    }



    .middle{
      position:relative;
      top:50%;
      margin-top: -250px;
    }

    .icon{
      height: 40px;
      color: #fff;
      font-size: 26px;
    }

    .title {
      display: inline;
      text-align: center;
      font-family: PingFangSC-Semibold;
      font-size: 22px;
      color: #FFFFFF;
      letter-spacing: -0.51px;
    }
    .login-container {
        -webkit-border-radius: 10px;
        border-radius: 10px;
        -moz-border-radius: 10px;
        background-clip: padding-box;
        margin: 15px auto;
        width: 280px;
        height: 160px;
        padding: 40px 50px;
        background: #fff;
      border: 1px solid #eaeaea;
        /* box-shadow: 0 0 25px #cac6c6; */
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
</style>

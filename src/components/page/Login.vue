<template>
  <div class="login">
    <div class="middle">
      <i class="icon iconfont icon-zhiliang-xianxing"></i>
      <h3 class="title"  >人脸识别系统</h3>
      <el-form :model="ruleFormLogin" :rules="ruleLogin" ref="ruleFormLogin" label-position="left" label-width="0px"  class="login-container">
        <el-form-item prop="account">
          <el-input type="text" v-model="ruleFormLogin.account" auto-complete="off" placeholder="账号" ref="inputUsername"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input type="password" v-model="ruleFormLogin.checkPass" auto-complete="off" placeholder="密码" ref="inputPassword"></el-input>
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
  /* eslint-disable no-unused-vars */

  import axios from 'axios';
export default {
  data () {
    return {
      logining: false,
      ruleFormLogin: {
        account: 'hotel_kk',
        checkPass: '123456'
      },
      ruleLogin: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        checkPass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ]
      },
      checked: true
    };
  },
  /*生命周期方法*/
  mounted () {
    this.getBackgroundBY();
  },
//  computed: {
//    dynamicSegment () {
//      alert("登录成功！获取酒店id=" +  this.$route.params.id );
//      return this.$route.params.id
//    }
//  },
  methods: {
    loginSubmit () {

      var username = this.$refs.inputUsername.value;
      var password = this.$refs.inputPassword.value;  //获取输入框中的内容

      console.log(username);
      console.log(password);
//      var isLoginSusseed;
      //获取用户数据
//      axios.get('static/data/login.json')
      if(username == ""){
//        alert("帐号不能为空");
        return
      }
      if(password == ""){
//        alert("密码不能为空" );
        return
      }
      axios.get('https://dev.bookingyun.com/KmsMaster/manager/login?account=hotel_kk&password=123456')
      .then(response=>{
        console.log('登陆成功！');
        var loginData = response.data.hotelId;
        this.$router.push({ path: 'Main/' + loginData })
//        $.each(loginData , function (index , item) {
//          console.log(item.account,item.password)
//          if (item.username === username && item.password === password) {
//            console.log('登陆成功！');
//            console.log('判断了')
//          }
//          console.log('kfdkfkdkf')
//        })
      })
      .catch(function (error) {
        console.log(error);
        console.log('登陆失败！');
      })
    },
    getBackgroundBY () {
      console.log('被执行');
    }
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
        margin: 28px auto;
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

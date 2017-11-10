<template>
  <div class="main">
    <div class="top-section">
      <i class="icon iconfont icon-zhiliang-xianxing"></i>
      <h3 class="title"  >人脸识别系统</h3>
      <div class="top_left">
        <span class="user">kk_hotel</span>
        <el-button class="exit" type="text" onclick="isLogin" @click.native.prevent="isLogin">退出</el-button>
      </div>
    </div>

    <div class="body">
      <div class="middle_section">
        <div class="middle_top">
          <span>地区：</span>
          <el-select v-model="value_province" placeholder="请选择">
            <el-option
              v-for="item in province"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          <el-select v-model="value_city" placeholder="请选择">
            <el-option
              v-for="item in city"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          <el-select v-model="value_address" placeholder="请选择">
            <el-option
              v-for="item in address"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          <div class="hotelName">
            <span >酒店：</span>
            <el-select v-model="value_hotel" placeholder="请选择">
              <el-option
                v-for="item in hotel"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>

        </div>

        <div class="middle_bottom">
            <span>时间：</span>
            <el-date-picker
              v-model="value_time"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions0">
            </el-date-picker>
            <span>到</span>
            <el-date-picker
              v-model="value_time"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions0">
            </el-date-picker>

          <span class="state_text">状态：</span>
          <el-select class="state_select" v-model="value_state" placeholder="请选择">
            <el-option
              v-for="item in hotel"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          <div class="input_text">
            <span >关键字：</span>
            <el-input class="input" v-model="input" placeholder="请输入内容"></el-input>
          </div>

          <el-button class="button_search" @click.native="search" >搜索</el-button>

        </div>
      </div>
      <div class="bottom_section" >
        <el-table
          :data="tableData"
          style="width: auto; display:inline-block; text-align: center; fixed:right; border: 1px solid #e5e5e5;"  >
          <el-table-column
            prop="insertDate"
            label="日期"
            width="200px"
            align="center" >
          </el-table-column>
          <el-table-column
            prop="identName"
            label="姓名"
            width="100px"
            align="center" >
          </el-table-column>

          <el-table-column
            prop="identNo"
            label="身份证号"
            width="200px"
            align="center" >
          </el-table-column>


          <el-table-column width="150px" align="center"  label="证件照">
            <template slot-scope="scope" >
              <img :src="'data:image/jpg;base64,' + scope.row.identPhoto" height="50">
            </template>
          </el-table-column>

          <el-table-column width="50px" align="center"  label="">
            <template slot-scope="scope" >
              <img src="../../assets/logo.png" style="width: 25px;height: 25px;">
            </template>
          </el-table-column>

          <el-table-column width="150px" align="center"  label="现场照片">
            <template slot-scope="scope" >
              <img :src="'data:image/jpg;base64,' + scope.row.cameraPhoto" height="50">
            </template>
          </el-table-column>

          <el-table-column
            prop="compareResult"
            label="状态"
            width="150px"
            align="center"
          ></el-table-column>

          <el-table-column
            prop="roomNum"
            label="房间号"
            width="150px"
            align="center"
          ></el-table-column>

          <el-table-column width="150px" align="center"  label="操作" >
            <template slot-scope="scope" >
              <el-button
                size="mini"
                type="danger"
                style="width: 100px;"
                @click="handleDelete(scope.$index, scope.row)">通过</el-button>
            </template>
          </el-table-column>

        </el-table>
      </div>

      <div class="page_section" >
        <el-button round>上一页</el-button>  <el-button round>下一页</el-button>
      </div>

    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
  data() {
    return {
      name: 'HelloWorld',
      province: [{
        value: '选项1',
        label: '广东省'
      }, {
        value: '选项2',
        label: '上海市'
      }, {
        value: '选项3',
        label: '北京市'
      }],
      city: [{
        value: '选项1',
        label: '深圳市'
      }, {
        value: '选项2',
        label: '惠州市'
      }, {
        value: '选项3',
        label: '珠海市'
      }],
      address: [{
        value: '选项1',
        label: '福田区'
      }, {
        value: '选项2',
        label: '福田区'
      }, {
        value: '选项3',
        label: '福田区'
      }, {
        value: '选项4',
        label: '福田区'
      }, {
        value: '选项5',
        label: '福田区'
      }],
      hotel: [{
        value: '选项1',
        label: '富士康大酒店'
      }, {
        value: '选项2',
        label: '富士康大酒店'
      }, {
        value: '选项3',
        label: '富士康大酒店'
      }, {
        value: '选项4',
        label: '富士康大酒店'
      }, {
        value: '选项5',
        label: '富士康大酒店'
      }],
      value_province: '广东省',
      value_city: '深圳市',
      value_address: '福田区',
      value_hotel:'富士康大酒店',
      value_state:"",
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      value_time: '',
      input: '',
      tableData: [{
        insertDate: '2016-05-02',
        identName: '王小虎',
        identNo:"45688845145384513",
        compareResult:"通过",
        roomNum:"1056",
        identPhoto: "",
        cameraPhoto:""
      },{
        insertDate: '2016-05-02',
        identName: '王小虎',
        identNo:"45688845145384513",
        compareResult:"通过",
        roomNum:"1056",
        identPhoto: "",
        cameraPhoto:""
      }],
      urlDate: require("../../assets/logo.png")
    }
  },
  methods:{
    isLogin:function() {
      this.$router.push({ path: '/' })
    },
    search:function () {



      axios.get('https://dev.bookingyun.com/KmsMaster/ident/getIdentList?pageIndex=0&pageSize=10')
        .then(response=>{
          console.log('获取人脸识别数据成功');
          this.tableData = response.data.list;
          var identName = response.data.list[0].identName;
          console.log(identName)
          loading.close();
        })
        .catch(function (error) {
          console.log(error);
          console.log('登陆失败！');
          loading.close();
        })


    }

  },
  mounted () {
    const loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    axios.get('https://dev.bookingyun.com/KmsMaster/ident/getIdentList?pageIndex=0&pageSize=10')
      .then(response=>{
        this.tableData = response.data.list;
        var identName = response.data.list[0].identName;
        loading.close();
      })
      .catch(function (error) {
        loading.close();
      })
  },
}
</script>

<style scoped>

  .body{
    width: 1440px;
    margin:0 auto;
  }

  .top-section{
    width: 100%;
    height: 70px;
    background: #0B6390;
    color: #fff;
    overflow: hidden;
  }

  .icon{
    font-size: 20px;
    color: #fff;
    margin-left: 50px;
  }

  .title{
    display: inline-block;
    color: #fff;

  }

  .top_left{
    float: right;
    margin-right: 50px;
    height: 70px;
  }

  .exit{
    font-size: 16px;
  }

  .user{
    margin-left: 50px;
    line-height: 70px;
    margin-right: 30px;
  }

  .middle_section{
    padding: 20px 50px;
  }

  .middle_top{
    display: none;
  }

  .middle_bottom{
    margin-top: 10px;
  }

  .hotelName{
    display: inline-block;
    margin-left: 100px;
  }

  .state_text{
    margin-left: 38px;
  }

  .state_select{
    width: 100px;
  }

  .input_text{
    display: inline-block;
    margin-left: 100px;
  }

  .input{
    display: inline-block;
    width: auto;
  }

  .button_search{
    margin-left: 70px;
    margin-top: 0px;
    padding: 10px 30px;

  }

  .bottom_section{
    padding: 30px 50px;
    width: auto;
  }

  .page_section{
    padding: 20px 50px 50px;
    text-align: center;
  }

  @media screen and  (max-width:1440px){
    .button_search{
      margin-left: 20px;
    }
  }
</style>

<style>
  .el-table th.is-leaf {
    background-color: #e5e5e5 !important;
  }
</style>

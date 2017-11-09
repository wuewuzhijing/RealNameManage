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

        <span class="hotelName">酒店：</span>
        <el-select v-model="value_hotel" placeholder="请选择">
          <el-option
            v-for="item in hotel"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
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

        <span class="input_text">关键字：</span>
        <el-input class="input" v-model="input" placeholder="请输入内容"></el-input>
        <el-button class="button_search" >搜索</el-button>

      </div>
    </div>
    <div class="bottom_section" >
      <el-table
        :data="tableData"
        style="width: 1203px; text-align: center; fixed:right; border: 1px solid #e5e5e5" >
        <el-table-column
          prop="date"
          label="日期"
          width="200px"
          align="center" >
        </el-table-column>
        <el-table-column
          prop="name"
          label="日期"
          width="200px"
          align="center" >
        </el-table-column>

        <el-table-column
          prop="address"
          label="日期"
          width="200px"
          align="center" >
        </el-table-column>

        <el-table-column prop="address"     label="日期" width="200px" align="center" ></el-table-column>

        <el-table-column width="200px" align="center"  label="日期">
          <template slot-scope="scope" >
            <el-button
              size="mini"
              type="danger"
              style="width: 100px;"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
        <el-table-column width="200px" align="center"  label="日期">
          <template slot-scope="scope" >
            <img src="../../assets/logo.png">
          </template>
        </el-table-column>

        <el-table-column width="1px">
          <el-table-column  width="1px">
          </el-table-column>
        </el-table-column>

      </el-table>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
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
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],

    }
  },
  name: 'HelloWorld',
//  mounted: {
//      alert("登录成功！获取酒店id=" +  this.$route.params.hotelId );
//  },
  methods:{
    isLogin:function() {
      this.$router.push({ path: '/' })
    },

  },
  mounted () {
//    alert("登录成功！获取酒店id=" +  this.$route.params.hotelId );
  },
}
</script>

<style scoped>
  .top-section{
    width: 100%;
    height: 70px;
    background: #0B6390;
    color: #fff;
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
    padding: 30px 50px;
  }

  .middle_top{
    width: 80%;
  }

  .middle_bottom{
    padding: 30px 0;
  }
  .hotelName{
    margin-left: 100px;
  }

  .state_text{
    margin-left: 38px;
  }

  .state_select{
    width: 100px;
  }

  .input_text{
    margin-left: 100px;
  }

  .input{
    display: inline-block;
    width: auto;
  }

  .button_search{
    margin-left: 100px;
    padding: 10px 30px;
  }

  .bottom_section{
    padding: 50px;
  }


</style>

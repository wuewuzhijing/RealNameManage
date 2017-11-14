<template>
  <div class="main">
    <div class="top-section clearfix">
      <div class="logo_left">
        <img class="icon" src="../../assets/logo.png"/>
        <h3 class="title" v-if="true"  ></h3>
      </div>

      <div class="top_left">
        <span class="user">kk_hotel</span>
        <el-button class="exit" type="text" @click.native.prevent="isLogin">退出</el-button>
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
              v-model="value_time2"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions0">
            </el-date-picker>

          <span class="state_text">状态：</span>
          <el-select class="state_select" v-model="value_state" placeholder="请选择">
            <el-option
              v-for="item in compareResult"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          <div class="input_text">
            <span >关键字：</span>
            <el-input class="input_keyword" v-model="input_keyword"  placeholder="请输入内容"></el-input>
          </div>

          <el-button class="button_search" @click.native="searchBtn"  :disabled="loading_state" >搜索</el-button>

        </div>
      </div>
      <div class="bottom_section" >
        <el-table
          v-loading="loading_state"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
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
            width="130px"
            align="center" >
          </el-table-column>

          <el-table-column
            prop="identNo"
            label="身份证号"
            width="200px"
            align="center" >
          </el-table-column>


          <el-table-column width="100px" align="center"  label="证件照">
            <template slot-scope="scope" >
              <img :src="scope.row.identPhotoUrl" height="50" v-on:click="chickShowPhoto(scope.row)">
            </template>
          </el-table-column>

          <el-table-column width="50px" align="center"  label="">
            <template slot-scope="scope" >
              <img src="../../assets/vs.png" style="width: 25px;height: 25px;">
            </template>
          </el-table-column>

          <el-table-column width="100px" align="center"  label="现场照片">
            <template slot-scope="scope" >
              <img :src="scope.row.cameraPhotoUrl" height="50" v-on:click="chickShowPhoto(scope.row)">
            </template>
          </el-table-column>

          <el-table-column
            label="状态"
            width="150px"
            align="center"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.compareResult === 'success_manual'" style="color: green">人工通过</span>
              <span v-else-if="scope.row.compareResult === 'success'" style="color: green" >通过</span>
              <span v-else style="color: red">失败</span>
            </template>

          </el-table-column>

          <el-table-column
            prop="roomNum"
            label="房间号"
            width="150px"
            align="center"
          >
            <template slot-scope="scope">
              <el-input class="input_room" v-model=scope.row.roomNo placeholder="房间号" @change="roomChange" value="" ></el-input>
            </template>

          </el-table-column>

          <el-table-column width="150px" align="center"  label="操作" >
            <template slot-scope="scope" >
              <el-button
                v-if="scope.row.policeUploadResult == '2'"
                size="mini"
                type="text"
                style="width: 80px;"
                disabled>已上传</el-button>
              <el-button
                v-else-if="scope.row.compareResult == 'success'||scope.row.compareResult =='success_manual'"
                size="mini"
                style="width: 80px;"
                @click.native="sendCompareResult(scope.$index, scope.row)">上传</el-button>
              <el-button
                v-else
                size="mini"
                type="danger"
                style="width: 80px;"
                @click.native="personVerify(scope.$index, scope.row)">人工通过</el-button>
            </template>
          </el-table-column>

        </el-table>
      </div>

      <div class="page_section" >
        <el-button round @click.native="pageUp">上一页</el-button>
        <el-button round @click.native="pageDown">下一页</el-button>
      </div>

    </div>

    <!--<modal v-if="true"></modal>-->
    <showphoto v-if="isShowPhoto" :message="msgData" ></showphoto>

  </div>
</template>

<script>
  import net from "../../net"
  import util from "../../utils"
  import showphoto from '@/components/common/showphoto'
  export default {
    components:{
      showphoto
    },
  data() {
    return {
      msgData:{msg1:132,msg2:321,show:false},
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
      compareResult: [{
        value: '',
        label: '全部'
      },{
        value: 'success',
        label: '成功'
      }, {
        value: 'fail',
        label: '失败'
      }, {
        value: 'success_manual',
        label: '人工通过'
      }],
      value_province: '广东省',
      value_city: '深圳市',
      value_address: '福田区',
      value_hotel:'富士康大酒店',
      value_state:"",
      loading_state:true,
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      value_time:"",
      value_time2:new Date(),
      input_keyword: '',
      tableData: [],
      urlDate: require("../../assets/logo.png"),
      pageIndex:0,
      isShowPhoto:true
    }
  },
  methods:{
    isLogin:function() {
      this.$router.push({ path: '/' })
    },
    search:function () {
      let self = this; // 定义一个变量指向vue实例
//      const loading = self.$loading({
//        lock: true,
//        text: 'Loading',
//        spinner: 'el-icon-loading',
//        background: 'rgba(0, 0, 0, 0.7)'
//      });

      net.getRquery('/ident/getIdentList', {
        pageIndex: self.pageIndex,
        pageSize:10,
        startDate:self.value_time==""?"":util.timeFormat("yyyy mm dd hh ii ss",self.value_time),
        endDate:self.value_time2==""?"":util.timeFormat("yyyy mm dd hh ii ss",self.value_time2),
        compareResult:self.value_state,
        queryWord:self.input_keyword,
        compareBrand:"鑫鸿"
      },function sucFn(response) {
//        loading.close();
        self.loading_state = false;
        console.log('获取人脸识别数据成功');
        if(response.data.list && response.data.list.length > 0 ){
          self.tableData = response.data.list;
          sessionStorage.setItem('tableData',JSON.stringify(response.data.list));
        }else{
          self.$message({
            message: '加载数据失败',
            type: 'warning'
          });
        }
      },function errFn(response) {
        self.loading_state = false
        console.log(response);
//        loading.close();
      })
    },

    searchBtn:function () {
//      var time = this.value_time;
//      console.log(util.timeFormat("yyyy mm dd hh ii ss",time));
//    .format('yyyy-MM-dd h:m:s')
//      console.log("时间" + time)
      this.loading_state = true
      this.pageIndex = 0;
      this.search();
    },
    pageUp:function () {
      if(this.pageIndex > 0){
        this.pageIndex += -1;
        this.search();
      }

    },
    pageDown:function () {
      this.pageIndex += 1;
      this.search();
    },

    sendCompareResult:function (index,itemContent) {
      let self = this; // 定义一个变量指向vue实例
      if(itemContent.roomNo == "" || itemContent.roomNo == null){
        console.log(itemContent.roomNo);
        self.$message({
          message: '房间号不能为空',
          type: 'warning'
        });
        return
      }

//      const loading = self.$loading({
//        lock: true,
//        text: 'Loading',
//        spinner: 'el-icon-loading',
//        background: 'rgba(0, 0, 0, 0.7)'
//      });

      net.getRquery('/ident/updatePoliceUploadResult', {
        id: itemContent.id,
        policeUploadResult:"2",
        roomNo:itemContent.roomNo
      },function sucFn(response) {
        console.log('上传比对结果成功');
        self.tableData[index].policeUploadResult= "2";
//        loading.close();
      },function errFn(response) {
        console.log('上传比对结果失败！');
//        loading.close();
      })
    },

    personVerify:function (index,itemContent) {
      let self = this; // 定义一个变量指向vue实例
//      const loading = self.$loading({
//        lock: true,
//        text: 'Loading',
//        spinner: 'el-icon-loading',
//        background: 'rgba(0, 0, 0, 0.7)'
//      });

      net.getRquery('/ident/updateCompareResult', {
        id: itemContent.id,
        compareResult:"success_manual",
      },function sucFn(response) {
        console.log('人工验证成功');
        self.tableData[index].compareResult= "success_manual";
//        loading.close();
      },function errFn(response) {
        console.log('人工验证失败！');
//        loading.close();
      })

    },

    chickShowPhoto:function (itemContent) {
      console.log(itemContent);
      this.msgData.msg1 = itemContent.identPhotoUrl;
      this.msgData.msg2 = itemContent.cameraPhotoUrl;
      this.msgData.show = true;
    },

    roomChange:function () {
      console.log("被改变");
    }


  },
  mounted () {
//    let self = this; // 定义一个变量指向vue实例
//    var localTableData = JSON.parse(sessionStorage.getItem('tableData'));
//    console.log("有缓存");
//    console.log(localTableData);
//    if(localTableData && localTableData.length > 0){
//      console.log("有缓存")
//      self.tableData = localTableData;
//      return
//    }
    this.search();
    console.log("路径" + this.$route.path)
    console.log("路径" + this.$route.name)
    console.log("路径" + this.$route.query.hotelId)

  },
}
</script>

<style scoped>

  .body{
    width: 1360px;
    margin:0 auto;
  }

  .top-section{
    background: #0B6390;
    color: #fff;
  }
  .logo_left{
    float: left;
    font-size: 0;
    vertical-align: middle;
    height: 70px;
  }
  .logo_left .icon,
  .logo_left .title{
    display: inline-block;
    vertical-align: middle;
    height: 70px;
    line-height: 70px;
  }
  .logo_left .icon{
    height: 40px;
    color: #fff;
    margin-left: 50px;
  }

  .logo_left .title{
    font-size: 20px;
    color: #fff;
    margin: 0 15px;
  }

  .top_left{
    float: right;
    margin-right: 50px;
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
    width: 120px;
  }


  .input_text{
    display: inline-block;
    margin-left: 60px;
  }

  .input_keyword{
    display: inline-block;
    width: auto;
  }

  .input_room{
    width: 100px;
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

<template>
  <div class="modal" v-on:click="hide" v-if="message.show" >
        <div class="box_wrap">
          <div class="mask"></div>
          <div class="box_cnt">
            <div class="box_middle">
              <img class="img_big" :src="message.msg1" >
              <img class="img_vs" src="../../assets/vs.png" >
              <img class="img_big" :src="message.msg2" >
            </div>
          </div>
        </div>
  </div>
</template>

<script>
  export default {
    props: ['message'],
    data () {
      return {
        isShow:false,
        type0Goods:[
          {
            goodsId:1,
            goodsName:'one',
            price:18
          }, {
            goodsId:2,
            goodsName:'two',
            price:15
          }, {
            goodsId:3,
            goodsName:'three',
            price:15
          }, {
            goodsId:4,
            goodsName:'four',
            price:80
          }
        ],
      };
    },
    methods: {
      hide:function () {
        console.log("遮罩被电击了")
        this.message.show = false;
      }
    }

  }
</script>

<style>
  .modal {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top:0;
    width: 100%;
    height: 100%;
  }
  .box_wrap{
    /*position: relative;*/
  }
  .box_wrap .mask{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 1001;
    background: #000000;
    opacity: 0.6;
    filter: alpha(opacity=75);
  }
  .box_wrap .box_cnt{
    position: relative;
    left: 50%;
    margin-left: -380px;
    margin-top: 200px;
    width: 760px;
    height: 500px;
    z-index: 1001;
    background-color: #fff;
    border-radius: 8px;
  }

  .box_middle{
    position: relative;
    left: 50%;
    bottom: -15%;
    margin-left: -315px;
  }

  .img_big{
    width: 160px;
    height: 220px;
    padding: 50px;
    border: 2px solid #999;
    border-radius: 3px;
  }

  .img_vs{
    width: 50px;
    height: 50px;
    margin: 100px 20px;
  }

</style>

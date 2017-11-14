<template>
  <div class="modal" v-on:click="hide" v-if="message.show" >
      <div class="mask"></div>
      <div class="box_cnt">
        <div class="box_middle">
          <img class="img_big" :src="message.msg1" >
          <img class="img_vs" src="../../assets/vs.png" >
          <img class="img_big" :src="message.msg2" >
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
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top:0;
    z-index: 88;
  }

  .modal .mask{
    position: fixed;
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
  .modal .box_cnt{
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -380px;
    margin-top: -250px;
    width: 760px;
    height: 500px;
    z-index: 1001;
    background: #fff;
    border-radius: 8px;
  }

  .box_middle{
    font-size: 0;
    height: 500px;
    line-height: 500px;
    text-align: center;
  }
  .box_middle .img_big,
  .box_middle .img_vs{
    display: inline-block;
    vertical-align: middle;
  }
  .box_middle .img_big{
    width: 160px;
    height: 220px;
    padding: 50px;
    border: 2px solid #999;
    border-radius: 3px;
  }

  .box_middle .img_vs{
    width: 50px;
    height: 50px;
    margin: 100px 20px;
  }

</style>

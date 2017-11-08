<template>
  <div class="left_nav">
    <ul>
      <li  v-for="goods in type0Goods">
        <i class="icon iconfont icon-zhiliang-xianxing"></i>
        <dev>{{goods.goodsName}}</dev>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {
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
  }
</script>

<style>
  .left_nav{
    color: #fff;
    font-size: 10px;
    height:100%;
    background-color: #1d8ce0;
    float: left;
    width: 5%;
  }

  .icon{
    font-size: 24px;
  }

  .left_nav ul{
    padding: 0px;
    margin: 0px;
  }

  .left_nav li{
    list-style: none;
    text-align: center;
    padding: 10px;
    border-bottom: 1px solid #eee;
  }

</style>

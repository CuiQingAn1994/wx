<template>
  <div class="success">
    <div v-title>提交订单</div>
    <img src="./success.png" alt="" class="icon">
    <p class="tijiao">提交成功</p>
    <p class="money">请联系和彩宝人员线下付款</p>
      <router-link to="/myJkc/1">
        <span class="submit" @click="submit()">确定</span>
      </router-link>
  </div>
</template>

<script>
  export default {
    data () {
      return{
        
      }
    },
    methods:{
      submit(){

      }
    }
  }
</script>

<style scoped>
  .success{
    width: 100%;
    /*height: 100vh;*/
    /*background: #fff;*/
    font-size: 16px;
    color: #333;
    padding:40px 15px 0;
    text-align: center;
  }
  .success .icon{
    /*margin: 100px 0 10px;*/
    width: 90px;
    height: 90px;
    display: block;
    margin:0px auto ;
    /*padding-bottom:50px;*/
  }
  .tijiao{
    margin:50px 0 0px;
  }
  .money{
    text-align: center;
    color:#999;
    height:50px;
    font-size: 12px;
    line-height: 38px;
  }
  .submit{
    display: block;
    width: 100%;
    height: 46px;
    line-height: 46px;
    background-image:-webkit-linear-gradient(left,#FFEC1C ,#FFD40C);
    border-radius: 5px;
    color: #333;
    /*letter-spacing:15px;*/
    margin :0 auto; 
    text-align: center;
  }
</style>

<template>
  <div class="success">
    <div v-title>奖金提现</div>
    <img src="./success.png" alt="" class="icon">
    <p class="tijiao">提现成功</p>
    <div class="content">
      <p class="detail">
        您的奖金已打款至微信零钱,请及时查看!!!
      </p>
    </div>
    <footer>
      <router-link to="/site">
        <span class="submit" @click="submit()">确定</span>
      </router-link>
    </footer>
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
    height: 100vh;
    background: #f6f6f6;
    font-size: 18px;
    color: #333;
  }
  .success .icon{
    margin: 40px 0 30px;
    width: 90px;
    height: 90px;
  }
  .tijiao{
    /*font-weight: bold;*/
  }
  .content{
    margin-top: 15px;
    padding: 0 5px;
  }
  .description{
    font-size: 12px;
    text-align: left;
    margin-left: -4px;
    margin-bottom: 10px;
  }
  .detail{
    font-size: 14px;
    text-align: center;
    line-height: 22px;
    padding:0 10px;
    color:#999;
  }
  footer{
    position: relative;
    margin-top: 30px;
    padding: 0 15px;
  }
  .submit{
    display: block;
    width: 100%;
    height: 44px;
    line-height: 44px;
    background-image:-webkit-linear-gradient(left,#FFEC1C ,#FFD40C);
    border-radius: 7px;
    font-size: 16px;
    color: #333;
  }
</style>

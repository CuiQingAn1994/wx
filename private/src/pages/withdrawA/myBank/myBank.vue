<template>
  <div class="myBank">
    <div v-title>我的银行卡</div>
    <div class="content">
      <div class="logo">
        <img src="./bank_card.png" alt="" class="bank_card">
      </div>
      <div class="detail">
        <p class="bank_name">{{bankName}}&nbsp;&nbsp;尾号<span>{{bankNo}}</span></p>
        <p class="bank_number">储蓄卡</p>
      </div>
    </div>
    <div class="line"></div>
    <router-link :to="'/addBankCard?bankName='+bankName+'&bankNo='+bankNo+'&gainBean='+this.$route.query.gainBean">
    <div class="btn">
      <p class="button">更改银行卡</p>
      
    </div>
    </router-link>
  </div>
</template>

<script>
  export default {
    mounted (){
      this.bankName = this.$route.query.bankName;
      this.bankNo = this.$route.query.bankNo;
    },
    data () {
      return{
        bankName:"",
        bankNo:""
      }
    }
  }
</script>

<style scoped>
  .myBank{
    width: 100%;
    /*height: 100vh;*/
    /*background: #fafafa;*/
    font-size: 16px;
    color: #999999;
  }
  .content{
    margin:0;
    display: flex;
    height: 72px;
    padding: 0 15px;
    background: #fff;
    /*border-bottom: 1px solid #dadcdf;*/
  }
  .logo{
    width: 30px;
    font-size: 0;
  }
  .bank_card{
    display: block;
    width: 30px;
    height: 30px;
    vertical-align: top;
    margin-top: 21px;
  }
  .detail{
    flex: 1;
    text-align: left;
    margin-left: 15px;
    padding: 14px 0;
  }
  .bank_name{
    width:100%;
    display: block;
    text-overflow:ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 14px;
    color:#333;
  }
  .bank_type,.bank_number{
    font-size: 12px;
    color:#999;
  }
  .bank_type{
    margin: 14px 0 8px;
  }
  .btn{
    padding-
    width: 100%;
    height: 44px;
    line-height: 44px;
    /*background: #ffe400;*/
    /*border-radius: 5px;*/
    padding:15px;
    color: #333;
    margin: 15px 0;
  }
  .button{
    width: 100%;
    height: 44px;
    line-height: 44px;
    background: #ffe400;
    border-radius: 5px;
    color: #333;
    /*margin: 30px 15px;*/
     background-image:-webkit-linear-gradient(left,#FFEC1C ,#FFD40C);
  }
   .line{
    width: 100%;
    height: 1px;
    border-top: 1px solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
</style>

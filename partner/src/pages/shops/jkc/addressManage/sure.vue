
<template>
	  <div class="bg">
      <div class="recharge_ok">
        <p class="msg">确认删除该收货地址吗</p>
        <div class="btn_M">
          <p class="sure">删除</p>
          <p class="off" @click="off()">取消</p>
        </div>
      </div>
    </div>
</template>
<script>
  export default{

  }
</script>
<style scoped>
.bg{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: rgba(0,0,0,0.6);
  }
  .recharge_ok{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
   	width: 70%;
    height: 150px;
    background: #fff;
    border-radius: 5px;
    color: #777;
    /*padding: 16px 0;*/
    text-align: center;
    overflow: hidden;
    font-size: 14px;

  }
  .recharge_ok .msg{
    height:100px;
    line-height: 100px;
  }
  .recharge_ok .btn_M{
    height:50px;
    overflow: hidden;
  }
  .recharge_ok .btn_M p{
    width:50%;
    float: left;
    border-top:1px solid #eee;
    line-height: 50px;
    height: 50px;
  }
  .recharge_ok .btn_M p.off{
    background: #ffe400;
  }
 
</style>

<template>
	<div class="bgX">
      <div class="recharge_okX">
      		<div class="centerX">
		        <img src="./success.png" alt="" class="iconX">
		        <p class="bg_contentX">{{pMsg}}</p>
      		</div>
      </div>
    </div>
</template>
<script>
  export default{
    props:['pMsg'],
    data(){
      return{
      }
    }
  }
</script>
<style scoped>
.bgX{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    /*background: rgba(0,0,0,0.6);*/
  }
  .recharge_okX,.recharge_noX{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
   	width: 40%;
    height: 20%;
    background: rgba(0,0,0,0.6);
    border-radius: 5px;
    color: #fff;
    padding: 16px 0;

  }
  .iconX{
    width: 40px;
    height: 40px;
    display: block;
    margin:0 auto;
  }
  .bg_contentX{
    margin-top: 3%;
    text-align: center;
  }
  .centerX{
  	position: absolute;
  	top:50%;
  	width:100%;
  	transform:translateY(-50%);
  }
</style>

<template>
	<div class="bg">
      <div class="recharge_ok">
      		<div class="center">
		        <img src="./success.png" alt="" class="icon">
		        <p class="bg_content">保存成功</p>
      		</div>
      </div>
    </div>
</template>
<style scoped>
.bg{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: rgba(0,0,0,0.6);
    z-index:10;
  }
  .recharge_ok,.recharge_no{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
   	width: 40%;
    height: 20%;
    background: #fff;
    border-radius: 5px;
    color: #fff;
    padding: 16px 0;

  }
  .icon{
    width: 40px;
    height: 40px;
    display: block;
    margin:0 auto;
  }
  .bg_content{
    margin-top: 3%;
    text-align: center;
  }
  .center{
  	position: absolute;
  	top:50%;
  	width:100%;
  	transform:translateY(-50%);
  }
</style>
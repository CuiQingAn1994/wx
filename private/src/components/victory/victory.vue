<template>
	<div class="bg">
            <div class="recharge_ok">
                <img class="icon" v-if="victory" src="./success.png" alt="">
                <img class="icon" v-if="!victory" src="./fail.png" alt="">
                <p class="bg_content">{{behavior}}</p>
            </div>
    </div>
</template>
<script>
	export default{
		props:['behavior','victory']
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
    width: 240px;
    height: 180px;
    background: white;
    /*border-radius: 5px;*/
    color: #333;
    text-align: center;
  }
  .recharge_ok .icon{
    position: absolute;
    height:90px;
    left:50%;
    top:-50px;
    transform:translatex(-50%);
  }
   .recharge_ok .bg_content{
        /*line-height: 180px;*/
        padding:70px 20px 0;
        font-size: 16px;
        color:#333;
    }
</style>
<template>
	<div class="bg" >
		<div class="recharge_ok">
			<p class="msg">{{title}}</p>
			<div class="btn_M">
				<p class="sure" @click="this.$parent.confirm" >确定</p>
				<p class="off" @click="this.$parent.cancel">取消</p>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		props:["title"],
		methods:{
		}
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
    z-index:1;
  }
  .recharge_ok{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
   	width: 300px;
    height: 200px;
    background: #fff;
    /*border-radius: 5px;*/
    color: #333;
    /*padding: 16px 0;*/
    text-align: center;
    overflow: hidden;
    font-size: 18px;

  }
  .recharge_ok .msg{
    height:140px;
    line-height: 140px;
  }
  .recharge_ok .btn_M{
    height:45px;
    overflow: hidden;
    padding:0 15px;
    position: absolute;
    bottom: 15px;
  }
  .recharge_ok .btn_M p{
    width:130px;
    float: left;
  	border-radius: 5px;
    line-height: 44px;
    height: 44px;
    font-size: 16px;
    color:#333;
  }
  .recharge_ok .btn_M p.off{
    border:2px solid #d0d0d0;
  }
  .recharge_ok .btn_M p.sure{
    background-image:-webkit-linear-gradient(left,#FFEC1C ,#FFD40C);
  	border:none;
  	margin-right:10px;
  }
</style>
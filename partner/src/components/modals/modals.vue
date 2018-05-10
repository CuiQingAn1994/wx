<template>
	<div class="bg" >
		<div class="recharge">
			<p class="msg">{{title}}</p>
			<div class="btn_Modals">
				<span class="confirm" @click="this.$parent.confirm" >确定</span>
				<span class="cancel" @click="this.$parent.cancel">取消</span>
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
    z-index:9999999;
  }
  .recharge{
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
  .recharge .msg{
    height:140px;
    line-height: 140px;
  }
  .recharge .btn_Modals{
    height:45px;
    overflow: hidden;
    padding:0 20px;
    position: absolute;
    bottom: 15px;
  }
  .recharge .btn_Modals span{
    /*display: inline-block;*/
    /*margin:0 5px;*/
    width:120px;
    float: left;
  	border-radius: 5px;
    line-height: 44px;
    height: 44px;
    font-size: 16px;
    color:#333;
  }
  .recharge .btn_Modals span.cancel{
    border:1px solid #d0d0d0;
  }
  .recharge .btn_Modals span.confirm{
    margin-right:20px;
    background-image:-webkit-linear-gradient(left,#FFEC1C ,#FFD40C);
    /*border:1px solid #d0d0d0;*/
  	/*border:none;*/
  	/*margin-right:10px;*/
  }
</style>

<template>
	<div class="list">
		<div class="box">
			<div class="left">
				<div class="leftT">
					{{leftT}}
				</div>
				<div class="leftB">
					{{leftB}}
				</div>
			</div>
			<div class="right">
				<p class="create">{{rightC}}</p>
			</div>
		</div>
		<div class="line"></div>
	</div>
</template>
<script>
	export default{
		props:['leftT','leftB','rightC'],
		data(){
			return{

			}
		}
	}
</script>
<style scoped>
	.list{
		height:90px;
		width:100%;
		background: #fff;
		color:#333;
	}
	.box{
		height:89px;
		width:100%;
		padding:12px 15px;
		overflow: hidden;
	}
	.left{
		float: left;
		width:60%;
	}
	.leftT{
		height:32.5px;
		line-height: 32.5px;
	}
	.leftB{
		height:32.5px;
		line-height: 32.5px;
	}
	.right{
		width:40%;
		float: right;
		height:65px;
		line-height:65px;
		text-align: right; 

	}
	.create{
		width:70%;
		height:40px;
		float: right;
		line-height:40px;
		font-size: 14px;
		border-radius: 5px;
		text-align: center;
		margin-top:12.5px;
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
<template>
	<div  class="empty">
		<img src="./tips.png" alt="">
		<p>暂无详细记录哦!</p>
	</div>	
</template>
<script>
export default{	
	created(){
		this.space = this.$route.query.space;
	},
	data(){
		return{
			space:""
		}
	}
}
</script>
<style>
	.empty img{
		width:200px;
		padding-top:40px;
		padding-bottom:15px;
		display: block;
		margin:0 auto;
	}
	.empty p{
		font-size: 16px;
		color:#777777;
		text-align: center;
	}
</style>
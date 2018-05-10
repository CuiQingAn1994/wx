<template>
	<section>
		<div v-title>奖品订单</div>
		<div class="nav">
			<p class="bar" :style="{borderBottomColor:idx==0?'#ffe400':'#fff',color:idx==0?'#333333':'#999999'}" @click="all" >全部</p>
			<p class="bar" :style="{borderBottomColor:idx==1?'#ffe400':'#fff',color:idx==1?'#333333':'#999999'}" @click="unclaimed">待收货</p>
			<p class="bar" :style="{borderBottomColor:idx==2?'#ffe400':'#fff',color:idx==2?'#333333':'#999999'}" @click="finished">已完成</p>
			<div class="line" style="float:left" ></div>
		</div>
      <router-view></router-view>
	</section>
</template>
<script>
	export default{
		created(){
			if(this.idx==0){
				this.$router.push({path:'/prizeOrder/all/0'})
			}else if(this.idx==1){
				this.$router.push({path:'/prizeOrder/unclaimed/1'})
			}else if(this.idx==2){
				this.$router.push({path:'/prizeOrder/finished/2'})
			}
			console.log('执行了')
		},
		data(){
			return{
				header:['全部','待收货','已完成'],
				idx:this.$route.params.id,
			}
		},
		methods:{
			all(){
				this.idx=0
				this.$router.replace({path:'/prizeOrder/all/0'})
			},
			unclaimed(){
				this.idx=1
				this.$router.replace({path:'/prizeOrder/unclaimed/1'})
			},
			finished(){
				this.idx=2
				this.$router.replace({path:'/prizeOrder/finished/2'})
			}
		},
		watch:{
			idx(){
				// this.$router.push({path:'/prizeOrder/all/'+this.idx})
				// console.log(1111)
			}
		}
	}
</script>
<style scoped>
	section{
		padding-top:50px;
		height:100vh;
		background: #fff;
	}
	.nav{
     	width:100%;
     	height:50px;
     	font-size: 16px;
     	line-height: 50px;
     	overflow: hidden;
        background: #fff;
        position: fixed;
        top:0;
        left:0;
        z-index:99999999;
     }
    .nav .bar{
     	float: left;
     	width:33.33333333%;
     	height:49px;
     	text-align: center;
     	border-bottom:2px solid #999;
     	color:#999999;
    }
     .record{
		box-sizing:border-box;
		padding:0 15px;
		overflow: hidden;
		height:74px;
		background: #fff;
		/*border-bottom: 1px solid #eee;*/

	}
	 div.left{
		width:50px;
		text-align: center;
		float: left;
		height:90px;
	}
	 div.right{
		width:20%;
		text-align: center;
		float: right;
		height:90px;
	}
	 div.left{
		overflow: hidden;
	}
	 div.left img{
		width:30px;
		float: left;
		margin-top:22px;
		
	}
	 div.center{
		width:50%;
		text-align: center;
		float: left;
		height:74px;
		padding:15px 0;
		box-sizing:border-box;
	}
	 div.center p{
		height:20px;
		line-height: 20px;
		text-align: left;
	}
	 div.center p.title{
		height:24px;
		line-height: 24px;
		font-size: 14px;
		color:#333;
		display: block;
   		text-overflow:ellipsis;
   		white-space: nowrap;
   		overflow: hidden;
	}
	 div.center p.jifen{
		height:18px;
		line-height: 18px;
		height:20px;
		line-height: 20px;
		font-size: 12px;
		color:#777;
		text-align: left;
	}
	 div.center p.timer{
		height:20px;
		line-height: 20px;
		color:#999;
		font-size: 12px;
		color:#999;
	}
	 div.right {	
		font-size: 14px;
		width:30%;
		color:#777;
		height:74px;
		box-sizing:border-box;
	} 
	.btn{
		width:100%;
		height:50px;
		line-height: 50px;
		text-align: center;
		background: #f6f6f6;
		color:#999;
		font-size: 14px;

	}
	 .sta{
		float: right;
		width:60px;
		line-height: 74px;
		font-size: 14px;

	}
	.detail{
		float: right;
		/*height:16px;*/
		width:8px;
		/*height:14px;*/
		/*padding-top:27px;*/
		margin-top:28px;
	}
</style>
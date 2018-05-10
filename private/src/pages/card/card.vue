<template>
	<section>
		<div v-title>卡牌兑奖</div>
		<div class="nav">
			<p class="bar" :style="{borderBottomColor:idx==0?'#ffe400':'#fff',color:idx==0?'#333333':'#999999'}" @click="exchange" >我要兑奖
            </p>
			<p class="bar" :style="{borderBottomColor:idx==1?'#ffe400':'#fff',color:idx==1?'#333333':'#999999'}" @click="record">兑换记录
			</p>
		  <div class="line" style="float:left" ></div>
        </div>
		<!-- <div class="line"></div> -->
		<div v-if="idx==0" class="exchange">
			<div class="accountNum">
				<p class="title">编号</p>
				<input type="text" placeholder="请输入宝卡封面的编号" class="print">
				<div class="line"></div>
			</div>
			<div class="password">
				<p class="title">密码</p>
				<input type="text" placeholder="请输入宝卡封面的密码" class="print">
				<div class="line"></div>
			</div>
		  <div class="btnBox">
		  	<div class="changeBtn" @click="goChange" >确认兑奖</div>
		  </div>
		</div>
		<div class="record" v-if="idx==1">
			<space></space>
		</div>
		<modals v-if="confirmChange" title="确认兑换?"></modals>
		<victory v-if="success" :victory="result" behavior="兑换成功!"></victory>
	</section>
</template>
<script>
  import Loading from '../../components/loading'
  import Err from '../../components/err/err'
  import Modals from '../../components/modals/modals'
  import Space from '../../components/space/space'
  import Victory from '../../components/victory/victory'
	export default{
		components:{Loading,Err,Modals,Space,Victory},
		data(){
			return{
				idx:0,
				confirmChange:false,
				result:true,
				success:false,
			}
		},
		methods:{
			// 兑换
			exchange(){
				this.idx=0
			},
			// 记录
			record(){
				this.idx=1
			},
			// 确定
			confirm(){
				// alert('兑换成功')
				this.success = true;
				this.confirmChange = false;
				var that = this;
				setTimeout(function(){
					that.success = false;
				}, 1000)
			},
			// 取消
			cancel(){
				this.confirmChange = false;
			},
			goChange(){
				this.confirmChange = true;
			}
		}
	}
</script>
<style scoped>
	input::placeholder{
		font-size: 16px;
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
     }
    .nav .bar{
     	float: left;
     	width:50%;
     	height:49px;
     	text-align: center;
     	border-bottom:2px solid #999;
     	color:#999999;
    }
	section{
		padding-top:50px;
	}
	.accountNum{
		background: #fff;
		padding:0 15px;
	}
	.password{

		background: #fff;
		padding:0 15px 20px;
	}
	.title{
		text-align: left;
		font-size: 14px;
		color:#333;
		height:40px;
		line-height: 40px;
	}
	.print{
		border:none;
		outline: none;
		width:100%;
		height:50px;
		font-size: 20px;
		line-height: 50px;
		padding-left: 10px;

	}
	.btnBox{
		padding:0 15px;
		margin-top:50px;
	}
	.changeBtn{
		width:100%;
		height:45px;
		background-image:-webkit-linear-gradient(left,#FFEC1C ,#FFD40C);
		line-height: 45px;
		border-radius: 5px;
	}
	.record{
		height:calc(100vh - 50px);
		background: #fff;
	}
</style>
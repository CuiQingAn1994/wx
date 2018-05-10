<template>
	<section class="detail">
		<div v-title>奖品详情</div>
		<err v-if="err"></err>
		<div v-else>
			<!-- <div class="line pt"></div> -->
			<!-- <div class="line"></div>			 -->
			<div class="title">奖品详情</div>
			<div class="pl">
				<div class="line"></div>
				
			</div>
			<div class="del">
				<div class="left">
					<img class="titleImg" :src="good.thumb" alt="">
				</div>
				<div class="right">
					<p class="name">{{good.name}}</p>
					
				</div>
				<!-- <p>购买数量:</p> -->
			</div>
			<div class="price">付款金额<span class="allPrice">{{good.priceNum}}金豆</span></div>
			<div class="price">订单编号<span class="allPrice">{{data._id}}</span></div>
			<div v-if="!(data.step==1000)">
				
				<div  class="line mb"></div>
				<div class="line"></div>
				<h3 class="title">领奖信息</h3>
				<div class="pl">
					<div class="line"></div>
				</div>
				<div class="del">
					<p><span class="msg_name">领取人</span><span class="msg_con">{{data.consignee}}</span></p>
					<p><span class="msg_name">手机号</span><span class="msg_con">{{data.mobile}}</span></p>
					<p><span class="msg_name">收货地址</span><span class="msg_con">{{data.address}}</span></p>
				</div>
			</div>
		</div>
		<div class="takeBox" v-if="data.step==1000"><div class="goTake" @click="goGet">确认领取</div></div>
		<div class="takeBox" v-if="data.step==3000"><div class="goTake" @click="goHave">确认收货</div></div>
		<div class="bg" v-if="get" >
			<div class="recharge_ok">
				<div class="inBox">
					<p>
						<span class="labal">领取人</span><input type="text" v-model="person" placeholder="请输入领取人" class="tipsMsg">
					</p>
					<div class="line"></div>
					<p>
						<span class="labal">手机号</span><input type="text" v-model="phoneNum" placeholder="请输入手机号" class="tipsMsg">
					</p>
					<div class="line"></div>
					<p>
						<span class="labal">收货地址</span><input type="text" v-model="address" placeholder="请输入收货地址" class="tipsMsg">
					</p>
					<div class="line"></div>
					
				</div>
				<div class="btn_M">
					<p class="sure" @click="sure" >确定</p>
					<p class="off" @click="off" >取消</p>
				</div>
				<div class="warn" v-if="warn">{{warnMsg}}</div>
			</div>
		</div>
		<loading v-if="zhuan"></loading>
		<modals v-if="taked" title="确认已收货?"></modals>
		<victory v-if="success" :victory="true" :behavior="behaviorMsg"></victory>
	</section>
</template>
<script>
import Loading from '../../components/loading'
import Err from '../../components/err/err'
import Modals from '../../components/modals/modals'
import Victory from '../../components/victory/victory'
// import Success from '../../../components/successful/successful.vue'
	export default{
		components:{Loading,Err,Modals,Victory},
		data(){
			return{
				warn:false,
				warnMsg:"",
				person:"",
				phoneNum:"",
				address:"",
				get:false,
				behaviorMsg:"",
				taked:false,
				data:{},
				good:{},
				zhuan:false,
				err:false,
				id:"",
				success:false

			}
		},
		methods:{
			query(){
				this.id = this.$route.query.id;
				this.zhuan = true;
				var that = this;
				console.log({id:this.id})
				this.$http.post(_config.server+"/shop/order/detail",{id:this.id}
				).then(res=>{
					console.log(res)
					if(res.status==200&&res.data.status==10000){
						this.data = res.data.data
						this.good = res.data.data.good;
					}
					setTimeout(function(){
						that.zhuan = false;
					}, 300)
				},function(err){
					setTimeout(function(){
						that.zhuan = false;
					}, 500)
					that.err = true;

				})
			},
			// 确认
			confirm(){
				this.zhuan = true;
				this.$http.post(_config.server+'/shop/order/receipt',{id:this.id}).then(res=>{
					console.log(res)
					if(res.status==200&&res.data.status==10000){
						this.zhuan = false;
						this.taked = false;
						this.behaviorMsg = "收货成功";
						this.success = true;
						var that = this;
						setTimeout(function(){
							that.success = false;
							that.$router.push({path:'/mallOrders'})
						}, 1000)
					}
				})
			},
			// 取消
			cancel(){
				this.taked = false
			},
			// 确认收货
			goHave(){
				this.taked = true
			},
			// 确认领取
			goGet(){
				this.get = true;
			},
			sure(){
				if(this.person==""){
					this.warnMsg = '请输入领取人'
					this.warn = true;
					var that = this;
					setTimeout(function(){
						that.warn = false;
					}, 1000)
					return
				}else if(this.phoneNum==""){
					this.warnMsg = '请输入手机号'
					this.warn = true;
					var that = this;
					setTimeout(function(){
						that.warn = false;
					}, 1000)
					return
					
				}else if(this.address ==""){
					this.warnMsg = '请输入收货地址'
					this.warn = true;
					var that = this;
					setTimeout(function(){
						that.warn = false;
					}, 1000)
					return
					
				}else if(!(/^1(3|4|5|7|8)\d{9}$/.test(this.phoneNum))){
					this.warnMsg = '手机号格式有误'
					this.warn = true;
					var that = this;
					setTimeout(function(){
						that.warn = false;
					}, 1000)
					return
				}
				this.zhuan = true;
				var params = {
					id:this.id,
					consignee:this.person,
					mobile:this.phoneNum,
					address:this.address,
				}
				this.$http.post(_config.server+'/shop/order/receive',params).then(res=>{
					console.log(res)
					if(res.status==200&&res.data.status==10000){
						this.zhuan = false;
						this.get = false;
						this.behaviorMsg = "领取成功";
						this.success = true;
						var that = this;
						setTimeout(function(){
							that.success = false;
							that.$router.push({path:'/mallOrders'})
						}, 1000)
					}
				})
			},
			off(){
				this.get = false;
			}
		},
		created(){
			this.query();
		},
		watch:{
			person(){
				if(this.person.length>4){
					this.person = this.person.substring(0,4)
				}
			}
		}
	}
</script>
<style scoped>
	*{
		text-align: left;
	}
	.detail{
		/*height:100vh;*/
		/*background: #fff;*/
		/*padding-top:9px;*/
	}
	/*.name{
		padding-top:15px;
	}*/
	.title{
		text-align: left;
		height:50px;
		line-height: 50px;
		background: #fff;
		padding:0 15px;
		font-size: 14px;
		color:#333;
		/*border-bottom:1px solid #ccc;*/
	}
	.del{
		padding:15px 15px 0;
		overflow: hidden;
		background: #ffffff;
		/*margin-bottom:10px;*/
		padding-bottom: 10px;
	}
	.del p{
		height:30px;
		line-height: 30px;
		font-size: 14px;
		overflow: hidden;
		/*color:#777;*/
	}
	.msg_name{
		float: left;
		color:#666;
	}
	.msg_con{
		float: right;
		color:#666;
	}
	.button{
		padding:0 15px;
		margin-top:30px;
	}
	.btn{
		width:100%;
		height:40px;
		background-image:-webkit-linear-gradient(left,#FFEC1C ,#FFD40C);
		color:#333;
		text-align: center;
		line-height: 40px;
		border-radius: 5px;
		margin:0 auto;
	}
	.left{
		width:25%;
		height:60px;
		float: left;
	}
	.right{
		width:75%;
		float: left;
		color:#333;
		padding-top:15px;
	}
	.num{
		float: right;
	}
	.price{
		height:50px;
		line-height: 50px;
		padding:0 15px;
		background: #fff;
		color:#999;
	}
	.titleImg{
		width:60px;
		height:60px;
		border-radius: 50%;
		/*float: left;*/
	}
	.allPrice{
		float: right;
		color: #FF565C;
	}
	.ml{
		margin-left:15px;
	}
	.pt{
		margin-top:9px;
	}
	.tips{
		font-size: 12px;
		padding-top:15px;
		text-align: center;
		color:#999;

	}
	.goActive{
		color:#2A9FFF;
	}

	.mb{
	 	margin-bottom:10px;
	 }
	 .takeBox{
	 	padding:30px 15px;
	 }
	 .goTake{
	 	width:100%;
		height:40px;
		background-image:-webkit-linear-gradient(left,#FFEC1C ,#FFD40C);
		color:#333;
		text-align: center;
		line-height: 40px;
		border-radius: 5px;
	 }



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
  .btn_M{
    height:45px;
    overflow: hidden;
    padding:0 15px;
    position: absolute;
    bottom: 15px;
  }
 .btn_M p{
    width:130px;
    float: left;
  	border-radius: 5px;
    line-height: 44px;
    height: 44px;
    font-size: 16px;
    color:#333;
    text-align: center;
  }
.off{
    border:2px solid #d0d0d0;

  }
.sure{
    background-image:-webkit-linear-gradient(left,#FFEC1C ,#FFD40C);
  	border:none;
  	margin-right:10px;
  }
  .tipsMsg{
  	width:200px;
  	height:30px;
  	margin-top:10px;
  	border:none;
  	outline: none;
  	/*border-bottom:1px solid #;*/
  }
  .inBox{
  	padding:0 15px;
  	font-size: 16px;
  }
  .labal{
  	width:70px;
  	display: inline-block;
  	/*text-align: right;*/
  }
  .warn{
  	position: absolute;
  	top:50%;
  	left:50%;
  	transform:translate(-50%,-50%);
  	width:150px;
    height:50px;
	background:rgba(0,0,0,.7);
    border-radius:5px;
    font-size:14px;
    color:#fff;
    line-height: 50px;
    text-align: center;
  }
</style>

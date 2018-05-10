<template>
	<section class="detail">
		<div v-title>订单详情</div>
		<err v-if="err"></err>
		<div v-else>
			<div class="line pt"></div>
			<!-- <div class="line"></div>			 -->
			<div class="title">订单内容</div>
			<div class="pl">
				<div class="line"></div>
				
			</div>
			<div class="del">
				<div class="left">
					<img class="titleImg" :src="intant.thumb" alt="">
				</div>
				<div class="right">
					<p class="">类型:{{intant.name}}</p>
					<p>
						<span>面值:{{intant.price}}元</span>
						<span class="num" v-if="data.num>=intant.num">×{{parseInt(data.num/intant.num)}}包 (共{{data.num}}张)</span> 
						<span class="num"  v-if="data.num<intant.num">共{{data.num}}张</span>
					</p>
				</div>
				<!-- <p>购买数量:</p> -->
			</div>
			<div class="price">付款金额<span class="allPrice">{{intant.price*data.num | currency("￥",2)}}</span></div>
			<div class="line mb"></div>
			<div class="line"></div>
			<h3 class="title">下单信息</h3>
			<div class="pl">
				<div class="line"></div>
			</div>
			<div class="del">
				<p><span class="msg_name">昵称</span><span class="msg_con">{{data.name}}</span></p>
				<p><span class="msg_name">手机号</span><span class="msg_con">{{data.mobile}}</span></p>
				<p><span class="msg_name">所属设备</span><span class="msg_con">{{device.deviceName}}</span></p>
				<p><span class="msg_name">设备SN码</span><span class="msg_con">{{data.deviceNo}}</span></p>
				<p><span class="msg_name">订单编号</span><span class="msg_con">{{data._id}}</span></p>
			</div>
			<div v-if="this.$route.query.fin==0" class="button">
				
				<div v-if="this.$route.query.fin==0" class="btn" @click = "sended()">确认已送达</div>
				<p class="tips">友情提示：请确认即将售出的即开彩已激活。
					<router-link class="goActive" to="/jkcActive">去激活。</router-link>
				</p>
			</div>
		</div>
		<div class="bg"v-if="mt_show" >
    	  <div class="recharge_ready">
    	    <p class="msg">确认已送达?</p>
    	    <div class="bton_M">
    	      <p class="sure" @click="sure()">确定</p>
    	      <p class="off" @click="off()">取消</p>
    	    </div>
    	  </div>
    	</div>
		<loading v-if="zhuan"></loading>
		<success :pMsg="msgData" v-if="success"></success>
	</section>
</template>
<script>
import Loading from '../../../../components/loading'
import Err from '../../../../components/err/err'
import Success from '../../../../components/successful/successful.vue'
	export default{
		components:{Loading,Err,Success},
		data(){
			return{
				success:false,
				msgData:"确认成功",
				mt_show:false,
				zhuan:false,
				err:false,
				id:"",
				data:{	
				},
				device:{},
				intant:[],
				// server:'http://api.hecaibao88.com'
				// server:'http://192.168.1.101:3000'
			}
		},
		methods:{
			off(){
				this.mt_show = false;
			},
			sure(){
				var me = this;
				this.zhuan = true;
				this.$http.post(_config.server+"/intant/merchant/trace/change",{id:this.id}).then(function(res){
						console.log(res)
						me.zhuan = false;
						me.success = true;
					if(res.status==200&&res.data.status==10000){
						me.$router.push({path:'/jkc/0'})					
					}
				})
			},
			sended(){
				// console.log(this.server+"/intant/merchant/trace/change?id="+this.id)
				this.mt_show = true;
				
			}
		},
		created(){
			var me = this;
			this.id = this.$route.query.id;
			console.log(this.id)
			me.zhuan = true;
			console.log(_config.server+"/intant/merchant/trace/detail?id="+this.id)
			this.$http.get(_config.server+"/intant/merchant/trace/detail?id="+this.id
			).then(function(res){
				console.log(res)
				setTimeout(function(){
					me.zhuan = false;
				}, 500)
				if(res.status==200&&res.data.status==10000){
					me.data = res.data.data.data;
					me.device = res.data.data.device;
					me.intant = res.data.data.intant[0];
					// console.log(me.intant[0])
					// me.data.intant = res.data.

				}
			},function(err){
				setTimeout(function(){
					me.zhuan = false;
				}, 500)
				me.err = true;
				console.log("服务器报错了")
			})
		}
	}
</script>
<style scoped>
	.detail{
		/*height:100vh;*/
		/*background: #fff;*/
		/*padding-top:9px;*/
	}
	.title{
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
/*模态框*/
.bg{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: rgba(0,0,0,0.6);
  }
  .recharge_ready{
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
  .recharge_ready .msg{
    height:140px;
    line-height: 140px;
  }
  .recharge_ready .bton_M{
    height:45px;
    overflow: hidden;
    padding:0 15px;
    position: absolute;
    bottom: 15px;
  }
  .recharge_ready .bton_M p{
    width:130px;
    float: left;
  	border-radius: 5px;
    line-height: 44px;
    height: 44px;
    font-size: 16px;
    color:#333;
  }
  .recharge_ready .bton_M p.off{
    border:2px solid #d0d0d0;
  }
  .recharge_ready .bton_M p.sure{
    background-image:-webkit-linear-gradient(left,#FFEC1C ,#FFD40C);
  	border:none;
  	margin-right:10px;
  }
</style>

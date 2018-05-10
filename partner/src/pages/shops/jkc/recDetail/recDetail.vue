<template>
	<section class="detail">
		<div v-title>订单详情</div>
		<!-- <err v-if="err"></err> -->
		<!-- <loading></loading> -->
		<div >
			<div class="line pt"></div>			
			<h3 class="title">订单内容</h3>
			<div class="pl">
				
				<div class="line"></div>
			</div>
			<div class="del">
				<div class="left">
					<img class="titleImg" :src="intantObj.thumb" alt="">
				</div>
				<div class="right">
					<p class="">类型:{{intantObj.name}}</p>
					<p>
						<span>面值:{{intantObj.price}}元</span>
						<span class="num">×{{num/intantObj.num}}包 (共{{num}}张)</span> 
						<!-- <span class="num"  v-if="data.num<intant.num">共{{data.num}}张</span> -->
					</p>
				</div>
				<!-- <p>名称:{{intantObj.name}}</p> -->
				<!-- <p>面值:{{intantObj.price}}元</p> -->
				<!-- <p>购买数量:{{num/intantObj.num}}包 ({{num}}张)</p> -->
				<!-- <p>付款金额:{{intantObj.price*num | currency('',2)}}</p> -->
			</div>
			<div class="price">付款金额<span class="allPrice">{{intantObj.price*num | currency("￥",2)}}</span></div>
			<div class="line mb"></div>
			<div class="line"></div>
			<h3 class="title">下单信息</h3>
			<div class="pl">
				<div class="line pl"></div>
			</div>
			<div class="del">
				<p><span class="msg_name">商家名称</span><span class="msg_con">{{storeName}}</span></p>
				<p><span class="msg_name">商家账号</span><span class="msg_con">{{mobile}}</span></p>
				<p><span class="msg_name">订单编号</span><span class="msg_con">{{intant}}</span></p>
			</div>
			<div class ="button">
				<p v-if="step==4000" class="btn" @click="goSend()">确认已收货</p>
			</div>
		</div>
		<div class="bg"v-if="mt_show" >
    	  <div class="rechar">
    	    <p class="msg">确认已收货?</p>
    	    <div class="btn_take">
    	      <p class="sure" @click="sure()">确定</p>
    	      <p class="off" @click="off()">取消</p>
    	    </div>
    	  </div>
    	</div>
		<loading v-if="zhuan"></loading>
		<!-- <success v-if="success"></success> -->
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
			mt_show:false,
			err:false,
			zhuan:false,
			success:false,
			step:5000,
			// server:'http://api.hecaibao88.com'
			// server:'http://192.168.1.101:3000'
			intantObj:{},
			num:0,
			intant:"",
			storeName:"",
			mobile:hcb.user().mobile,
			msgData:"确认成功"
		}
	},
	methods:{
		query(){
			var that = this;
			console.log(this.$route.query.storeNo,this.$route.query.intant)
			console.log(_config.server+'/intant/merchant/order/detail?storeNo='+this.$route.query.storeNo+'&id='+this.$route.query.id)

			this.$http.get(_config.server+'/intant/merchant/order/detail?storeNo='+this.$route.query.storeNo+'&id='+this.$route.query.id).then(function(res){
			// this.$http.get(this.server+'/intant/merchant/order/detail?storeNo='+this.$route.query.storeNo+'&intant='+this.$route.query.intant).then(function(res){
				// console.log(res)
				if(res.status==200&&res.data.status==10000){
					console.log(res)
					that.step = res.data.data[0].step;
					that.intantObj = res.data.data[0].intantObj;
					that.num = res.data.data[0].num;
					that.intant = res.data.data[0]._id;
					that.storeName = res.data.data[0].store.name;
					// me.$router.push({path:'/jkc'})					
				}
			})
		},
		send(){
			var that = this;
			this.mt_show = false;
			this.zhuan = true;
			this.$http.post(_config.server+'/intant/merchant/order/complete',{id:this.$route.query.id}).then(function(res){
				// console.log(res)
				that.zhuan = false;
				that.success = true;
				setTimeout(function(){
					that.$router.push({path:'/myJkc/1'})
				},1000)

			})
		},
		off(){
			this.mt_show = false;
		},
		sure(){
			this.send();
		},
		goSend(){
			this.mt_show = true;
		}
	},

	created(){
		this.query();
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
	.bg{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: rgba(0,0,0,0.6);
  }
  .rechar{
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
  .rechar .msg{
    height:140px;
    line-height: 140px;
  }
  .rechar.btn_take{
    height:45px;
    overflow: hidden;
    padding:0 15px;
    position: absolute;
    bottom: 15px;
  }
  .rechar .btn_take p{
    width:130px;
    float: left;
  	border-radius: 5px;
    line-height: 44px;
    height: 44px;
    font-size: 16px;
    color:#333;
  }
  .rechar .btn_take p.off{
    border:2px solid #d0d0d0;
  }
  .rechar .btn_take p.sure{
    background-image:-webkit-linear-gradient(left,#FFEC1C ,#FFD40C);
  	border:none;
  	margin-right:10px;
  }
</style>
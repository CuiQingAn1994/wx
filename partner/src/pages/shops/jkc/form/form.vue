<template>
	<div class="form">
		<div v-title>下单页面</div>
		<div class="address" v-if="address_show">
			<div class="line"></div>
			<router-link :to="'/addressList?id='+this.$route.query.id+'&num='+this.$route.query.num+'&_id='+addressId">	
				<div class="add_left">
					<p class="p_msg">
						<span class="name">{{address.consignee}}</span>
						<span class="phone">{{address.tel}}</span>
					</p>
					<p class="where">{{address.region}} {{address.address}}</p>	
				</div>
				<div class="add_right">
					<img src="./right.png" alt="">
				</div>
			</router-link>
		</div>
		<div v-if="address_show" class="line mb"></div>
		<div class ="content">
			<div class="line"></div>
			<div class="order">
				<div class="left">
					<img class="thumb" :src="thumb" alt="">
				</div>
				<div class="right">
					<p class="title"> {{name}} ( {{eachNum}}&nbsp;张&nbsp;/&nbsp;包 )</p>
					<div class="bottom">
						<!-- <p class="price">{{price | currency("￥",2)}}</p> -->
						<p class="price">面值:{{price}}元</p>
						<p class="num"> 
							<!-- <span class="re_add" :style="{background:this.num==1?'#979797':'#ffe400'}" 		@click="reduce()">－</span> 
							<input v-model="num" style="padding-left:5px" type="Number">包 <span class="re_add" 		@click="add()">＋</span> -->
							<span class="bao">包</span>

							
							<span class="add_img">
								<img  src="./add.png" alt="" class="re_add" @click="add()">&nbsp;&nbsp;
							</span>
							<span class="changeNum">
								
								<input v-model="num" class="inNum"  type="Number"> 
							</span>
							<span class="reduce"    @click="reduce()" >
								<img  src="./reduce.png" alt="" class="re_add" v-if="!(num<=1)">
								<img  src="./dark_reduce.png" alt="" class="re_add" v-if="num<=1">
							</span>
							
							
							<!-- <span class="allNum">(&nbsp;共&nbsp;{{this.$route.query.num*num}}&nbsp;张&nbsp;)</span> -->
						</p>
					</div>
				</div>
				<!-- <div class="left"></div> -->
			</div>
			<!-- <p class="num">类型: 顶呱刮</p> -->
			<div class="line"></div>
		</div>
		<div class="add" v-if="!address_show">
			<router-link :to="'/addAddress?router=form&id='+this.$route.query.id+'&num='+this.$route.query.num">
				<p class="add_btn">添加新地址</p>
			</router-link>
			<p class="add_msg">您还没有收货地址，请增加地址哦</p>
		</div>
		<div class="sub">
			<div class="line"></div>
			<p class="btn1" @click="toBuy">提交订单</p>
			<p class="money">合计：{{this.price*this.num*eachNum | currency("",2)}}元</p>
		</div>
		<!-- <h1>{{num}}</h1> -->
		<!-- <div class="bg" v-if="show">
	      <div class="recharge_no">
	        <p class="bg_content">补货成功</p>
	        <router-link to="/jkc">	        	
	        	<button>确定</button>
	        </router-link>
	      </div>
   		</div> -->
   		<div class="bg" v-if="fail">
      		<div class="recharge_no">
      		  <img src="./failure.png" alt="" class="icon">
      		  <p class="bg_tips">系统提示</p>
      		  <p class="bg_content">订单提交失败!</p>
      		  <button @click="hide()">确定</button>
      		</div>
    	</div>
   		<loading v-if="zhuan"></loading>
		<!-- <fail v-if="fail"></fail> -->
		<div class="bg1"v-if="mt_show" >
    	  <div class="recharge_ok1">
    	    <p class="msg1">是否提交订单?</p>
    	    <div class="btn_M1">
    	      <p class="sure1" @click="sure()">确定</p>
    	      <p class="off1" @click="off()">取消</p>
    	    </div>
    	  </div>
    	</div>
	</div>
</template>
<script>

	import Loading from '../../../../components/loading'
	import Fail from '../../../../components/fail/fail'
 	// import ModelBox from '../../components/modelBox/modelBox'
 	import Err from '../../../../components/err/err'

	export default{
		components:{Loading,Err,Fail},
		data(){
			return {
				mt_show:false,
				idW:"",
				eachNum:"",
				name:"",
				price:"",
				thumb:"",
				zhuan:false,
				show:false,
				fail:false,
				num:1,
				buy:{
					num:"",
					storeNo:"",
					intant:"",
					// _id:this.$route.query._id,
				},
				addressId:"",
				addressIdA:"",
				addressIdB:"",
				address:{
				},
				haveAddress:[],
				address_show:false,
				server:'http://api.hecaibao88.com',
				
			}
		},
		methods:{
			reduce(){
				if(this.num<2){
					return
				}else{
					this.num--;
				}

			},
			add(){
				this.num++;
			},
			goBuy(){
				// this.addressId = 
				console.log(this.addressId)
				
				if(this.address_show){
				var me=this;
				this.zhuan = true;
				console.log(this.$store.state.msg)
				this.buy.num = this.num*this.$route.query.num;
				this.buy.price = this.price;
				this.buy.intant = this.$route.query.id;
				this.buy.storeNo = hcb.user().storeNo;
				this.buy.address = this.addressId;
				// console.log(me.address._id)
				console.log(this.buy)
				// return;
				console.log(_config.server+"/intant/merchant/order")
					if(this.address_show){
						this.$http.post(_config.server+"/intant/merchant/order",this.buy).then(function(res){
							console.log(res)
							if(res.status==200&&res.data.status==10000){
								console.log(res)
								// me.show = true;
								// setTimeout(function(){
									me.$router.push({path:"/success"})
								// }, 1000)
							}else{
								me.fail = true;
								me.zhuan = false;
							}
						})
					}
				}
			},
			hide(){
				this.fail = false;
				this.$router.push({path:"/jkc?index=2"})
			},
			query(){
				this.zhuan = true;
				var me = this;
				console.log(this.$route.query.addressid)
				console.log(this.$route.query)
				// 获取地址
				this.$http.get(_config.server+"/address/list?userId="+hcb.user().uid).then(function(res){
					console.log(res)
					setTimeout(function(){
						me.zhuan = false;
					}, 300)
					if(res.status==200&&res.data.status==10000){
						me.haveAddress = res.data.data;
						if(me.$route.query.consignee){
							console.log(1111111111,me.address)
							me.address = me.$route.query
							me.addressIdA = me.address.addressid;
							console.log(me.addressId)
						}else{

							for(var i=0;i<me.haveAddress.length;i++){
								if(me.haveAddress[i].defaultAddress){

									me.address = me.haveAddress[i];
									console.log(2222222222,me.address)
								}
									me.addressIdB = me.address._id;
									console.log(me.addressId)
								
							}	
						}
						me.addressId = me.addressIdA || me.addressIdB;
						
						if(res.data.data.length==0){
							me.address_show = false;
						}else{
							me.address_show = true;
						}
					}
					// this._id = me.addressId;
				})
				this.$http.get(_config.server+"/intant/merchant/inquire?id="+this.$route.query.id).then(function(res){
					console.log(res)
					if(res.status==200&&res.data.status==10000){
						me.name = res.data.data.name;
						me.price = res.data.data.price;
						me.thumb = res.data.data.thumb;
						me.eachNum = res.data.data.num;
					}
				})
			},
			toBuy(){
				if (this.num) {
					this.mt_show = true;
				};
			},
			off(){
				this.mt_show = false;
			},
			sure(){
				this.mt_show = false;
				this.goBuy();
			}
		},
		mounted(){
			this.query();
			// console.log(this.address._id||this.$route.query.address)
			// console.log(this.address._id)
			// console.log(this.addressId);
			// console.log(this.addressId)
			// this.idW = this.$route.query._id==undefined?this.address._id:this.$route.query._id;
			// console.log(this.idW)
			// console.log(this.address._id)
			// console.log(this.$route.query._id)
			// console.log(this.haveAddress[0]._id)
			// console.log(this._id)

		},
		updated(){
			if(this.num=='0'){
				this.num =1;
			}else if(+this.num<0){
				this.num =1;
			}else if(this.num==''){
				// this.num = 1;
				return;
			}
			else{
				this.num = Math.ceil(this.num)
			}
		}
	}
</script>
<style scoped>
	.address{
		position: relative;
		color:#333;
		/*padding-left:22px;*/
		font-size: 14px;
		overflow: hidden;
		background: #fff;

	}

	input::placeholder{
		color:#999;
	}
	.address .add_left{
		float: left;
		padding:15px;
		color:#333;
		width:90%;


	}
	.address .add_right{
		/*float: right;*/
		position: absolute;

		/*width:10%;*/
		width:10px;
		height:19px;
		/*padding-top:30px;*/
		right:15px;
		top:50%;
		transform:translateY(-50%);
	}
	.address .add_left .p_msg{
		overflow: hidden;
		/*height:30px;*/
		/*line-height: 30px;*/
		margin-bottom:5px;
		color:#333;
		font-size: 16px;


	}
	.address .add_left .p_msg .name{
		float: left;
		margin-right:10px;
	}
	.address .add_left .p_msg .phone{
		float: left;
		/*padding-right:22px;*/
		width:90px;
	}
	.address .add_left p.where{
		width:100%;
		color:#666;
		font-size: 14px;
		/*text-align: justify;*/

	}
	.form{
		/*height:100vh;*/
		/*background: #fff;*/
		padding-top:10px;
	}
	.order{
		overflow: hidden;
		height:120px;
		background: #fff;
		padding: 15px 15px;
	}
	.left{
		overflow: hidden;
		float: left;
		width:21%;
		margin-top:15px;
		padding-bottom: 15px;
	}
	.left .thumb{
		border-radius: 50%;
		width:60px;
		height:60px;

	}
	.right{
		float: left;
		width:79%;
		height:90px;
	}
	.title{
		height:45px;
		line-height: 45px;
		color:#333;
		font-size: 14px;
		padding-left:15px;
	}
	.bottom{
		overflow: hidden;
		padding-left:15px;
		height:45px;

	}
	.price{
		color:#333;
		float: left;
		width:68px;
		height:32px;
		line-height: 32px;
		font-size: 14px;
		/*margin-right:20px;*/
	}
	.num{
		width:65%;
		height:32px;
		
		/*margin:10px 22px;*/
		/*text-align: left;*/
		/*float: right;*/
		/*text-align: right;*/
		font-size: 14px;
		float: right;
		color:#777;

		/*margin-bottom:10px;*/
	}
	.num span{
			float: right;
	}
	.reduce{
		display: inline-block;
		width:30px;
		height:30px;
		border: 1px solid #dcdcdc;
		border-radius: 5px 0 0 5px;
		float: left;

	}

	.add_img{
		display: inline-block;
		width:30px;
		height:30px;
		border: 1px solid #dcdcdc;
		border-radius: 0px 5px 5px 0px;
		float: left;
	}
	.changeNum{
		width:60px;
		display: inline-block;
		border-top: 1px solid #dcdcdc;
		border-bottom: 1px solid #dcdcdc;
		float: left;
	}
	.inNum{
		width:60px;
		height:28px;
		display: inline-block;
		/*margin:0 auto;*/
		border:none;
		outline: none;
		/*border-bottom:1px solid #666;*/
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance:none;
		text-align: center;
		/*padding-left:5px;*/
		font-size:16px;
		/*height:20px;*/

	}
	.bao{
		display: inline-block;
		height:32px;
		line-height: 32px;
		padding-left:3px;
		font-size: 14px;
		color:#333;
	}
	.re_add{
		display: inline-block;
		width:14px;
		/*height:20px;*/
		font-size: 15px;
		/*line-height: 30px;*/
		margin-left:8px;
		margin-top:3px;
		text-align: center;
		/*border:1px solid #777;*/
		/*border-radius: 50%;*/
		/*background: #ffe400;*/
		color:#fff;
		/*display: table-cell;*/
		vertical-align:middle;
	}
	.form .add{
		padding:30px 15px 0px;
		text-align: center; 
	}
	.form .add .add_msg{
		padding-top:15px;
		/*height:25px;*/
		/*line-height: 25px;*/
		font-size: 14px;
		color:#999;
	}
	.form .add .add_btn{
		/*margin:20px auto;*/
		width:100%;
		height:45px;
		border-radius: 5px;
		/*border:1px solid #777;*/
		line-height: 44px;
		background-image:-webkit-linear-gradient(left,#FFEC1C ,#FFD40C);
		color:#333;
	}
	.form .sub{
		overflow: hidden;
		position: absolute;

		bottom:0px;
		right:0px;
		width: 100%;
	}
	.form .sub .money{
		float: right;
		/*padding-right:10%;*/
		width:66.66666666%;
		height: 60px;
		line-height: 60px;
		text-align: center;
		background: #fff;
		color:#FF565C;
		font-weight: bold;
		/*border-top:1px solid #eee;*/
	}
	.form .sub .btn1{
		/*margin-top:30px;*/
		float: right;
		width:33.33333333%;
		height:60px;
		margin:0 auto;
		line-height: 60px;
		text-align: center;
		background-image:-webkit-linear-gradient(left,#FFEC1C ,#FFD40C);
		/*border-radius: 3px;*/
		color:#333;
		font-weight: bold;

	}
.bg{
  /*  position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: rgba(0,0,0,0.6);*/
  }
  .recharge_no{
  /*	text-align: center;
  	color:red;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 60%;
    height: 20%;
    background: white;
    border-radius: 5px;
    /*color: #777777;*/
    /*padding: 16px 0;*/
  }
	.bg_content{
   /* margin-top: 2%;*/
  }
  button{
    /*position: absolute;
    left: 0;
    right: 0;
    bottom: 16px;
    width: 30%;
    height: 28px;
    line-height: 30px;
    margin: auto;
    border-radius: 5px;
    background: #199ed8;
    outline: none;
    border: none;
    color: #fff;
    font-size: 16px;*/
  }
  .allNum{
  	padding-left:10px;
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
  .bg_tips{
    padding-top:60px;
    color:#333;
    font-size: 18px;
  }
  .recharge_ok,.recharge_no{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width:300px;
    height:200px;
    /*height: 25%;*/
    background: white;
    border-radius: 5px;
    color: #777777;
    box-sizing:border-box;
    padding:0 15px;
    text-align: center;

  }
  .icon{
    position: absolute;
    height:90px;
    left:50%;
    top:-45px;
    transform:translatex(-50%);
  }
  .bg_content{
     margin-top: 8px;
    font-size: 14px;
    color:#999;
    padding-bottom:20px;
  }
  button{
     width: 100%;
    height: 44px;
    line-height: 44px;
    margin: auto;
    border-radius: 5px;
    background-image:-webkit-linear-gradient(left,#FFEC1C ,#FFD40C);
    outline: none;
    border: none;
    color: #333;
    font-size: 16px;
  }
  .mb{
  	margin-bottom: 9px;
  }

  .bg1{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: rgba(0,0,0,0.6);
  }
  .recharge_ok1{
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
  .recharge_ok1 .msg1{
    height:140px;
    line-height: 140px;
  }
  .recharge_ok1 .btn_M1{
    height:45px;
    overflow: hidden;
    padding:0 15px;
    position: absolute;
    bottom: 15px;
  }
  .recharge_ok1 .btn_M1 p{
    width:130px;
    float: left;
  	border-radius: 5px;
    line-height: 44px;
    height: 44px;
    font-size: 16px;
    color:#333;
  }
  .recharge_ok1 .btn_M1 p.off1{
    border:2px solid #d0d0d0;
  }
  .recharge_ok1 .btn_M1 p.sure1{
    background-image:-webkit-linear-gradient(left,#FFEC1C ,#FFD40C);
  	border:none;
  	margin-right:10px;
  }
</style>


<template>
	<section class="jkc">
		<div v-title>用户订单</div>
		<loading v-if="zhuan"></loading>
		<div class="header">
			<p class="title" v-for="(item,index) in header" @click="choose(index)" :style="{borderBottomColor:index===idx? '#FFD40C':'#fff',color:index===idx? '#333':'#999'}" >{{item}}</p>
			<div class="line fd"></div>
		</div>
		<div class="content">
			<!-- 用户新订单列表 -->
			<div v-if="new_o" class="orders">
				<err v-if="new_err"></err>
				<div v-else>	
					<space v-if="new_show"></space>
					<ul v-else>
						<li v-for="item in new_orders">
							<router-link :to="'/orderDetail?fin=0&id='+item._id">
								<div class="left">
									<img :src="item.intant.thumb" alt="">
									<!-- <p>顶呱刮</p> -->
								</div>
								<div class="center">
									<p class="name">名称：{{item.intant.name}}</p>
									<p class = "time">{{item.createdAt | formDate}}</p>
								</div>
								<div class="right">
									<img src="./right.png" alt="">
									<span class="price">已付{{item.intant.price*item.num | currency('',2)}}元</span>
								</div>
							</router-link>
						</li>
					</ul>
				</div>
			</div>
			<!-- 已完成订单列表 -->
			<div v-if="fin_o" class="orders">
				<err v-if="fin_err"></err>
				<div v-else>
					<space v-if="fin_show"></space>
					<div v-else>
						<ul>
							<li v-for="item in fin_orders">
								<router-link :to="'/orderDetail?fin=1&id='+item._id">
									<div class="left">
										<img :src="item.intant.thumb" alt="">
										<!-- <p>顶呱刮</p> -->
									</div>
									<div class="center">
										<p class="name">名称：{{item.intant.name}}</p>
										<p class = "time">{{item.createdAt | formDate}}</p>
									</div>
									<div class="right">
										<img src="./right.png" alt="">
										<span class="price">已付{{item.intant.price*item.num | currency('',2)}}元</span>
									</div>
								</router-link>
							</li>
						</ul>
						<Infinite v-if="!fin_show" v-on:infinite="infiniteMore" ></Infinite>
						<div>
							
							<!-- <p class="more" @click="fin_record()" v-if="fin_more" >加载更多</p>
							<p class="more" v-else >{{f_m}}</p>	 -->
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- <div class="bg" v-if="haveSend">
	      	<div class="recharge_ok">
		        <p class="bg_content">您已有补货中订单</p>
		        <p class="bg_con">请收货后再补货~</p>
		        <button @click="closeMsg()" >确定</button>	        
	      	</div>
    	</div> -->
	</section>
</template>
<script>
	import Loading from '../../../../components/loading'
	import Space from '../../../../components/space/space'
	import Err from '../../../../components/err/err'
	import Infinite from "vue2-infinite-scroll";
	export default{
		components:{Loading,Space,Err,Infinite},
		data(){
			return{
				haveSend:false,
				deviceNo:hcb.user().deviceNo,
				new_err:false,
				fin_err:false,
				rep_err:false,
				rec_err:false,
				zhuan:false,
				new_show:false,
				fin_show:false,
				rep_show:false,
				rec_show:false,
				f_m:"没有更多订单了~~",
				// header:["新订单","已完成订单","库存","补货记录",],
				header:["新订单","已完成订单"],
				idx:0,
				new_o:true,
				fin_o:false,
				rep:false,
				rec:false,
				record_more:true,
				fin_more:true,
				new_orders:[],
				fin_orders:[],
				repertory:[],
				thumb:"",
				records:[
					{
						createdAt:"",
						intant:"",
						intantObj:{
							count:0,
							createdAt:"",
							detail:"",
							name:"",
							num:"",
							price:"",
							region:"",
							status:"",
							summary:"",
							thumb:""
						},	
						num:0,
						step:1000,
						storeNo:"",
						updatedAt:"",
						_id:""
					},
				],
				r_limit:20,
				r_skip:0,
				f_limit:20,
				f_skip:0,
				id:"",
				storeNo:hcb.user().storeNo,
				msg:{
					name:"",
					price:"",
					intant:"",
					storeNo:""
				},
				server:'http://api.hecaibao88.com'
				// server:'http://192.168.1.101:3000'
			}
		},
		watch:{
			$route(){
			if(this.$route.params.pages==0){
					this.idx = 0;
					this.newOrderShow();

					// this.$router.push({path:"/jkc/0"})
				}else if(this.$route.params.pages==1){
					this.idx = 1;
					this.finOrderShow()
					// this.$router.push({path:"/jkc/1"})
				}
			}
		},
		methods:{
			// 选择模块
			choose(index){
				var me = this;
				this.idx =index;
				this.zhuan = true;
				if(index==0){
					this.idx = 0;
					this.$route.params.pages=0;
					this.newOrderShow();
					this.$router.push({path:'/jkc/0'})
					// this.newOrderShow();
				}else if(index==1){
					// console.log("http://api.hecaibao88.com/intant/merchant/trace/list?limit=20&storeNo="+this.storeNo)
					this.$route.params.pages=1;
					console.log(this.$route.params.pages)
					this.idx = 1;
					this.finOrderShow()
					this.$router.push({path:'/jkc/1'})
				}
				// else if(index==2){
				// 	this.$router.push({path:'/jkc/2'})
				// 	console.log(index)
				// 	this.repOrderShow();
					
				// }else if(index==3){
				// 	this.$router.push({path:'/jkc/3'})
				// 	this.recOrderShow();
				// }
			},
			// 已完成加载更多
			// fin_record(){
			// 	var me = this;
			// 	this.fin_more=false;
			// 	this.f_m = "加载中..."
			// 	this.f_limit = this.f_limit+20;
			// 	this.f_skip = this.f_skip+20;
			// 	console.log(this.f_skip,this.f_limit)
			// 	this.$http.get(_config.server+"/intant/merchant/trace/list?limit="+this.f_limit+"&skip="+this.f_skip+"&storeNo="+this.storeNo).then(function(res){
			// 			console.log(res)
			// 			me.f_m = "没有更多订单了~~";
			// 			if(res.status==200&&res.data.status==10000){
			// 				console.log(me.fin_orders)
			// 				me.fin_orders = me.fin_orders.concat(res.data.data) 
			// 				console.log(res.data.data)
			// 				if(res.data.data.length>0){
			// 					if (res.data.data.length<20) {
			// 						me.fin_more=false;
			// 					}else{
			// 						me.fin_more=true;
			// 					}
			// 				}
			// 			}
			// 		})
			// },
			infiniteMore($state) {
				var me = this;
				// this.f_limit = this.f_limit+20;
				this.f_skip = this.f_skip+20;
				console.log(this.f_limit,this.f_skip)
			    this.$http.get(_config.server+"/intant/merchant/trace/list?limit="+this.f_limit+"&skip="+this.f_skip+"&storeNo="+this.storeNo).then(res => {
			          // this.aaa = this.aaa.concat(data.data.b.data);
			          console.log(res)
			          if(res.status==200&&res.data.status==10000){
			          	me.fin_orders = me.fin_orders.concat(res.data.data)
			          	$state.loaded();   //这次加载完毕
				        if (res.data.data.length<20) {
				        	$state.completed("全部加载完了");
				        }
			          }
       			})
   			},
			// 补货记录加载更多
			// M_record(){
			// 	var me = this;
			// 	this.fin_more=false;
			// 	this.f_m = "加载中..."
			// 	this.r_limit = this.r_limit+20;
			// 	this.r_skip = this.r_limit+20;
			// 	this.$http.get(_config.server+"/intant/merchant/order/list?limit="+this.r_limit+"skip="+this.r_skip+"&storeNo="+this.storeNo).then(function(res){
			// 			if(res.status==200&&res.data.status==10000){
			// 				console.log(res)
			// 				me.records = me.records.concat(res.data.data) 

			// 				if(res.data.data.length>0){
			// 					if (res.data.data.length<20) {
			// 						me.record_more=false;
			// 					}else{
			// 						me.record_more=true;
			// 					}
			// 				}
			// 			}
			// 		})
			// },
			// 新订单显示
			newOrderShow(){
				var me =this;
				this.new_o=true;
				this.fin_o=false;
				this.rep=false;
				this.rec=false;
				// this.zhuan = true;
				this.$http.get(_config.server+"/intant/merchant/trace/list?check=deal&storeNo="+this.storeNo
				).then(function(res){
					setTimeout(function(){
						me.zhuan = false;
					},300)
					if(res.status==200&&res.data.status==10000){
						me.new_orders = res.data.data;
						if(res.data.data==0){
							me.new_show = true;
							// me.zhuan = false;
						}
						console.log(res.data.data);
					}
				},function(err){
					me.new_err = true;
					// setTimeout(function(){
						me.zhuan = false;
					// },300)
				})
			},
			// 已完成订单展示
			finOrderShow(){
				var me =this;
				// me.zhuan = true;
				this.$http.get(_config.server+"/intant/merchant/trace/list?limit=20&skip=0&storeNo="+this.storeNo).then(function(res){
						console.log(res.data.data.length)
						setTimeout(function(){
							me.zhuan = false;
						},300)
						if(res.status==200&&res.data.status==10000){
							me.fin_orders = res.data.data;
							if(res.data.data==0){
								me.fin_show = true;
							}
							if(res.data.data.length<20){
								me.f_m = "没有更多订单了~~";
								me.fin_more=false;
							}
							console.log(me.fin_more)
							console.log(res.data.data)
						}
					},function(err){
						// setTimeout(function(){
							me.zhuan = false;
						// },300)
						me.fin_err = true;
					})
					this.new_o=false;
					this.fin_o=true;
					this.rep=false;
					this.rec=false;
			},
			// 去补货显示
			// repOrderShow(){
			// 	var me =this;
			// 	console.log(_config.server+"/intant/merchant/goods/list?storeNo="+this.storeNo)
			// 	// setTimeout(function(){
			// 	// 	me.zhuan = false;	
			// 	// },300)
			// 	this.$http.get(_config.server+"/intant/merchant/goods/list?storeNo="+this.storeNo).then(function(res){
			// 	// this.$http.get("http://192.168.1.144:3000/intant/merchant/goods/list?storeNo="+this.storeNo).then(function(res){
			// 			console.log(res)
			// 			setTimeout(function(){
			// 				me.zhuan = false;

			// 			},300)
			// 			if(res.status==200&&res.data.status==10000){
			// 				me.repertory = res.data.data;
			// 				console.log(res.data.data)
			// 				me.id = res.data.data._id;
			// 			}
			// 		},function(err){
			// 			console.log(res)
			// 			me.rep_err = true;
			// 			// setTimeout(function(){
			// 				me.zhuan = false;
			// 			// },300)

			// 		})
			// 		this.new_o=false;
			// 		this.fin_o=false;
			// 		this.rep=true;
			// 		this.rec=false;
			// },
			// 补货记录显示
			// recOrderShow(){
			// 	var me =this;
			// 	console.log(_config.server+"/intant/merchant/order/list?limit=20&storeNo="+this.storeNo)
			// 	this.$http.get(_config.server+"/intant/merchant/order/list?limit=20&storeNo="+this.storeNo).then(function(res){
			// 			setTimeout(function(){
			// 				me.zhuan = false;
			// 			// 	console.log(11111111111)
			// 			},300)
			// 			if(res.status==200&&res.data.status==10000){
			// 				me.records = res.data.data;
			// 				// me.thumb = res.data.data[0].intantObj.thumb;
			// 				console.log(me.records);
							
			// 				if(res.data.data.length==0){
			// 					me.rec_show=true;
			// 				}
			// 				if(res.data.data.length>0){
			// 					if (res.data.data.length<20) {
			// 						me.record_more=false;
			// 					}else{
			// 						me.record_more=true;
			// 					}
			// 				}
			// 			}
			// 	},function(err){
			// 			me.rec_err = true;
			// 			// setTimeout(function(){
			// 				me.zhuan = false;
			// 			// },300)
			// 	})
			// 	this.new_o=false;
			// 	this.fin_o=false;
			// 	this.rep=false;
			// 	this.rec=true;
			// },
			// 去补货方法
			// goRep(id,num,send){
			// 	if(send){
			// 		this.haveSend = true;
			// 	}else{
			// 		this.$router.push({path:"/form?id="+id+"&num="+num})
			// 	}
			// },
			// 关闭弹窗
			closeMsg(){
				this.haveSend = false;
			},
			query(){
				var me = this;
				this.storeNo =  hcb.user().storeNo;
				console.log(this.storeNo)
				console.log(hcb.user().roleNo)
				// this.storeNo = hcb.user().storeNo || this.storeNo;
				this.zhuan = true;
				console.log(1111111111111111)
				console.log(_config.server+"/intant/merchant/trace/list?storeNo="+this.storeNo+"&check=deal")
				if(this.$route.params.pages==0){
					this.idx = 0;
					this.newOrderShow();
					// this.$router.push({path:"/jkc/0"})
				}else if(this.$route.params.pages==1){
					this.idx = 1;
					this.finOrderShow()
					// this.$router.push({path:"/jkc/1"})
				}
				// else if(this.$route.params.pages==2){
				// 	this.idx = 2;
				// 	this.repOrderShow();
				// 	this.$router.push({path:"/jkc/2"})
				// }else if(this.$route.params.pages==3){
				// 	this.idx = 3;
				// 	this.recOrderShow();
				// 	this.$router.push({path:"/jkc/3"})
				// }
			}
		},
		mounted(){
			this.query();
			// this.choose(this.$route.params.pages);
		}
	}
</script>

<style scoped lang="less">
	@import '../../../../../static/css/color.import.less';
	.jkc{
		color:#777;
		background: #fff;
		height:100vh;
		padding-top:60px;
		.header{
			position: fixed;
			top:0;
			left: 0;
			width:100%;
			background: #fff;
			z-index:9999999;

			height:56px;
			overflow: hidden;
			.title{
				font-size: 14px;
				width:50%;
				text-align: center;
				height:55px;
				float: left;
				line-height:55px;
				border-bottom:2px solid #fff;
			}
		}
		.content{
			.orders{
				background: #fff;
				ul{

					li{	
						padding:15px 12px;
						overflow: hidden;
						width:100%;
						height:80px;
						color:#333;
						border-bottom: 1px solid #eee;
						div{
							
						}
						.left{
							width:15%;
							float: left;
							img{
								margin:0 auto;
								margin-top:5px;
								display: block;
								width:40px;
								height: 40px;
								border-radius:50%;
							}
							p{
								line-height: 40px;
								font-size: 14px;
								text-align: center;
							}
						}
						.center{
							width:35%;
							float: left;
							padding-left:5px;
							.name{
								font-size: 14px;
								height:25px;
								line-height: 25px;
								color:#333;
								
							}
							.time{
								font-size: 12px;
								height:25px;
								line-height: 25px;
								color:#999;
							}
						}
						.right{
							width:50%;
							float: right;
							overflow: hidden;
							img{
								float: right;
								width:8px;
								margin-top:17.5px;
								margin-left:10px;
							}
							span{
								font-size:14px;
								float: right;
								height:50px;
								line-height:50px;
							}
						}
					}
				}
			}
			.repertory{
				background: #fff;
				ul{

					li{	
						padding:12px 15px;
						overflow: hidden;
						width:100%;
						height:90px;
						color:#777;
						border-bottom: 1px solid #eee;
						div{
							
						}
						.left{
							width:15%;
							float: left;
							img{
								margin:0 auto;
								margin-top:5px;
								display: block;
								width:40px;
								height: 40px;
								border-radius:50%;
							}
							p{
								line-height: 40px;
								font-size: 14px;
								text-align: center;
							}
						}
						.center{
							width:40%;
							float: left;
							padding-left:5px;
							.name{

								font-size: 14px;
								height:25px;
								line-height: 25px;
								text-indent: 10px;
								text-overflow:ellipsis;
    							white-space: nowrap;
    							overflow: hidden;
    							color:#333;
							}
							.price{
								text-indent: 10px;
								font-size: 14px;
								height:25px;
								line-height: 25px;
								color:#999;
							}
						}
						.right{
							width:40%;
							float: right;
							overflow: hidden;
							height:66px;
							.name{
								width:100%;
								text-align: right;
								height:25px;
								line-height: 35px;
								font-size: 12px;
								color:#333;
								float:right;
							}
							.btn{
								width:50%;
								margin:0 auto;
								float:right;
								text-align: center;
								height:30px;
								background-image:-webkit-linear-gradient(left,#FFEC1C ,#FFD40C);
								border-radius: 2.5px;
								color:#333;
								font-size: 12px;
								line-height: 30px;
							}
							
						}
					}
				}
			}
			.records{
				background: #fff;
				ul{

					li{	
						padding:0px 15px;
						overflow: hidden;
						width:100%;
						height:90px;
						border-bottom: 1px solid #eee;
						color:#333;
						div{
							
						}
						.left{
							width:15%;
							float: left;
							padding-top:20px;
							// padding-left:5px;


							img{
								margin:0 auto;
								border-radius:50%;
								margin-top:5px;
								display: block;
								width:40px;
								height: 40px;
							}
							p{
								line-height: 40px;
								font-size: 14px;
								text-align: center;
							}
						}
						.center{
							width:50%;
							float: left;
							padding-left:15px;
							padding-top:7.5px;
							.name{
								font-size: 14px;
								height:25px;
								line-height: 25px;
								color:#333;
							}
							.price{
								color:#FF565C;
							}
							.time{
								font-size: 12px;
								height:25px;
								line-height: 25px;
								color:#999;
							}
						}
						.right{
							width:30%;
							float: right;
							overflow: hidden;
							text-align:center;
							color:#999;
							padding-top:20px;
							img{
								float: right;
								width:8px;
								margin-top:17.5px;
								// margin-left:5px;
							}
							span{
								float: right;
								height:50px;
								width:60px;
								line-height:50px;
								font-size:14px;
							}
						}
					}
				}
			}
		}	
	}
	.more{
		height:40px;
		line-height: 40px;
		text-align: center;
		font-size: 14px;
		color:#777;
	}
	.bg{
	    position: fixed;
	    top: 0;
	    left: 0;
	    right: 0;
	    bottom: 0;
	    margin: auto;
	    z-index:9999999999;
	    background: rgba(0,0,0,0.6);
  	}
 	.recharge_ok{
	    position: fixed;
	    top: 0;
	    left: 0;
	    right: 0;
	    bottom: 0;
	    margin: auto;
	    width: 300px;
	    height:200px;
	    background: white;
	    border-radius: 5px;
	    color: #777777;
	    padding: 15px;
	    text-align: center;
 	}
 	.bg_content{
 		color:#333;
		height:30px;
		line-height: 30px;
		margin-top:30px;
	}
	button{
	    position: absolute;
	    left: 0;
	    right: 0;
	    bottom: 16px;
	    width: 87%;
	    height: 45px;
	    line-height: 30px;
	    margin: auto;
	    border-radius: 5px;
	    background: #ffe400;
	    outline: none;
	    border: none;
	    color: #666666;
	    font-size: 16px;
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
.fd{
	float: left;	
}
</style>
<style>
	div.wh_completed{
		height:50px;
		line-height: 50px;
	}
	div.ring-2{
		border:3px solid #666;
	}
	.ball-holder .ball{
		background: #f6f6f6;
	}
</style>
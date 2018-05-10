<template name="orders">
	<section class="orders"  >
		<div v-if="this.$route.query.order_status==''" v-title>全部订单</div>
		<div v-if="this.$route.query.order_status=='3'" v-title>中奖订单</div>
		<div v-if="this.$route.query.order_status=='2'" v-title>待开奖订单</div>
		<div v-if="this.$route.query.order_status=='4'" v-title>未中奖订单</div>

		<div class="err" v-if="err">
            <img src="./img/err.png" alt="">
            <p class="errM">服务器网络错误!</p>
            <p>请检查网络连接或刷新重试</p>
        </div>
		<div v-else :style="{display:display}">			
			<div v-if="have" class="have">
				<ul>
					<li v-for="item in orders">
						<router-link  :to="'/order?orderNumber='+item.orderNumber">					
							<div class="record">
								<div class="left">
									<img v-if="item.lotteryName=='11选5'" src="./img/11xuan5.png" alt="">
									<img v-if="item.lotteryName=='大乐透'" src="./img/daletou.png" alt="">
									<img v-if="item.lotteryName=='竞足'" src="./img/zucai.png" alt="">
								</div>
								<div class="center">
									<p class="title" v-if="item.type=='TD'||item.type=='REMOTE'">
										<span>{{item.lotteryName}}</span>
									</p>
									<p class="title"  v-if="item.type=='GAME'">
										<span>金豆{{item.lotteryName}}</span>
									</p>
									
									<p class = "timer">{{item.creat_time}}</p>
								</div>
								<div class="right">
									<div >	
										<img class="detail" src="./img/arow_h.png" alt="">
										<span class="sta" v-if="item.order_status==0" >未支付</span>
										<span class="sta" v-if="item.order_status==1" >待出票</span>
										<span class="sta" v-if="item.order_status==2" >待开奖</span>
										<span class="sta" v-if="item.order_status==3" style="color:#00BF73">已中奖</span>
										<span class="sta" v-if="item.order_status==4" >未中奖</span>
										<span class="sta" v-if="item.order_status==6" >已退款</span>
									</div>
								</div>
							</div>
						</router-link>
						<div class="line"></div>
					</li>
				</ul>
			</div>
			<div v-else class="hidden">
				<img src="./img/err.png" alt="">
				<p>暂无订单记录哦!</p>
			</div>
		</div>
		<loading v-if="zhuan"></loading>
		<Infinite v-on:infinite="infiniteMore" ></Infinite>
	</section>	
</template>
<script>
	import Loading from '../../../components/loading'
	import Infinite from "vue2-infinite-scroll";
	export default{
		 components:{Loading,Infinite},
		mounted:function(){
			this.user = hcb.user();
		   	var me = this;
		   	this.zhuan = true;
		   	this.request(); 
		   	this.status = this.$route.params.status;

		},
		activated:function(){
			console.log(this.status == this.$route.params.status)

			if(this.status != this.$route.params.status){
            	this.sendrouter();
			}
         },
		data:function(){
			return {
				have:true,
				status:"",
				all:false,
				zhuan:false,
				err:false,
				title:false,
				more:"加载更多",
				orders:[
				{createTime:"2017-12-13",tag:""}
				],
				user:{},
				btn_show:false,
				msg_show:false,
				display:"none",
				parmas:{}
			}
		},
		methods:{
			request:function(){
				var me = this;
				if (this.$route.query.order_status=="") {
					console.log(11111111111)	
					this.parmas = {
						user_id:hcb.user().uid,
						page:1
					}
				}else {
					this.parmas = {
						user_id:hcb.user().uid,
						order_status:this.$route.query.order_status,
						page:1
					}
				}
				console.log(this.parmas)
				this.$http.post(_config.server +"/user/order/list",this.parmas).then(res=>{
					console.log(res)
					this.zhuan = false;
					this.display = 'block';
					setTimeout(function(){
						me.zhuan = false;
					}, 300)
					if (res.status==200&&res.data.status==10000) {
						if(res.data.data.code==0){
							this.orders =res.data.data.data;
						}else if(res.data.data.code==4){
							this.have = false;
						}

					}else{
						this.err = true;
					};

				},function(err){
                this.err = true;
                console.log(err)
           	 })
			},
			infiniteMore($state) {
				this.parmas.page++;
				console.log(this.parmas)
			    this.$http.post(_config.server +"/user/order/list",this.parmas).then(res => {
			          console.log(res)
			          if(res.data.data.code==4) {
			          	$state.completed("全部加载完了");
			          	return
			          }
			          if(res.status==200&&res.data.status ==10000){
			          	this.orders = this.orders.concat(res.data.data.data);
			          }
			          $state.loaded();   //这次加载完毕	          
       			})
   			},


		}
	}
</script>
<style>
	div.wh_completed{
		height:50px;
		line-height: 50px;
		color:#666;
		background: #f6f6f6;
	}
	div.ring-2{
		border:3px solid #666;
	}
	.ball-holder .ball{
		background: #f6f6f6;
	}
</style>
<style scoped>
	.err img{
        padding-top:100px;
        padding-bottom:15px;
        width:50%;
    }
    .err p{
        font-size: 16px;
        color:#777;
     }
	.orders{

		overflow: hidden;
		height:100%;
	}
	.orders .record{
		box-sizing:border-box;
		padding:0 15px;
		overflow: hidden;
		height:74px;
		background: #fff;
		/*border-bottom: 1px solid #eee;*/

	}
	.orders div.left{
		width:50px;
		text-align: center;
		float: left;
		height:90px;
	}
	.orders div.right{
		width:20%;
		text-align: center;
		float: right;
		height:90px;
	}
	.orders div.left{
		overflow: hidden;
	}
	.orders div.left img{
		width:30px;
		float: left;
		margin-top:22px;
		
	}
	.orders div.center{
		width:50%;
		text-align: center;
		float: left;
		height:74px;
		padding:15px 0;
		box-sizing:border-box;
	}
	.orders div.center p{
		height:20px;
		line-height: 20px;
		text-align: left;
	}
	.orders div.center p.title{
		height:24px;
		line-height: 24px;
		font-size: 14px;
		color:#333;
		display: block;
   		text-overflow:ellipsis;
   		white-space: nowrap;
   		overflow: hidden;
	}
	.orders div.center p.jifen{
		height:18px;
		line-height: 18px;
		height:20px;
		line-height: 20px;
		font-size: 12px;
		color:#777;
		text-align: left;
	}
	.orders div.center p.timer{
		height:20px;
		line-height: 20px;
		color:#999;
		font-size: 12px;
		color:#999;
	}
	.orders div.right {	
		font-size: 14px;
		width:30%;
		color:#777;
		height:74px;
		box-sizing:border-box;
	} 
	.orders .btn{
		width:100%;
		height:50px;
		line-height: 50px;
		text-align: center;
		background: #f6f6f6;
		color:#999;
		font-size: 14px;

	}
	.orders .sta{
		float: right;
		width:60px;
		line-height: 74px;
		font-size: 14px;

	}
	.orders .detail{
		float: right;
		/*height:16px;*/
		width:8px;
		/*height:14px;*/
		/*padding-top:27px;*/
		margin-top:28px;
	}
	.orders div.hidden{
		background: #f6f6f6;
		height:100vh;
	}
	.orders div.hidden img{
		width: 200px;
		padding-top:40px;
		padding-bottom: 15px;
	}
	.orders div.hidden p{
		font-size: 18px;
		color:#333;
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
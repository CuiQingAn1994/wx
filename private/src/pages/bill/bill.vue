<!-- 流水明细 -->
<template name = "bill">
	<div>
		<section class = "bill">
			<div v-title>流水明细</div>
			<div class="err" v-if="err">
	            <img src="./err.png" alt="">
	            <p >服务器网络错误...</p>
	            <p class="way">请检查网络连接或刷新重试!</p>
	        </div>
			<div v-else :style="{display:display}">
				<div  class="model" v-if="accountings.length>0">	
					<ul>
						<li class="billList" v-for="item in accountings">
							<div class="record">						
								<p class="type" >
									<span v-if="item.key=='CASH'" >消费</span>
									<span v-if="item.key=='CHANGE4GOLD'" >兑换金豆</span>
									<span v-if="item.key=='CHANGE4POINT'" >兑换积分</span>
									<span v-if="item.key=='CHANGE4BEAN'" >兑换菜豆</span>
									<span v-if="item.key=='CHARGE4GOLD'" >充值金豆</span>
									<span v-if="item.key=='CHARGE4POINT'" >兑换积分</span>
									<span v-if="item.key=='CHARGE4BEAN'" >充值菜豆</span>
									<span v-if="item.key=='WIN'">比赛奖金</span>
									<span v-if="item.key=='MISSPAY'">兑换失败充值到奖金</span>
									<span v-if="item.key=='POINTREFUND'">积分退款</span>
									<span v-if="item.key=='GOLDREFUND'">金豆退款</span>
									<span v-if="item.key=='LOTTERY'">中奖</span>
									<span v-if="item.key=='WITHDRAWALS'">提现</span>
									<!-- <span>{{item.actionTypeName}}-{{item.actionTypeDesc}}成功</span> -->
									<span class="cur">
										{{item.num<0?item.num:'+'+item.num}}
										<span v-if="item.type=='gold'">金豆</span>
										<span v-if="item.type=='bean'">菜豆</span>
										<span v-if="item.type=='point'">积分</span>
										<span v-if="item.type=='balance'">元</span>
										<span v-if="item.type=='coupon'">奖券</span>
										<span></span>
										<span></span>
									</span>
								</p>

								<p class="bottom">
									<span class="timer">{{item.createdAt | formDate}}</span>
									<!-- <span class="num" v-if="item.accountingTypename!='元'">( {{item.peaConsume /100 | currency("¥",2)}} )</span> -->
									<span class="num" v-if="item.type=='gold'">( {{item.num /100 | currency("¥",2)}} )</span>
									<span class="num" v-if="item.type=='bean'">( {{item.num /100 | currency("¥",2)}} )</span>
									<span class="num" v-if="item.type=='point'">( {{item.num /100 | currency("¥",2)}} )</span>
									<span class="num" v-if="item.type=='balance'">( {{item.num | currency("¥",2)}})</span>
								</p>
							</div>
							<div class="line"></div>
							
						</li>
					</ul>
					<Infinite v-on:infinite="infiniteMore" ></Infinite>
				</div>
			</div>
		</section>
		<div  v-if="accountings.length==0" class="empty">
			<img src="./err.png" alt="">
			<p>暂无流水明细哦!</p>
		</div>	
		<div class="line"></div>
		<loading v-if="zhuan"></loading>
	</div>
</template>
<script>
	import Loading from '../../components/loading'
	import Infinite from "vue2-infinite-scroll";
	export default{
		components:{Loading,Infinite},
		created(){
			this.user = hcb.user();
			this.recordWallet.userNo = this.user.uid;
			this.query();
		},
		data(){
			return {
				zhuan:false,
				err:false,
				more:"加载更多",
				user:{},
				recordWallet:{
			    	userNo:"",
			    	pageNo:"1",
			    	pageSize:"20",
					isSignKey:"49EAF85F41694CE5A4DEEB7AE49022B9"
				},
				params:{
					uid:hcb.user().uid,
					skip:0,
					limit:20,
					type:""
				},
				accountings:[{}],
				btn_show:true,
				msg_show:false,
				display:'none'
			}
		},
		methods:{
			query(){
				this.zhuan = true;
				this.$http.post(_config.server+"/user/trace",this.params).then(res=>{
					console.log(res)
					var that = this;
					setTimeout(function(){
						that.zhuan = false
					}, 300)
					if(res.status==200&&res.data.status==10000){
						console.log(res)
						this.display = 'block'
						this.accountings = res.data.data

					}
				},err=>{
                	this.err = true;
                	var that = this;
					setTimeout(function(){
						that.zhuan = false
					}, 300)
           		})
			},
			// 滚动加载更多
			infiniteMore($state) {
				this.params.skip+=20;
			    this.$http.post(_config.server +"/user/trace",this.params).then(res => {
			          // this.aaa = this.aaa.concat(data.data.b.data);
			          console.log(res)
			          this.accountings=this.accountings.concat(res.data.data)
			          $state.loaded();   //这次加载完毕
			          if (res.data.data.length<20) {
			          	$state.completed("全部加载完了");
			          }
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
	}
	div.ring-2{
		border:3px solid #999;
	}
	.ball-holder .ball{
		background: #f6f6f6;
	}
</style>
<style scoped>

	.bill{
		/*height:100vh;*/
		background: #fff;
		/*padding-left:15px;*/
	}
	.err{
		height:100vh;
	}
	.err img{
        padding-top:150px;
        padding-bottom:15px;
        width:50%;
    }
    .err p{
        font-size: 20px;
        color:#777;
     }
     .err p.way{
		font-size: 16px;
		color:#999;
		line-height: 30px;
     }
     .billList{
     	padding-left: 15px;
     }
	.bill .record{
		background: #fff;
		width:100%;
		height:72px;
		margin:0 auto;
		padding:15px 15px 15px 0 ;
		/*border-bottom: 1px solid #eee;*/
		box-sizing:border-box;
		/*margin-bottom: 10px;*/
		/*border-radius: 15px;*/
		color:#777;
		/*font-family:"Microsoft YaHei"; */
	}
	.bill .record p{
		font-size: 14px;
		height:21px;
		line-height: 21px
	}
	.bill .record .type{
		text-align: left;
		/*overflow: hidden;*/
		font-size: 14px;
		line-height: 21px;
		color:#333;
	}
	.bill .record .second{
		width: 100%;	
		overflow: hidden;
		padding:5px 0;
	}
	.bill .record .second .status{
		float: left;
		width:50%;
		text-align: left;
		font-size: 12px;
		line-height: 16px;
		color:#ccc;
	}
	.bill .record .type .cur{
		float: right;
		width:50%;
		text-align: right;
		line-height: 21px;
		color:#333;
		font-size: 14px;

	}
	.bill .record .bottom{
		overflow: hidden;
		color:#ccc;
	}
	.bill .record .bottom span{
		
		float: left;
	}
	.bill .record .bottom .timer{
		width:70%;
		text-align: left;
		font-size: 12px;
		color:#999;
	}
	.bill .record .bottom .num{
		width:30%;
		text-align: right;
		font-size: 12px;
		color:#999;
	}
	 .more{
		display: block;
		width: 100%;
		margin:0 auto;
		height:50px;
		font-size: 14px;
		line-height: 50px;
		color:#777;
		background: #f6f6f6;

	}
	.empty{
		height:100vh;
		background: #f6f6f6;
	}
	.empty img{
		width:200px;
		padding-top:40px;
		padding-bottom:15px;
	}
	.empty p{
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
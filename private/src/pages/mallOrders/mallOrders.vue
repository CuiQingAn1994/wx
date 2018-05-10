<template>
	<div class="have">
		<div v-title >我的奖品</div>
		<space v-if="list.length==0"></space>
		<ul v-else>
			<li v-for="item in list" >
				<router-link  :to="'/mallDetail?id='+item._id">
					<div class="record">
						<div class="left">
							<img  :src="item.good.thumb" alt=""></div>
						<div class="center">
							<p class="title">
								<span>{{item.good.name}}</span>

							</p>

							<p class = "timer">{{item.createdAt | formDateAll}}</p>
						</div>
						<div class="right">
							<div >
								<img class="detail" src="./img/arow_h.png" alt="">
								<span class="sta" v-if="item.step==1000" >未领取</span>
								<span class="sta" v-if="item.step==3000" >待收货</span>
								<span class="sta" v-if="item.step==5000" >已收货</span>
							</div>
						</div>
					</div>
				</router-link>
				<div class="line"></div>
			</li>
		</ul>

		<loading v-if="zhuan"></loading>
		<Infinite v-on:infinite="infiniteMore" ></Infinite>
	</div>
</template>
<script>
	import Loading from '../../components/loading'
	import Space from '../../components/space/space'
	import Err from '../../components/err/err'
	import Infinite from "vue2-infinite-scroll";
	export default{
		components:{Loading,Space,Err,Infinite},
		data(){
			return{
				zhuan:false,
				list:[],
				params:{
					uid:hcb.user().uid,
					skip:0,
					limit:20
				}
			}
		},
		methods:{
			query(){
				this.zhuan = true;
				console.log(this.params)
				this.$http.post(_config.server+'/shop/order/list',this.params).then(res=>{
					console.log(res)
					if(res.status==200&&res.data.status==10000){
						this.list = res.data.data;
						var that = this;
						setTimeout(function(){
							that.zhuan = false;
						}, 300)
					}
				})
			},
			infiniteMore($state) {
				// this.f_limit = this.f_limit+20;
				this.params.skip = this.params.skip+20;
				// console.log(this.f_limit,this.f_skip)
			    this.$http.post(_config.server+'/shop/order/list',this.params).then(res => {
			          // this.aaa = this.aaa.concat(data.data.b.data);
			          console.log(res)
			          if(res.status==200&&res.data.status==10000){
			          	this.list = this.list.concat(res.data.data)
			          	$state.loaded();   //这次加载完毕
				        if (res.data.data.length<20) {
				        	$state.completed("全部加载完了");
				        }
			          }
       			})
   			},
		},
		created(){
			this.query();
		}
	}
</script>
<style scoped>
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
		height:30px;
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
<template>
	<section>
		<div v-title>奖品管理</div>
		<router-link to="/upload">
			<div class="add">
				<span class="jia">+</span>
				<span class="title" >添加奖品</span>
			</div>
		</router-link>
		<p class="add_msg" v-if="list.length==0">您还没有奖品,请添加奖品</p>
		<div class="have">
			<ul>
				<li v-for="item in list" >
					<router-link  :to="'/uploadDetail?_id='+item._id">
						<div class="record">
							<div class="left">
								<img  :src="item.thumb" alt=""></div>
							<div class="center">
								<p class="title">
									<span>{{item.name}}</span>

								</p>

								<p class = "timer">价格:{{item.priceNum/1200}}元&nbsp;&nbsp;&nbsp;&nbsp;库存:{{item.num}}</p>
							</div>
							<div class="right">
								<div >
									<img class="detail" src="./img/arow_h.png" alt="">			
									<span class="sta" v-if="!item.shelves" >未上架</span>
									<span class="sta" v-if="item.shelves" >已上架</span>
								</div>
							</div>
						</div>
					</router-link>
					<div class="line"></div>
				</li>
			</ul>
		</div>
		<loading v-if="zhuan"></loading>
	</section>
</template>
<script>
import Loading from '../../../components/loading'
	export default{
		components:{Loading},
		data(){
			return{
				list:[],
				zhuan:false
			}
		},
		methods:{
			query(){
				this.zhuan = true;
				var params = {
					storeNo:hcb.user().storeNo
				} 
				console.log(params)
				this.$http.get(_config.server+'/shop/goods/list?storeNo='+hcb.user().storeNo).then(res=>{
					console.log(res)
					if(res.status==200&&res.data.status==10000){
						this.list = res.data.data;
						this.zhuan = false;
					}
				},err=>{
					this.zhuan = false;
				})
			}
		},
		created(){
			this.query()
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
	.add{
		height:60px;
		border-bottom: 1px solid #999;
		text-align: center;
		line-height: 60px;
		background: #fff;
	}
	.add span{
		float: left;
		width:33.33333333%;
	}
	.jia{
		font-size: 40px
	}
	.add_msg{
		text-align: center;
		padding-top: 15px;
    	font-size: 14px;
    	color: #999;
	}
</style>

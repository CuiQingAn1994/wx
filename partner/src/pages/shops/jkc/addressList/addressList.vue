<template>
	<section class="addressList">
		<div v-title>选择收货地址</div>
		<ul>
			<li class="address" v-for="item in address">
				<router-link :to="'/form?id='+id+'&num='+num+'&addressid='+item._id+'&consignee='+item.consignee+'&tel='+item.tel+'&region='+item.region+'&address='+item.address">
					<!-- <div class="left">
						<p class="p_msg">
							<span class="name">收货人:{{item.consignee}}</span>
							<span class="phone">{{item.tel}}</span>
						</p>
						<p class="where">收货地址:{{item.region}}{{item.address}}</p>	
					</div> -->
					<div class="add_left">
						<p class="p_msg">
							<span class="name">{{item.consignee}}</span>
							<span class="phone">{{item.tel}}</span>
						</p>
						<p class="where">{{item.region}} {{item.address}}</p>	
					</div>
					<div class="add_right">
						<img v-if="item._id!=_id" src="./right.png" alt="">
						<img v-if="item._id==_id" src="./cRight.png" alt="">
					</div>
				</router-link>
				
			</li>
		</ul>
		<loading v-if="zhuan"></loading>
		<router-link :to="'/addressManage?id='+this.$route.query.id+'&num='+this.$route.query.num">
		<div class="butManage">
			<div class="btnManage">管理地址</div>
		</div>
		</router-link>
	</section>
</template>
<script>
	import Loading from '../../../../components/loading'
	export default{
		components:{Loading},
		data(){
			return {
				zhuan:false,
				_id:"",
				id:this.$route.query.id,
				num:this.$route.query.num,
				// server:'http://api.hecaibao88.com',
				// server:'http://192.168.1.101',
				address:[
				]
			}
		},
		methods:{
			request(){
				this.zhuan = true;
				var me = this;
				this.$http.get(_config.server+"/address/list?userId="+hcb.user().uid).then(function(res){
					setTimeout(function(){
						me.zhuan = false;
					}, 300)
					if(res.status==200&&res.data.status==10000){
						me.address =  res.data.data;
					}
					console.log(res)
				})
				this._id = this.$route.query._id
			}
		},
		created(){
			this.request();
			console.log()
		}
	}
</script>
<style scoped>
	.addressList{
		height:100vh;
		background: #fafafa;
		color:#777;
	}
	.addressList .address{
		background: #fafafa;
		border-bottom:1px solid #eee;
		position: relative;
		overflow: hidden;

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
		width:19px;
		height:19px;
		/*padding-top:30px;*/
		right:15px;
		top:50%;
		transform:translateY(-50%);
	}
	.address .add_right img{
		width:19px;
		height:19px;
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
	.addressList .butManage{
		padding:0 15px;
	}
	.addressList .btnManage{
		width:100%;
		height:44px;
		text-align: center;
		background-image:-webkit-linear-gradient(left,#FFEC1C ,#FFD40C);
		border-radius: 5px;
		/*margin:0 auto;*/
		line-height: 44px;
		margin-top:50px;
		color:#333;
	}
</style>
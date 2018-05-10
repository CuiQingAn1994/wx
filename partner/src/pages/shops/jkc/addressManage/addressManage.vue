<template>
	<section class="addressManage">
		<div v-title>管理地址</div>
		<ul>
			<li class="address" v-for="(item,index) in address">
				<div class="line"></div>
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
					<div class="operate">
						<div class="line"></div>
						<p class="mr" @click="set(item._id)" >
							<img v-if="item.defaultAddress" src="./mr.png" alt="">
							<img v-if="!item.defaultAddress"  src="./no_mr.png" alt="">
							<span class="default">设为默认</span>
						</p>
						<p class="bj">
							<router-link :to="'/addressUpdate?router=addressManage&_id='+item._id+'&address='+item.address+'&consignee='+item.consignee+'&region='+item.region+'&tel='+item.tel" >								
								<img v-if="bj" src="./bj.png" alt="">
								<img v-if="!bj" src="./h_bj.png" alt="">
								<span class="compile">编辑</span>
							</router-link>
						</p>
						<p class="sc" @click="sure(item._id)">
							<img v-if="sc" src="./sc.png" alt="">
							<img v-if="!sc" src="./h_sc.png" alt="">
							<span class="delete">删除</span>
						</p>
						
					</div>
					<div class="line "></div>	
			</li>
		</ul>
		<loading v-if="zhuan"></loading>
		<router-link :to="'/addAddress?router=addressManage&id='+this.$route.query.id+'&num='+this.$route.query.num">
		<div class="button">			
			<div class="btn">添加新地址</div>
		</div>
		</router-link>
		<loading v-if="zhuan"></loading>
<!-- 		<sure v-if="mt_show"></sure> -->
		<div class="bg"v-if="mt_show" >
    	  <div class="recharge_sure">
    	    <p class="msg">确认删除该收货地址吗</p>
    	    <div class="btn_M">
    	      <p class="sure_M" @click="deleted()">删除</p>
    	      <p class="off_M" @click="off()">取消</p>
    	    </div>
    	  </div>
    	</div>
	</section>
</template>
<script>
import Loading from '../../../../components/loading'
import Err from '../../../../components/err/err'
// import Sure from './sure.vue'

	export default{
		components:{Loading,Err},
		data(){
			return {
				server:'http://api.hecaibao88.com',
				// server:'http://192.168.1.101',
				zhuan:false,
				idx:"",
				address:[
					
				],
				mr:false,
				sc:true,
				bj:true,
				mt_show:false,
				_id:"",


			}
		},
		methods:{
			request(){
				var me = this;
				this.zhuan = true;
				this.$http.get(_config.server+"/address/list?userId="+hcb.user().uid).then(function(res){
					setTimeout(function(){
						me.zhuan = false;
					}, 300)
					if(res.status==200&&res.data.status==10000){
						console.log(res)
						me.address =  res.data.data;

					}
				})
			},
			set(id){
				// this.idx==index;
				// console.log(index)
				// console.log(this.mr)
				var that = this;
				this.zhuan = true;
				this.$http.post(_config.server+'/address/changedefault',{id:id,userId:hcb.user().uid}).then(function(res){
					that.request();
					that.zhuan = false;
				})
					// var me = this;
					// // this.$http.get().then(function(){})
					// // 请求成功后执行
					// setTimeout(function(){
					// 	// me.mr = true;
					// },1000)
			
			},
			sure(id){
				this.mt_show = true;
				this._id = id;
			},
			off(){
				this.mt_show = false;
			},
			deleted(){
				var me = this;
				console.log({id:this._id})
				console.log(_config.server+'/address/delete')
				var that = this;
				this.$http.get(_config.server+'/address/delete?id='+this._id).then(function(res){
					if(res.status==200&&res.data.status==10000){
						me.mt_show = false;
						that.request();
					}
				})
			}

		},
		created(){
			this.request();
		}
	}
</script>
<style scoped>
	.addressManage{
		/*height:100vh;*/
		/*background: #fafafa;*/
		/*color:#777;*/
		padding-top:10px;
	}
	.address{
		background: #fff;
		margin-bottom:10px;
	}
	.address .add_left{
		float: left;
		padding:15px;
		color:#333;
		width:100%;

	
	}
	.address .left{
		width:100%;
		padding:0 15px;
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
	.addressManage .button{
		padding:0 15px;
	}
	.addressManage .btn{
		width:100%;
		height:44px;
		text-align: center;
		background-image:-webkit-linear-gradient(left,#FFEC1C ,#FFD40C);
		border-radius: 5px;
		margin:0 auto;
		line-height: 44px;
		margin-top:50px;
		color:#333;
	}
	.addressManage .address .operate{
		/*border-top:1px solid #eee;
		border-bottom:1px solid #eee;*/
		overflow: hidden;
		padding-left: 15px;
		height:45px;
		width:100%;
		/*line-height: 40px;*/
		font-size: 14px;
	}
	.addressManage .address .operate img{
		margin-top:10px;
		width:20px;
		height:20px;
		float: left;
		margin-right:3px;
	}
	.addressManage .address .operate p{
		height:45px;
		width:20%;
		float: right;
		overflow: hidden;
		line-height: 40px;
		color:#999;
	}
	.addressManage .address .operate p.mr{
		width:30%;
		height:45px;
		float: left;
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
  .recharge_sure{
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
    font-size: 16px;

  }
  .recharge_sure .msg{
    height:140px;
    line-height: 140px;
    font-size: 18px;
  }
  .recharge_sure .btn_M{
    height:130px;
    overflow: hidden;
  }
  .recharge_sure .btn_M p{
    width:130px;
    float: left;
    line-height: 44px;
    height: 44px;
    border-radius: 5px;

  }
  .recharge_sure .btn_M p.sure_M{
    border:1px solid #d0d0d0;
    margin-left:15px;
  	margin-right:10px;
  }
  .recharge_sure .btn_M p.off_M{
    background-image:-webkit-linear-gradient(left,#FFEC1C ,#FFD40C);
  }
</style>
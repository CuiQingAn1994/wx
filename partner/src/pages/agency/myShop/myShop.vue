<template>
	<section>
		<div v-if="this.type== superNo" v-title >我的代理</div>
		<div v-if="this.type== agentNo" v-title >我的商家</div>
		<err v-if="err"></err>
		<div v-if="!err" class="box">
			<space v-if="num==0"></space>
			<div v-if="num>0" class="have">
				<div class="allEarn">{{idName}}数量 : <b>{{num}}</b> 个</div>
				<div class="line"></div>
				<ul>
					<li v-for="item in list" class="rela" >
							<div class="record">
								<div class="center">
									<p class="title">
										{{item.name}}
									</p>
									<p class = "timer">手机号:{{item.recommand}}</p>
								</div>
							</div>	
						<div class="line"></div>
					</li>
				</ul>
			</div>
		</div>
		<loading v-if="zhuan"></loading>
	</section>
</template>
<script>
	import Loading from '../../../components/loading'
	import Space from '../../../components/space/space'
	import Err from '../../../components/err/err'

	export default{
		components:{Loading,Space,Err},
		data(){
			return{
				list:[],
				num:0,
				zhuan:false,
				get:false,
				name:"",
				mobile:"",
				type:"",
				idName:"",
				superNo:hcb.user().superNo,
				agentNo:hcb.user().agentNo,
				err:false
				

			}
		},
		created(){
			this.query();
		},
		methods:{
			// 拉取推广源列表
			query(){
				this.type = store.get('role');
				console.log(this.type)
				var api,params;
				if (this.type == hcb.user().superNo) {
					this.idName = '代理'
					api = '/agent/list'
					params = {
						superNo:this.type
					}
				}else if (this.type == hcb.user().agentNo) {
					this.idName = '商家'
					api = '/store/list'
					params = {
						agentNo:this.type
					}
				};
				let that = this;
				this.zhuan = true;
				this.$http.post(_config.server+'/user'+api,params).then(res=>{
					console.log(res)
					if(res.status==200&&res.data.status==10000){
						this.list = res.data.data;
						this.num = res.data.data.length;
					}
					setTimeout(function(){
						that.zhuan = false;
					}, 200)
				},err=>{
					that.err = true
					setTimeout(function(){
						that.zhuan = false;
					}, 200)
				})
			},
			// 确认添加/修改推广源	
		}

	}
</script>
<style scoped>

	.allEarn{
		height:80px;
		text-align: left;
		background: #fff;
		padding: 0 15px;
		line-height: 80px;

	}
	/*订单列表*/
	input{
		font-size: 16px;
		background: #fff;
	}
	input::placeholder{
		font-size: 14px;
	}
	 .record{
		box-sizing:border-box;
		padding:0 15px;
		overflow: hidden;
		height:74px;
		background: #fff;
		/*border-bottom: 1px solid #eee;*/

	}

	 div.center{
		width:100%;
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
	
</style>

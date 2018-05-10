<template>
	<section>
		<div v-title >推广收益</div>
		<space v-if="num==0"></space>
		<div class="box"  v-if="num!=0">
			<div class="allEarn">总收益 : <b> {{count | currency('¥',2)}}</b></div>
			<div class="line"></div>
			<div class="tip">收益将打入您的奖金账户</div>
			<div class="list" v-for="item in list" >
				<div class="inList">
					<div class="top">
						<span class="tLeft">SN:{{item.deviceNo}}</span>
						<span class="tRight" v-if="item.num>=0.01">+{{item.num | currency('',2)}}元</span>
						<span class="tRight" v-if="item.num<0">-{{item.num | currency('',2)}}元</span>
						<span class="tRight" v-if="item.num>=0&&item.num<0.01">小于0.01元</span>
					</div>
					<div class="bottom">
						<span class="bLeft">{{item.createdAt | formDate}}</span>
						<span class="bRight" v-if="item.num>=0">(消费 {{item.payNum | currency('¥',2)}})</span>
						<span class="bRight" v-if="item.num<0">(退款 -{{item.payNum | currency('¥',2)}})</span>
					</div>
				</div>
				<div class="line"></div>
			</div>
			<Infinite v-on:infinite="infiniteMore" ></Infinite>
		</div>
		<loading v-if="zhuan"></loading>
	</section>
</template>
<script>
    import Loading from '../../components/loading'
    import Space from '../../components/space/space'
    import Infinite from "vue2-infinite-scroll";
	export default{
		components:{Loading,Space,Infinite},
		data(){
			return{
				num:0,
				zhuan:false,
				list:[],
				count:0,
				params:{
					uid:hcb.user().uid,
					skip:0,
					limit:20,
				},
			}
		},
		created(){
			this.query()

		},
		methods:{
			query(){
				var that = this;
				this.zhuan = true
				this.$http.post(_config.server+'/promoter/income',this.params).then(res=>{
					console.log(res)

					if(res.status==200&&res.data.status==10000){
						this.list = res.data.data
						this.num = res.data.data.length
						this.count = res.data.count
						console.log(this.count)
						setTimeout(function(){
							that.zhuan = false;
						}, 200)
					}
				})
			},
			infiniteMore($state) {
				this.params.skip+=20;
			    this.$http.post(_config.server+'/promoter/income',this.params).then(res => {
			          // this.aaa = this.aaa.concat(data.data.b.data);
			          console.log(res)
			          this.list=this.list.concat(res.data.data)
			          $state.loaded();   //这次加载完毕
			          if (res.data.data.length<20) {
			          	$state.completed("全部加载完了");
			          }
       			})
   			}
		}
	}
</script>
<style scoped>
	b{
		/*font-weight: normal;*/
		font-size: 18px;
	}
	.allEarn{
		height:80px;
		text-align: left;
		background: #fff;
		padding: 0 15px;
		line-height: 80px;
	}
	.tip{
		background: #fff;
		text-align: left;
		padding-left: 15px;
		color: #FF5164;
		font-size: 12px;
		height:20px;
		line-height: 40px;
	}
	.inList{
		padding:15px;
		background: #fff;

	}
	.top,.bottom{
		overflow: hidden;
		font-size: 14px;
		color:#333;
	}
	.bottom{
		color:#999;
	}
	.tLeft,.bLeft{
		float: left;
		width:49%;
		text-align: left;


		display: block;
   		text-overflow:ellipsis;
   		white-space: nowrap;
   		overflow: hidden;
	}
	.tRight,.bRight{
		float: right;
		width:49%;
		text-align: right;

		display: block;
   		text-overflow:ellipsis;
   		white-space: nowrap;
   		overflow: hidden;
	}
	
</style>
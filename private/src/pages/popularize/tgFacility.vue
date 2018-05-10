<template>
	<section>
		<div v-title >推广的设备</div>
		<space v-if="num==0"></space>
		<div class="box"  v-if="num!=0">
			<div class="allEarn">推广数量 : <b>{{num}}台</b></div>
			<div class="line"></div>
			<div class="list" v-for="item in list" >
				<div class="inList">
					<div class="top">
						<span class="tLeft">{{item.storeName}}</span>
						<!-- <span class="tRight"></span> -->
					</div>
					<div class="bottom">
						<span class="bLeft">SN:{{item.deviceNo}}</span>
						<span class="bRight">{{parseInt(item.promoterTime) | formDate}}</span>
					</div>
				</div>
				<div class="line"></div>
			</div>
		</div>
		<loading v-if="zhuan"></loading>
	</section>
</template>
<script>
    import Loading from '../../components/loading'
    import Space from '../../components/space/space'
	export default{
		components:{Loading,Space},
		data(){
			return{
				num:0,
				zhuan:false,
				list:[]
			}
		},
		created(){
			this.query()

		},
		methods:{
			query(){
				var that = this;
				this.zhuan = true
				this.$http.post(_config.server+'/promoter/device/list',{uid:hcb.user().uid}).then(res=>{
					console.log(res)

					if(res.status==200&&res.data.status==10000){
						this.list = res.data.data
						this.num = res.data.data.length
						setTimeout(function(){
							that.zhuan = false;
						}, 200)
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
	.tLeft{
		width:100%;
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
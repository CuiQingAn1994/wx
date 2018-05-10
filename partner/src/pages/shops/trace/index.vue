<template>
	<section class="list-trace">
		<div v-title>设备流水</div>
		<div v-if="!space">
			<!-- <div class="top">最近的设备流水记录</div> -->
			<!-- <div class="line mb"></div>
			<div class="line"></div> -->
			<div v-for="trace in traces" class="item">
				<div class="time _flex">
					<!-- <div class="times">时间：{{trace.time | formDate}}</div> -->
					<div class="sn">SN:{{trace.deviceNo}}</div>
				</div>
				<div class="_flex info">
					<div class="times _flex-1">时间：{{trace.time | formDate}}</div>
					<div class="num blue" v-if="trace.num > 0">{{trace.num | money}}</div>
					<div class="num red" v-else>{{trace.num}}</div>
				</div>
			<div class="line"></div>
			</div>
		</div>
		<loading v-if="zhuan"></loading>
		<space v-if="space"></space>
		<Infinite v-on:infinite="infiniteMore" ></Infinite>
	</section>
</template>
<script>
import Loading from '../../../components/loading'
import Err from '../../../components/err/err'
import Space from '../../../components/space/space'
import Infinite from "vue2-infinite-scroll"
export default{
	components:{Loading,Err,Space,Infinite},
	data(){
		return{
			err:false,
			zhuan:true,
			traces:[],
			space:false,
			limit:20,
			skip:0,
		}
	},
	filters:{
		time:function(t){
			var d = new Date(t);
			return d.Format("yyyy-MM-dd hh:mm:ss");
		},
		money:function(s){
			if(s){
				return  s > 0 ?  ("+ ¥" + s.toFixed(2)) : ("- ¥" + s.toFixed(2));
			}
		}
	},
	methods:{
		initTraces(that){
			var user  = hcb.user();
			console.log(_config.server + "/settler/store/trace?id=" + user.storeNo)
			that.$http.get(_config.server + "/settler/store/trace?limit=20&skip=0&id=" + user.storeNo).then(res=>{
				console.log(user.storeNo)
				console.log(res)
				if(res.status==200 && res.data.status==10000){
					this.traces = res.data.data;
					if(res.data.data.length==0){
						this.space = true;
					}
					console.log(this.traces)
					setTimeout(function(){
						that.zhuan  = false;			
					}, 300)	
				}
			})

		},
		infiniteMore($state) {
			this.skip+=20;
		    this.$http.get(_config.server +"/settler/store/trace?limit=20&skip="+this.skip+"&id=" + hcb.user().storeNo).then(res => {
		          // this.aaa = this.aaa.concat(data.data.b.data);
		          console.log(res)
		          this.traces=this.traces.concat(res.data.data)
		          $state.loaded();   //这次加载完毕
		          if (res.data.data.length<20) {
		          	$state.completed("全部加载完了");
		          }
       		})
   		},
	},
	created(){
		this.zhuan = true;
		var that = this;
		this.initTraces(that);

		

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
<style scoped lang="less">
	.list-trace{
		.item{
			background:#fff;
			border-radius: 5px;
			// box-shadow: 0 0 2px #ddd;
			overflow: hidden;

		}
		.time{
			font-size:14px;
			background:#fff;
			padding:15px 15px 3px;
			color:#333;
			
		}
		.info{
			padding:3px 15px 15px;
			font-size:14px;
			.times{
				color:#666;
			}
		}
		.num{
			width:100px;
			text-align: right;
			line-height:0px;
		}
		.blue{
			color:#32589c;
		}
		.red{
			color:#d45518;
		}
		.top{
			background:#fff;
			width:100%;
			line-height: 45px;
			text-align: center;
			font-size:14px;
			color:#333;
		}
		.sn{
			text-align: right;
			font-size:14px;
			color:#333;
		}
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
  .mb{
  	margin-bottom:9px;
  }
</style>
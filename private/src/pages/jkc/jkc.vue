<template>
	<section class="jkc">
		<div v-title>兑奖记录</div>
		<div class="err" v-if="err">
            <img  src="./err.png" alt="">
            <p>页面找不到了!</p>
        </div>
		<div v-else>
			<div v-if="empty" class="empty">
				<img class="face" src="./err.png" alt="">
				<p>暂无即开彩记录哦!</p>
			</div>
			<ul v-else >
				<li v-for="item in data">
					<div  class="msg">
						<p class="date">{{item.createdAt | formDateAll}}</p>
						<p class="content">{{item.content}}</p>
					</div>
					<div class="line"></div>
				</li>
			</ul>
		</div>
		<loading v-if="zhuan"></loading>
		<Infinite v-on:infinite="infiniteMore" ></Infinite>
	</section>
</template>
<script>
	import Loading from '../../components/loading'
	import Infinite from "vue2-infinite-scroll";
	export default{
		components:{Loading,Infinite},
		created(){
			this.zhuan = true;
			this.uid = hcb.user().uid
			console.log(hcb.user().uid)
			var me = this;
			this.$http.get(_config.server+"/intant/trace?limit=20&skip=0&uid="+this.uid).then(function(res){
				setTimeout(function(){
					me.zhuan = false;
				}, 100)
				if (res.status==200&&res.data.status==10000) {
					console.log(res.data.data)
					me.data = res.data.data;
					if(res.data.data.length==0){
						me.empty = true;
					}
				}
			},function(err){
				me.err = true;
			})
		},
		data(){
			return {
				zhuan:false,
				err:false,
				empty:false,
				uid:"",
				data:[],
				back:true,
				skip:0
			}
		},
		methods:{
			infiniteMore($state) {
				var me = this;
				this.skip+=20;
				console.log(this.skip)
				console.log(_config.server+"/intant/trace?limit=20&skip="+this.skip+"&uid="+this.uid)
			    this.$http.get(_config.server+"/intant/trace?limit=20&skip="+this.skip+"&uid="+this.uid).then(res => {
			          // this.aaa = this.aaa.concat(data.data.b.data);
			          console.log(res)
			          if (res.status==200&&res.data.status==10000) {
				          me.data =me.data.concat(res.data.data)
				          $state.loaded();   //这次加载完毕
				          console.log(res.data.data.length)
				          if (res.data.data.length<20) {
				          	$state.completed("全部加载完了");
				          }
			          }
       			})
   			},
		}
	}
</script>
<style scoped>
	.err img{
        padding-top:150px;
        padding-bottom:15px;
        width:50%;
    }
    .err p{
        font-size: 20px;
        color:#999;
     }

	.msg{
		padding:15px;
		/*border-bottom:1px solid #eee;*/
		/*color:#777;*/
		background: #fff;
	}
	.msg .date{
		text-align: left;
		font-size: 14px;
		height: 28px;
		line-height: 28px;
		color:#333;
		/*padding:15px 15px 0;*/
	}
	.msg .content{
		font-size: 12px;
		text-align: left;
		/*padding:0px 15px 15px;*/
		color:#999;
	}
	.empty {
		height:100vh;
		background: #f6f6f6;
        font-size: 18px;
        color:#333;
	}
	.empty .face{
		padding-top:40px;
        padding-bottom:15px;
        width:200px;
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